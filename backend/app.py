import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv
import libsql_client

# Cargar variables de entorno (API Key)
load_dotenv()

app = Flask(__name__)
CORS(app) # Permitir peticiones desde el frontend local

# Configurar cliente de Gemini
try:
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
except Exception as e:
    client = None
    print(f"Advertencia: No se pudo inicializar Gemini. ¿Está GEMINI_API_KEY en el archivo .env? Error: {e}")

# Configurar cliente de Turso DB
try:
    turso_url = os.environ.get("TURSO_DB_URL")
    turso_token = os.environ.get("TURSO_DB_TOKEN")
    if turso_url and turso_token:
        db_client = libsql_client.create_client_sync(url=turso_url, auth_token=turso_token)
        db_client.execute('''
            CREATE TABLE IF NOT EXISTS evaluaciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                contest_name TEXT,
                final_score REAL,
                status TEXT,
                diagnostic TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("Conectado a Turso DB exitosamente y tabla verificada.")
    else:
        db_client = None
        print("Advertencia: No se encontraron credenciales de Turso DB en .env.")
except Exception as e:
    db_client = None
    print(f"Error al conectar con Turso DB: {e}")

# ==========================================
# SYSTEM PROMPT MAESTRO
# ==========================================
SYSTEM_PROMPT = """
Eres un evaluador y redactor experto en proyectos y fondos concursables. Tu objetivo es procesar la información de forma dinámica, adaptándote al 100% al documento que suba el usuario. Queda estrictamente prohibido usar ejemplos preestablecidos, nombres de concursos fijos (como FIA o INIA) o temáticas específicas (como agricultura o medio ambiente) a menos que el documento cargado lo exija. Comienza cada análisis con la mente en blanco.

Sigue estas instrucciones obligatorias para cada pestaña de la aplicación:

En la Pestaña 1 (Bases del Concurso):
Cuando el usuario suba el PDF con las bases, léelo por completo y extrae únicamente la información real de ese documento. Identifica el nombre del concurso, la institución que lo financia, el objetivo principal y, muy importante, busca la matriz de evaluación con sus criterios y porcentajes de ponderación. Olvida cualquier configuración de concursos anteriores; tu única verdad es el PDF que se acaba de subir.

En la Pestaña 2 (Perfil de la Idea):
Cuando el usuario suba o escriba su idea de proyecto, clasifica su texto de forma limpia en los campos estándar de postulación: Título, Problema, Solución y Objetivos. En esta pestaña no debes poner notas ni evaluar, solo ordenar la información que el usuario te entregó.

En la Pestaña 3 (Evaluación y Nota):
Realiza un cruce estricto entre la idea de la Pestaña 2 y los criterios de evaluación reales que encontraste en las bases de la Pestaña 1. 
- Califica cada criterio utilizando la escala de notas de 1.0 a 7.0. Los nombres de los criterios evaluados deben ser exactamente los mismos que venían en el PDF de las bases (no uses criterios genéricos).
- Calcula la Nota Final aplicando los porcentajes de ponderación del concurso.
- Entrega un Diagnóstico Ejecutivo detallado explicando qué le falta al proyecto para tener una nota máxima, indicando qué conceptos o palabras clave de las bases fueron ignorados en la idea del usuario.

En la Pestaña 4 (Optimizador de Ideas):
Actúa como un formulador de proyectos profesional enfocado en ganar el concurso. Toma el texto original del usuario y las debilidades detectadas en la Pestaña 3 para reescribir y mejorar la propuesta sección por sección. En la propuesta optimizada, debes inyectar estratégicamente el vocabulario técnico, los objetivos y las exigencias formales del PDF de las bases de la Pestaña 1, garantizando que el texto final esté perfectamente alineado para obtener un 7.0.
"""

def generate_json_response(prompt_text, schema_properties, required_fields):
    """Función de ayuda para llamar a Gemini forzando una respuesta en JSON"""
    if not client:
        return {"error": "API Key de Gemini no configurada."}
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt_text,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": schema_properties,
                    "required": required_fields
                },
                temperature=0.2 # Baja temperatura para mayor rigor técnico
            ),
        )
        return json.loads(response.text)
    except Exception as e:
        return {"error": str(e)}

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "ok", "gemini_configured": client is not None})

@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    bases_text = data.get('basesText', '')
    profile_text = data.get('profileText', '')
    
    if not bases_text or not profile_text:
        return jsonify({"error": "Faltan las bases o el perfil."}), 400

    prompt = f"""
    EJECUTA EL MODO 3: TECHNICAL EVALUATION & SCORING
    
    TEXTO DE LAS BASES DEL CONCURSO:
    {bases_text}
    
    TEXTO DEL PERFIL DEL PROYECTO DEL POSTULANTE:
    {profile_text}
    
    Ejecuta un chequeo riguroso de cumplimiento entre el Perfil y las Bases.
    Calcula una nota de 1.0 a 7.0 para cada criterio encontrado en las bases.
    """
    
    schema = {
        "contestName": {"type": "STRING", "description": "Nombre de la institución o fondo deducido de las bases (ej. ANID, CORFO, FIA, etc)"},
        "scoreMatrix": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "criterionName": {"type": "STRING"},
                    "weightPercent": {"type": "NUMBER"},
                    "score": {"type": "NUMBER"}
                }
            }
        },
        "finalScore": {"type": "NUMBER"},
        "status": {"type": "STRING", "description": "ADJUDICABLE o NO ADJUDICABLE"},
        "executiveDiagnostic": {"type": "STRING", "description": "Análisis crítico profundo destacando fallas y justificaciones"}
    }
    
    result = generate_json_response(prompt, schema, ["contestName", "scoreMatrix", "finalScore", "status", "executiveDiagnostic"])
    
    # Guardar en Turso DB si está configurado y no hubo error de IA
    if "error" not in result and db_client:
        try:
            db_client.execute(
                "INSERT INTO evaluaciones (contest_name, final_score, status, diagnostic) VALUES (?, ?, ?, ?)",
                [
                    result.get("contestName", "Desconocido"),
                    float(result.get("finalScore", 0.0)),
                    result.get("status", ""),
                    result.get("executiveDiagnostic", "")
                ]
            )
        except Exception as e:
            print(f"Error al guardar en Turso: {e}")

    return jsonify(result)

@app.route('/api/optimize', methods=['POST'])
def optimize():
    data = request.json
    bases_text = data.get('basesText', '')
    section_name = data.get('sectionName', '')
    section_text = data.get('sectionText', '')
    
    prompt = f"""
    EJECUTA EL MODO 4: COGNITIVE IDEA OPTIMIZER
    
    Estás optimizando la sección: {section_name}
    
    TEXTO ORIGINAL DEL POSTULANTE:
    {section_text}
    
    TEXTO DE LAS BASES DEL CONCURSO (Úsalo para inyectar vocabulario técnico y alinear el proyecto):
    {bases_text}
    
    Identifica deficiencias críticas y reescribe la propuesta para que obtenga una nota 7.0.
    """
    
    schema = {
        "criticalDeficiencies": {"type": "STRING"},
        "optimizedProposal": {"type": "STRING"}
    }
    
    result = generate_json_response(prompt, schema, ["criticalDeficiencies", "optimizedProposal"])
    return jsonify(result)

if __name__ == '__main__':
    print("Iniciando servidor INIA PostulaMax AI Backend en http://localhost:5000")
    app.run(port=5000, debug=True)
