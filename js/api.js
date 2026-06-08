// js/api.js
// Archivo encargado de gestionar las peticiones HTTP hacia el Backend en Python

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Llama al backend para evaluar el perfil del proyecto contrastándolo con las bases.
 * @param {string} basesText - Texto completo extraído de las bases (PDF/TXT).
 * @param {string} profileText - Texto completo del perfil del proyecto.
 * @returns {Promise<Object>} Resultado JSON con la nota y diagnóstico.
 */
async function evaluateProjectAPI(basesText, profileText) {
    try {
        const response = await fetch(`${API_BASE_URL}/evaluate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ basesText, profileText })
        });
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error al evaluar el proyecto:', error);
        return { error: error.message };
    }
}

/**
 * Llama al backend para optimizar una sección específica del perfil.
 * @param {string} sectionName - Nombre de la sección (ej: "Problema").
 * @param {string} sectionText - Texto actual redactado por el usuario.
 * @param {string} basesText - Texto de las bases para alinear vocabulario.
 * @returns {Promise<Object>} Texto optimizado y deficiencias críticas encontradas.
 */
async function optimizeSectionAPI(sectionName, sectionText, basesText) {
    try {
        const response = await fetch(`${API_BASE_URL}/optimize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sectionName, sectionText, basesText })
        });
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error al optimizar la sección:', error);
        return { error: error.message };
    }
}

window.apiClient = {
    evaluateProject: evaluateProjectAPI,
    optimizeSection: optimizeSectionAPI
};
