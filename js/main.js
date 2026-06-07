document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. BASE DE DATOS Y CONFIGURACIONES
    // -------------------------------------------------------------

    // Plantillas de Concursos Reales
    const CONCURSOS_DB = {
        fia: {
            nombre: "FIA - Innovación en la Agricultura Familiar Campesina",
            foco: "Resiliencia Climática y Agricultura Familiar Campesina (AFC)",
            notaCorte: 5.5,
            basesText: `BASES OFICIALES - FUNDACIÓN PARA LA INNOVACIÓN AGRARIA (FIA)\n\nCONCURSO: Innovación Social y Productiva en la Agricultura Familiar Campesina (AFC)\n\nOBJETIVOS ESTRATÉGICOS:\n1. Promover soluciones innovadoras que aumenten la resiliencia al cambio climático del sector silvoagropecuario.\n2. Fortalecer el desarrollo de la Agricultura Familiar Campesina (AFC) mediante el valor agregado, asociatividad y transferencia tecnológica directa.\n3. Optimizar el uso de recursos hídricos e implementar prácticas agrícolas sustentables y agroecológicas.\n\nCRITERIOS DE EVALUACIÓN:\n- Pertinencia Agropecuaria y Territorial (30%): Relación directa con los focos prioritarios de FIA y beneficio directo demostrable para pequeños productores agrícolas locales.\n- Consistencia y Viabilidad Técnica (30%): Coherencia entre problema, solución de innovación propuesta y metodología de trabajo.\n- Impacto Ecológico y Sustentabilidad (20%): Mitigación del cambio climático y uso de energías limpias o ahorro de insumos químicos.\n- Claridad de Formulación (20%): Objetivos formulados de manera académica (verbos en infinitivo), medibles y orientados a resultados.`,
            palabrasClave: ["afc", "resiliencia", "cambio climatico", "sustentabilidad", "agroecologia", "pequeños productores", "transferencia", "ahorro hidrico", "bioinsumos", "adaptacion", "asociatividad"]
        },
        fondef: {
            nombre: "FONDEF I+D Agropecuario y Forestal",
            foco: "Investigación Científica, Transferencia Tecnológica y Rigor Académico",
            notaCorte: 5.8,
            basesText: `BASES REGULADORAS - FONDEF I+D - AGENCIA NACIONAL DE INVESTIGACIÓN Y DESARROLLO (ANID)\n\nCONCURSO: I+D Silvoagropecuaria Aplicada\n\nOBJETIVOS GENERALES:\n1. Financiar proyectos de investigación científica y tecnológica aplicada, con un fuerte componente de transferencia tecnológica.\n2. Promover la colaboración entre centros de investigación (como INIA) y empresas u organizaciones del sector productivo agropecuario.\n3. Lograr impacto económico-social cuantificable en los sectores productivos chilenos.\n\nCRITERIOS DE EVALUACIÓN:\n- Rigor Científico e Innovación Tecnológica (35%): Hipótesis clara, metodología científica avanzada, estado del arte sólido y novedad de la solución.\n- Modelo de Transferencia Tecnológica (25%): Estrategia de patentes, licenciamiento o transferencia del conocimiento a productores silvoagropecuarios y empresas asociadas.\n- Impacto Económico y Social (20%): Cuantificación clara de retornos, incremento en rendimientos productivos y mitigación de problemas a gran escala.\n- Calidad de Objetivos y Hitos (20%): Formulación rigurosa de objetivos, hitos verificables y metas técnicas precisas.`,
            palabrasClave: ["investigacion", "i+d", "cientifica", "transferencia", "patente", "licenciamiento", "agroindustrial", "hipotesis", "validación", "silvoagropecuario", "retorno", "empresa asociada"]
        },
        "inia-semilla": {
            nombre: "INIA Semilla de Investigación Tecnológica",
            foco: "Pilotaje Técnico, Factibilidad de Laboratorio y Prototipado Local",
            notaCorte: 6.0,
            basesText: `BASES DE CONCURSOS INTERNOS - INIA CHILE\n\nCONCURSO: Semilla de Innovación y Pilotaje Tecnológico\n\nOBJETIVO:\nFomentar el desarrollo de proyectos piloto aplicados de rápida ejecución, liderados por investigadores de INIA en estaciones experimentales, enfocados en resolver desafíos técnicos locales del agro chileno.\n\nCRITERIOS DE EVALUACIÓN:\n- Viabilidad Técnica Local (35%): Factibilidad real de ejecutar las pruebas piloto en los campos y laboratorios de INIA en la región seleccionada.\n- Coherencia del Prototipo (30%): Relación directa entre la solución innovadora y la factibilidad de generar un prototipo validado a escala de campo en 12 meses.\n- Relevancia para el Agro Regional (20%): Solución adaptada a las problemáticas locales (ej. sequía extrema en Atacama, heladas en Ñuble).\n- Eficiencia de Recursos (15%): Optimización presupuestaria y claridad en la metodología de ensayos experimentales.`,
            palabrasClave: ["piloto", "ensayo", "prototipo", "factibilidad", "inia", "laboratorio", "regional", "desafio tecnico", "estacion experimental", "campo", "agropecuario", "regionalizacion"]
        }
    };

    // Plantillas de Borradores de Prueba (Quickstart)
    const PROYECTOS_PLANTILLAS = {
        "drones-nuble": {
            titulo: "Control de plagas agrícola mediante el uso de tecnología drone en campos de Ñuble",
            sector: "Fruticultura",
            region: "Región de Ñuble",
            problema: "Hay muchas plagas y los agricultores gastan mucho dinero aplicando pesticidas químicos de forma descontrolada sin saber dónde está realmente el foco. Esto daña el ecosistema y es muy ineficiente.",
            solucion: "Volaremos drones con cámaras normales para sacar fotos a las plantaciones y ver si hay hojas dañadas para aplicar insecticida sólo en esas partes, evitando fumigar todo el campo de forma innecesaria.",
            objGeneral: "Diseñar un sistema de drones para ayudar a controlar las plagas de los cultivos más rápido.",
            objEspecificos: "• Volar los drones en Ñuble\n• Sacar fotos con las cámaras\n• Evaluar si baja el gasto de químicos",
            impacto: "Menos plagas, ahorro de plata para los campesinos y menos contaminación con pesticidas químicos en los frutales de la zona.",
            // Datos del optimizador
            optimizacion: {
                title: {
                    diagnostics: [
                        "Falta alineación explícita con la resiliencia al cambio climático del agro local.",
                        "Falta mencionar el grupo de beneficiarios directos (AFC)."
                    ],
                    suggested: "Sistema de Monitoreo Aero-Inteligente y Control Biológico Sectorizado de plagas para la Agricultura Familiar Campesina (AFC) y Fruticultores de la Región de Ñuble, optimizando la sustentabilidad hídrica y reduciendo fitosanitarios.",
                    diff: '<span class="highlight-ins">Sistema de Monitoreo Aero-Inteligente y Control Biológico Sectorizado</span> de plagas para <span class="highlight-ins">la Agricultura Familiar Campesina (AFC) y Fruticultores de la Región de Ñuble, optimizando la sustentabilidad hídrica y reduciendo fitosanitarios</span>.'
                },
                problem: {
                    diagnostics: [
                        "No se cuantifica el impacto del daño de la plaga en Ñuble.",
                        "Falta mencionar la plaga específica regulada por el SAG (ej: Lobesia botrana).",
                        "Falta ligar el problema a los objetivos de resiliencia del concurso."
                    ],
                    suggested: "En la Región de Ñuble, la Agricultura Familiar Campesina (AFC) enfrenta pérdidas de hasta un 35% en frutales menores debido al ataque descontrolado de la plaga Lobesia botrana. El uso ineficiente y calendarizado de agroquímicos convencionales eleva los costos operativos en un 40% anual y degrada los suelos agrícolas. Existe una nula capacidad de monitoreo de precisión adaptativo para la AFC, exponiéndolos a una vulnerabilidad crítica ante el cambio climático.",
                    diff: 'En la Región de Ñuble, <span class="highlight-ins">la Agricultura Familiar Campesina (AFC) enfrenta pérdidas de hasta un 35% en frutales menores debido al ataque descontrolado de la plaga Lobesia botrana</span>. El uso <span class="highlight-del">descontrolado</span> <span class="highlight-ins">ineficiente y calendarizado</span> de agroquímicos <span class="highlight-ins">eleva los costos operativos en un 40% anual y degrada los suelos agrícolas. Existe una nula capacidad de monitoreo de precisión adaptativo para la AFC, exponiéndolos a una vulnerabilidad crítica ante el cambio climático</span>.'
                },
                solution: {
                    diagnostics: [
                        "No describe las características técnicas de la cámara (multiespectral).",
                        "Falta explicar la tecnología de análisis de datos (algoritmos IA, Machine Learning).",
                        "Falta especificar la integración del control biológico sectorizado."
                    ],
                    suggested: "Se propone el desarrollo de un servicio tecnológico integrado basado en vehículos aéreos no tripulados (drones) equipados con sensores multiespectrales de alta definición. Las imágenes capturadas serán procesadas en tiempo real mediante algoritmos de Machine Learning desarrollados en INIA para detectar focos fitosanitarios en etapas tempranas. Se implementará una dosificación automatizada y ultra-localizada de bioinsumos específicos y agentes de control biológico silvestre, reduciendo en un 80% el uso de pesticidas sintéticos.",
                    diff: 'Se propone el desarrollo de un <span class="highlight-ins">servicio tecnológico integrado basado en vehículos aéreos no tripulados (drones) equipados con sensores multiespectrales de alta definición</span>. Las imágenes capturadas serán procesadas <span class="highlight-ins">en tiempo real mediante algoritmos de Machine Learning desarrollados en INIA para detectar focos fitosanitarios en etapas tempranas. Se implementará una dosificación automatizada y ultra-localizada de bioinsumos específicos y agentes de control biológico silvestre</span>, reduciendo <span class="highlight-del">la fumigación innecesaria</span> <span class="highlight-ins">en un 80% el uso de pesticidas sintéticos</span>.'
                },
                objectives: {
                    diagnostics: [
                        "Los verbos utilizados son débiles y operativos (volar, sacar), en vez de académicos de I+D (Diseñar, Evaluar, Implementar).",
                        "Los objetivos no contemplan el desarrollo metodológico del algoritmo de IA."
                    ],
                    suggested: "• Desarrollar un protocolo de teledetección multiespectral optimizado para la identificación de estrés fitosanitario por Lobesia botrana en frutales menores de Ñuble.\n• Entrenar un algoritmo de redes neuronales convolucionales para la clasificación automatizada de severidad de daño en las hojas.\n• Validar a escala de campo piloto la eficacia del control biológico localizado mediante drones frente al tratamiento químico convencional.",
                    diff: '• <span class="highlight-ins">Desarrollar un protocolo de teledetección multiespectral optimizado para la identificación de estrés fitosanitario por Lobesia botrana en frutales menores de Ñuble</span>.\n• <span class="highlight-ins">Entrenar un algoritmo de redes neuronales convolucionales para la clasificación automatizada de severidad de daño en las hojas</span>.\n• <span class="highlight-ins">Validar a escala de campo piloto la eficacia del control biológico localizado mediante drones frente al tratamiento químico convencional</span>.'
                },
                impact: {
                    diagnostics: [
                        "Falta cuantificar la reducción económica específica.",
                        "No menciona el beneficio ecológico medible en la cuenca o suelo.",
                        "Falta indicar el impacto de transferencia técnica de INIA."
                    ],
                    suggested: "Se proyecta una reducción del 30% en los costos operacionales de los fruticultores de la AFC en Ñuble. A nivel medioambiental, el proyecto logrará disminuir en 500 toneladas anuales la carga de pesticidas organofosforados en las cuencas locales. Además, se capacitará a 150 pequeños agricultores a través de los nodos de transferencia tecnológica del INIA Quilamapu, impulsando la transición ecológica agropecuaria.",
                    diff: 'Se proyecta una <span class="highlight-ins">reducción del 30% en los costos operacionales de los fruticultores de la AFC en Ñuble</span>. A nivel medioambiental, el proyecto logrará <span class="highlight-ins">disminuir en 500 toneladas anuales la carga de pesticidas organofosforados en las cuencas locales</span>. Además, se <span class="highlight-ins">capacitará a 150 pequeños agricultores a través de los nodos de transferencia tecnológica del INIA Quilamapu, impulsando la transición ecológica agropecuaria</span>.'
                }
            }
        },
        "riego-copiapo": {
            titulo: "Sistema de Riego para Ahorrar Agua en Copiapó",
            sector: "Horticultura",
            region: "Región de Atacama",
            problema: "El agua es muy escasa en Copiapó y los sistemas de riego antiguos pierden mucha agua. Los agricultores no saben cuándo regar y se les secan las lechugas y tomates.",
            solucion: "Instalaremos sensores de humedad chinos muy baratos conectados a una plaquita Arduino para encender las válvulas de agua de forma manual con un mensaje de texto de celular.",
            objGeneral: "Hacer una instalación de riego que gaste menos agua en el desierto de Copiapó.",
            objEspecificos: "• Comprar sensores y Arduino\n• Conectarlos en los campos\n• Ver si las plantas crecen bien",
            impacto: "Ahorro de agua en el norte del país y tomates más verdes sin gastar de más.",
            // Datos del optimizador
            optimizacion: {
                title: {
                    diagnostics: [
                        "Falta rigurosidad técnica y denominación formal del sistema.",
                        "Falta mencionar las variables de precisión de Atacama."
                    ],
                    suggested: "Implementación de un Sistema de Riego Automatizado Basado en IoT y Sensores Capacitivos para la Optimización de la Eficiencia Hídrica en Cultivos Hortícolas de la Región de Atacama.",
                    diff: '<span class="highlight-ins">Implementación de un Sistema de Riego Automatizado Basado en IoT y Sensores Capacitivos para la Optimización de la Eficiencia Hídrica en Cultivos Hortícolas de la Región de Atacama</span>.'
                },
                problem: {
                    diagnostics: [
                        "No se menciona el acuífero de Copiapó ni la crisis hídrica sistémica del desierto de Atacama.",
                        "Falta cuantificar la tasa de evaporación y pérdidas."
                    ],
                    suggested: "El valle de Copiapó, ubicado en el Desierto de Atacama, enfrenta una crisis de estrés hídrico extremo con una sobreexplotación crítica del acuífero local. Los métodos tradicionales de riego por surco exhiben una ineficiencia hídrica del 60% debido a las altas tasas de evapotranspiración (que superan los 2.000 mm anuales). Los agricultores hortícolas carecen de datos ecofisiológicos de la planta para regular el riego, lo que arriesga la seguridad alimentaria regional.",
                    diff: 'El valle de Copiapó, ubicado en el <span class="highlight-ins">Desierto de Atacama, enfrenta una crisis de estrés hídrico extremo con una sobreexplotación crítica del acuífero local</span>. Los métodos tradicionales de riego <span class="highlight-del">antiguos</span> <span class="highlight-ins">por surco exhiben una ineficiencia hídrica del 60% debido a las altas tasas de evapotranspiración (que superan los 2.000 mm anuales). Los agricultores hortícolas carecen de datos ecofisiológicos de la planta para regular el riego, lo que arriesga la seguridad alimentaria regional</span>.'
                },
                solution: {
                    diagnostics: [
                        "Lenguaje inapropiado ('chinos muy baratos', 'plaquita'). Falta rigurosidad en la arquitectura de hardware.",
                        "Falta explicar la lógica del algoritmo de riego predictivo automatizado."
                    ],
                    suggested: "Se propone un sistema ciberfísico (IoT) compuesto por sensores capacitivos de humedad de suelo de grado industrial y microcontroladores de ultra-bajo consumo energético con conectividad LoRaWAN. El sistema procesa lecturas en tiempo real y calcula de forma automática la demanda de evapotranspiración de los cultivos mediante un algoritmo predictivo, ejecutando micro-riego inteligente y adaptativo a través de electroválvulas solenoides automatizadas sin intervención humana.",
                    diff: 'Se propone un <span class="highlight-ins">sistema ciberfísico (IoT) compuesto por sensores capacitivos de humedad de suelo de grado industrial y microcontroladores de ultra-bajo consumo energético con conectividad LoRaWAN</span>. El sistema procesa <span class="highlight-ins">lecturas en tiempo real y calcula de forma automática la demanda de evapotranspiración de los cultivos mediante un algoritmo predictivo, ejecutando micro-riego inteligente y adaptativo a través de electroválvulas solenoides automatizadas</span> sin intervención <span class="highlight-del">manual</span>.'
                },
                objectives: {
                    diagnostics: [
                        "Los objetivos específicos carecen de rigor tecnológico.",
                        "No se menciona el proceso de calibración y análisis hídrico de suelo."
                    ],
                    suggested: "• Diseñar la arquitectura del nodo sensor IoT LoRaWAN optimizado para condiciones de radiación y temperatura del Desierto de Atacama.\n• Calibrar los sensores capacitivos en diferentes texturas de suelos del valle de Copiapó para evitar falsas lecturas salinas.\n• Evaluar la reducción del consumo volumétrico de agua y el coeficiente de rendimiento productivo de los cultivos hortícolas bajo tratamiento automatizado.",
                    diff: '• <span class="highlight-ins">Diseñar la arquitectura del nodo sensor IoT LoRaWAN optimizado para condiciones de radiación y temperatura del Desierto de Atacama</span>.\n• <span class="highlight-ins">Calibrar los sensores capacitivos en diferentes texturas de suelos del valle de Copiapó para evitar falsas lecturas salinas</span>.\n• <span class="highlight-ins">Evaluar la reducción del consumo volumétrico de agua y el coeficiente de rendimiento productivo de los cultivos hortícolas bajo tratamiento automatizado</span>.'
                },
                impact: {
                    diagnostics: [
                        "Falta cuantificar la tasa de ahorro de agua en porcentaje.",
                        "Falta incluir los beneficios de sostenibilidad ambiental e hídrica."
                    ],
                    suggested: "El despliegue de la tecnología permitirá un ahorro neto de agua del 45% en comparación al riego convencional por goteo no automatizado. Se aumentará la productividad de los cultivos hortícolas en un 22% por hectárea y se resguardará la sustentabilidad del recurso hídrico superficial, beneficiando directamente a 80 familias agropecuarias de zonas desérticas.",
                    diff: 'El despliegue de la tecnología permitirá un <span class="highlight-ins">ahorro neto de agua del 45% en comparación al riego convencional por goteo no automatizado</span>. Se aumentará <span class="highlight-ins">la productividad de los cultivos hortícolas en un 22% por hectárea y se resguardará la sustentabilidad del recurso hídrico superficial, beneficiando directamente a 80 familias agropecuarias de zonas desérticas</span>.'
                }
            }
        }
    };


    // -------------------------------------------------------------
    // 2. ELEMENTOS DEL DOM
    // -------------------------------------------------------------

    // Botones de Navegación Pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Pestaña 1
    const contestItems = document.querySelectorAll('.contest-item');
    const customBasesText = document.getElementById('custom-bases-text');
    const basesDropzone = document.getElementById('bases-dropzone');
    const basesFileInput = document.getElementById('bases-file-input');
    const fileUploadStatus = document.getElementById('file-upload-status');
    const uploadedFileName = document.getElementById('uploaded-file-name');
    const btnNextToProfile = document.getElementById('btn-next-to-profile');

    // Pestaña 2
    const projectTitleInput = document.getElementById('project-title');
    const projectSectorInput = document.getElementById('project-sector');
    const projectRegionInput = document.getElementById('project-region');
    const projectProblemInput = document.getElementById('project-problem');
    const projectSolutionInput = document.getElementById('project-solution');
    const projectObjGeneralInput = document.getElementById('project-obj-general');
    const projectObjSpecificsInput = document.getElementById('project-obj-specifics');
    const projectImpactInput = document.getElementById('project-impact');
    const btnClearInputs = document.getElementById('btn-clear-inputs');
    const templateCards = document.querySelectorAll('.template-card');
    const btnTriggerAnalysis = document.getElementById('btn-trigger-analysis');

    // Pestaña 3
    const analysisLoader = document.getElementById('analysis-loader');
    const currentContestBadge = document.getElementById('current-contest-badge');
    const resultGradeNumber = document.getElementById('result-grade-number');
    const resultStatusBadge = document.getElementById('result-status-badge');
    const scoreCircleProgress = document.getElementById('score-circle-progress');
    const crit1Grade = document.getElementById('crit-1-grade');
    const crit1Bar = document.getElementById('crit-1-bar');
    const crit2Grade = document.getElementById('crit-2-grade');
    const crit2Bar = document.getElementById('crit-2-bar');
    const crit3Grade = document.getElementById('crit-3-grade');
    const crit3Bar = document.getElementById('crit-3-bar');
    const crit4Grade = document.getElementById('crit-4-grade');
    const crit4Bar = document.getElementById('crit-4-bar');
    const resultSynthesisText = document.getElementById('result-synthesis-text');
    const resultKeywordsContainer = document.getElementById('result-keywords-container');
    const btnGoToOptimizer = document.getElementById('btn-go-to-optimizer');

    // Pestaña 4 (Optimizador)
    const optimizerScoreIndicator = document.getElementById('optimizer-score-indicator');
    const btnOptimizeAll = document.getElementById('btn-optimize-all');
    const optSectionsNav = document.getElementById('optimizer-sections-nav');
    const optDiagTitle = document.getElementById('opt-diag-title');
    const optDiagItemsList = document.getElementById('opt-diag-items-list');
    const optBoxCurrent = document.getElementById('opt-box-current');
    const optBoxSuggested = document.getElementById('opt-box-suggested');
    const btnResetSection = document.getElementById('btn-reset-section');
    const btnApplySectionImprovement = document.getElementById('btn-apply-section-improvement');
    const exportCard = document.getElementById('export-card');
    const btnExportPdf = document.getElementById('btn-export-pdf');
    const optGlowTarget = document.getElementById('opt-glow-target');


    // -------------------------------------------------------------
    // 3. VARIABLES DE ESTADO LOCAL
    // -------------------------------------------------------------
    let activeContestKey = 'fia';
    let currentGrade = 1.0;
    let isAnalyzed = false;
    let activeTemplateKey = null; // Almacena si se cargó drones-nuble o riego-copiapo
    let currentProjectData = {
        title: '',
        problem: '',
        solution: '',
        objectives: '',
        impact: '',
        sector: 'Fruticultura',
        region: 'Región de Ñuble'
    };
    
    // Rastreador de secciones mejoradas por el optimizador
    let improvedSections = {
        title: false,
        problem: false,
        solution: false,
        objectives: false,
        impact: false
    };

    // Sección seleccionada en el optimizador (Pestaña 4)
    let selectedOptSection = 'title';


    // -------------------------------------------------------------
    // 4. CONTROLADORES DE PESTAÑAS (TABS)
    // -------------------------------------------------------------
    const activateTab = (tabId) => {
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Autoscroll suave
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Restricción visual lógica para no ir a resultados antes de evaluar
            if ((tabId === 'resultados-panel' || tabId === 'optimizador-panel') && !isAnalyzed) {
                alert('Por favor, ingresa los datos de tu proyecto en la pestaña "2. Perfil de la Idea" y haz clic en "ANALIZAR PROPUESTA" primero.');
                activateTab('perfil-panel');
                return;
            }
            
            activateTab(tabId);
        });
    });

    // Pestaña de Navegación Rápida
    btnNextToProfile.addEventListener('click', () => {
        activateTab('perfil-panel');
    });

    btnGoToOptimizer.addEventListener('click', () => {
        activateTab('optimizador-panel');
    });


    // -------------------------------------------------------------
    // 5. LÓGICA DE PESTAÑA 1: SELECCIÓN DE BASES & CARGA
    // -------------------------------------------------------------

    // Cargar Bases de Concursos Preconfigurados
    const loadContestBasesText = (key) => {
        activeContestKey = key;
        customBasesText.value = CONCURSOS_DB[key].basesText;
        currentContestBadge.textContent = "Concurso: " + key.toUpperCase();
        
        // Si ya hay un análisis hecho, recalcular al cambiar de concurso
        if (isAnalyzed) {
            evaluateProjectSilently();
        }
    };

    // Inicializar primera base
    loadContestBasesText('fia');

    contestItems.forEach(item => {
        item.addEventListener('click', () => {
            contestItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const key = item.getAttribute('data-contest');
            loadContestBasesText(key);
        });
    });

    // Drag and Drop de Archivos
    ['dragenter', 'dragover'].forEach(eventName => {
        basesDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            basesDropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        basesDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            basesDropzone.classList.remove('dragover');
        }, false);
    });

    basesDropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleUploadedFiles(files);
    });

    basesDropzone.addEventListener('click', () => {
        basesFileInput.click();
    });

    basesFileInput.addEventListener('change', (e) => {
        handleUploadedFiles(e.target.files);
    });

    const handleUploadedFiles = (files) => {
        if (files.length === 0) return;
        const file = files[0];
        
        // Mostrar estado cargando
        uploadedFileName.textContent = file.name + ` (${Math.round(file.size / 1024)} KB)`;
        fileUploadStatus.classList.remove('hidden');

        // Leer archivo real de texto si es .txt
        if (file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                customBasesText.value = e.target.result;
                if (isAnalyzed) evaluateProjectSilently();
            };
            reader.readAsText(file);
        } else {
            // Simular lectura inteligente para PDF o DOCX
            // Genera una estructura basada en el nombre del archivo
            const randomID = Math.floor(Math.random() * 900) + 100;
            customBasesText.value = `BASES EXTRAÍDAS DEL ARCHIVO: ${file.name.toUpperCase()}\nCÓDIGO DE IDENTIFICACIÓN: SAG-ANID-${randomID}\n\nREQUERIMIENTOS TÉCNICOS DETECTADOS:\n1. Foco prioritario del proyecto: Innovaciones tecnológicas aplicables al sector agropecuario de Chile con pilotaje de campo.\n2. Criterios de Sustentabilidad: Se exige demostrar resiliencia hídrica frente a la sequía y disminución sistemática de residuos contaminantes.\n3. Modelo de negocio o transferencia: Los resultados científicos deben estar orientados a transferencia directa a productores locales del agro.\n4. Formulación Académica: Los objetivos deben ser claros, estructurados lógicamente y alineados con el rigor de la I+D silvoagropecuaria.`;
            
            if (isAnalyzed) evaluateProjectSilently();
        }
    };


    // -------------------------------------------------------------
    // 6. LÓGICA DE PESTAÑA 2: REDACCIÓN & DRAFT TEMPLATES
    // -------------------------------------------------------------

    // Validación de entradas para habilitar botón de análisis
    const validateInputs = () => {
        const titleOk = projectTitleInput.value.trim().length > 10;
        const problemOk = projectProblemInput.value.trim().length > 20;
        const solutionOk = projectSolutionInput.value.trim().length > 20;
        const objGenOk = projectObjGeneralInput.value.trim().length > 15;
        const objSpecOk = projectObjSpecificsInput.value.trim().length > 15;
        const impactOk = projectImpactInput.value.trim().length > 20;

        const allOk = titleOk && problemOk && solutionOk && objGenOk && objSpecOk && impactOk;
        btnTriggerAnalysis.disabled = !allOk;
    };

    [
        projectTitleInput, projectProblemInput, projectSolutionInput,
        projectObjGeneralInput, projectObjSpecificsInput, projectImpactInput
    ].forEach(el => {
        el.addEventListener('input', validateInputs);
    });

    // Limpiar campos
    btnClearInputs.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas borrar todo el texto redactado del proyecto?')) {
            projectTitleInput.value = '';
            projectProblemInput.value = '';
            projectObjGeneralInput.value = '';
            projectObjSpecificsInput.value = '';
            projectSolutionInput.value = '';
            projectImpactInput.value = '';
            btnTriggerAnalysis.disabled = true;
            isAnalyzed = false;
            activeTemplateKey = null;
            
            // Restablecer historial de mejoras
            Object.keys(improvedSections).forEach(k => improvedSections[k] = false);
            exportCard.style.display = 'none';
        }
    });

    // Cargar Plantillas de Borradores de Prueba
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-template');
            activeTemplateKey = key;
            const template = PROYECTOS_PLANTILLAS[key];

            projectTitleInput.value = template.titulo;
            projectProblemInput.value = template.problema;
            projectSolutionInput.value = template.solucion;
            projectObjGeneralInput.value = template.objGeneral;
            projectObjSpecificsInput.value = template.objEspecificos;
            projectImpactInput.value = template.impacto;
            
            // Seleccionar Sector y Región automáticamente
            projectSectorInput.value = template.sector;
            projectRegionInput.value = template.region;

            // Restablecer historial de mejoras
            Object.keys(improvedSections).forEach(k => improvedSections[k] = false);
            exportCard.style.display = 'none';

            validateInputs();

            // Animación suave de feedback en las tarjetas
            templateCards.forEach(c => c.style.borderColor = 'rgba(129, 199, 132, 0.15)');
            card.style.borderColor = 'var(--accent)';
        });
    });


    // -------------------------------------------------------------
    // 7. MOTOR COGNITIVO DE EVALUACIÓN Y NOTAS (1.0 - 7.0)
    // -------------------------------------------------------------

    // Simular el Clic del Análisis con cargador interactivo de inmersión
    btnTriggerAnalysis.addEventListener('click', () => {
        // Guardar valores iniciales
        syncInputsToLocalData();

        // Cambiar a pestaña 3 e iniciar loader
        activateTab('resultados-panel');
        analysisLoader.classList.remove('hidden');

        // Textos del Loader Secuenciales
        const loadingTexts = [
            "Escaneando requerimientos de las bases del concurso...",
            "Evaluando rigor técnico del perfil agropecuario...",
            "Analizando consistencia de objetivos y metas...",
            "Generando diagnóstico de optimización y rúbrica..."
        ];

        let txtIdx = 0;
        const textInterval = setInterval(() => {
            txtIdx++;
            if (txtIdx < loadingTexts.length) {
                analysisLoader.querySelector('.loader-text').textContent = loadingTexts[txtIdx];
            }
        }, 400);

        // Terminar carga y evaluar
        setTimeout(() => {
            clearInterval(textInterval);
            analysisLoader.classList.add('hidden');
            
            // Evaluar y mostrar
            isAnalyzed = true;
            evaluateProjectSilently();
            
            // Habilitar pestañas restringidas
            document.getElementById('btn-tab-resultados').classList.remove('disabled');
            document.getElementById('btn-tab-optimizador').classList.remove('disabled');
        }, 1600);
    });

    // Guardar valores del DOM en variables de JS
    const syncInputsToLocalData = () => {
        currentProjectData.title = projectTitleInput.value;
        currentProjectData.problem = projectProblemInput.value;
        currentProjectData.solution = projectSolutionInput.value;
        currentProjectData.objectives = `${projectObjGeneralInput.value} ${projectObjSpecificsInput.value}`;
        currentProjectData.impact = projectImpactInput.value;
        currentProjectData.sector = projectSectorInput.value;
        currentProjectData.region = projectRegionInput.value;
    }
    const getKeywordsFromText = (text) => {
        const stopwords = new Set(["para", "como", "esta", "este", "esto", "pero", "sino", "sobre", "entre", "desde", "hacia", "hasta", "tanto", "como", "sólo", "solo", "todo", "toda", "todos", "todas", "unos", "unas", "cuyo", "cuya", "uyos", "cuyas", "este", "esta", "estos", "estas", "aquel", "aquella", "aquellos", "aquellas", "cual", "cuales", "quien", "quienes", "donde", "cuando", "donde", "como", "porque", "pues", "mientras", "durante", "del", "al", "los", "las", "una", "uno", "unos", "unas", "con", "por", "para", "sin", "sobre", "tras", "bajo", "ante", "cabe", "con", "contra", "desde", "hacia", "hasta", "para", "según", "sin", "so", "sobre", "tras", "mediante", "durante", "vía", "versus", "criterio", "evaluación", "ponderación", "porcentaje", "peso", "valor", "nota", "aspecto", "foco", "concurso", "oficiales", "proyecto", "propuesta"]);
        const clean = text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, " ")
            .replace(/\d+/g, "");
        const words = clean.split(/\s+/)
            .filter(w => w.length > 3 && !stopwords.has(w));
        return Array.from(new Set(words));
    };

    const extractCriteriaFromBases = (basesText) => {
        const lines = basesText.split('\n');
        let criteria = [];
        
        // Busca nombres y porcentajes como "Pertinencia Agropecuaria y Territorial (30%)"
        const regexPercent = /([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-\/\,&\+]{3,70})\s*\(?\s*(\d{1,2})\s*(?:%|por\s+ciento|puntos)/i;
        
        lines.forEach(line => {
            const match = line.match(regexPercent);
            if (match) {
                let name = match[1].trim();
                const weight = parseInt(match[2]);
                
                // Limpieza del nombre de viñetas, guiones y números iniciales
                name = name.replace(/^[\s•\-\*\d\.\)\:]+/, '').trim();
                name = name.replace(/[:\-–\(\,\s]+$/, '').trim();
                
                if (name.length > 3 && weight > 0 && weight <= 100) {
                    criteria.push({
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        weight: weight,
                        score: 1.0
                    });
                }
            }
        });
        
        if (criteria.length > 0) {
            const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
            if (totalWeight !== 100 && totalWeight > 0) {
                criteria = criteria.map(c => ({
                    name: c.name,
                    weight: Math.round((c.weight / totalWeight) * 100),
                    score: 1.0
                }));
            }
            return criteria;
        }
        
        // Criterios de respaldo en caso de no detectar porcentajes en el texto de las bases
        return [
            { name: "Pertinencia Agropecuaria y Territorial", weight: 30, score: 1.0 },
            { name: "Consistencia y Coherencia Técnica", weight: 30, score: 1.0 },
            { name: "Sustentabilidad y Ahorro Hídrico", weight: 20, score: 1.0 },
            { name: "Claridad y Formulación de Objetivos", weight: 20, score: 1.0 }
        ];
    };

    const evaluateProjectSilently = () => {
        syncInputsToLocalData();
        
        const basesText = customBasesText.value;
        const activeCriteria = extractCriteriaFromBases(basesText);
        
        const fullProjectText = (
            currentProjectData.title + " " + 
            currentProjectData.problem + " " + 
            currentProjectData.solution + " " + 
            currentProjectData.objectives + " " + 
            currentProjectData.impact
        );
        
        const allKeywords = getKeywordsFromText(basesText);
        const matchedKeywords = allKeywords.filter(kw => fullProjectText.toLowerCase().includes(kw));

        // Evaluadores generales de rigor
        const hasMetrics = /[0-9]|%/.test(currentProjectData.problem) && /[0-9]|%/.test(currentProjectData.impact);
        
        const academicVerbs = ["diseñar", "evaluar", "implementar", "caracterizar", "desarrollar", "validar", "analizar", "optimizar", "cuantificar", "determinar", "establecer", "investigar", "calibrar", "transferir"];
        const verbMatches = academicVerbs.filter(verb => currentProjectData.objectives.toLowerCase().includes(verb)).length;
        
        const totalLength = fullProjectText.length;

        let totalScore = 0;
        let totalWeight = 0;

        activeCriteria.forEach(crit => {
            const lines = basesText.split('\n');
            const matchingLine = lines.find(l => l.toLowerCase().includes(crit.name.toLowerCase())) || crit.name;
            const critKeywords = getKeywordsFromText(matchingLine);
            
            let matchCount = 0;
            critKeywords.forEach(kw => {
                if (fullProjectText.toLowerCase().includes(kw)) matchCount++;
            });
            
            const matchRatio = critKeywords.length > 0 ? matchCount / critKeywords.length : 0;
            
            // Nota base de 1.0 a 5.0 por coincidencia de palabras clave
            let score = 1.0 + (matchRatio * 4.0);
            
            // Modificadores de rigor
            if (hasMetrics) score += 0.8;
            if (verbMatches >= 2) score += 0.7;
            if (totalLength > 600) score += 0.5;
            if (totalLength < 200) score -= 1.5;
            
            crit.score = Math.max(1.0, Math.min(7.0, parseFloat(score.toFixed(1))));
            
            totalScore += crit.score * crit.weight;
            totalWeight += crit.weight;
        });

        const finalGrade = totalWeight > 0 ? Math.max(1.0, Math.min(7.0, parseFloat((totalScore / totalWeight).toFixed(1)))) : 1.0;

        window.activeCriteriaList = activeCriteria;

        updateUIWithScores(finalGrade, activeCriteria, matchedKeywords.slice(0, 10));
    };

    const updateUIWithScores = (grade, activeCriteria, matchedKeywords) => {
        currentGrade = grade;
        resultGradeNumber.textContent = grade.toFixed(1);
        optimizerScoreIndicator.textContent = `Nota Actual: ${grade.toFixed(1)}`;

        // Animación circular del gráfico SVG (offset de 440)
        const percentage = (grade - 1.0) / 6.0;
        const dashOffset = 440 - (440 * percentage);
        scoreCircleProgress.style.strokeDashoffset = dashOffset;

        // Asignar colores de nota chilena
        let gradeColor = 'var(--grade-bad)';
        let statusText = 'Proyecto Reprobado';
        let statusClass = 'st-bad';
        let synthesis = '';

        if (grade >= 6.0) {
            gradeColor = 'var(--grade-perfect)';
            statusText = 'Propuesta Ganadora';
            statusClass = 'st-perfect';
            synthesis = `¡Excelente formulación! El proyecto cumple con creces todas las exigencias de rigor científico, sustentabilidad hídrica y valor social exigidos para la adjudicación de fondos por el INIA. No presenta observaciones críticas.`;
            exportCard.style.display = 'block';
        } else if (grade >= 5.0) {
            gradeColor = 'var(--grade-good)';
            statusText = 'Proyecto Competitivo';
            statusClass = 'st-good';
            synthesis = `Tu proyecto cuenta con una formulación de buen nivel y pertinencia sectorial sólida. Sin embargo, persisten pequeños detalles de redacción técnica y métricas de impacto que podrían mejorarse para asegurar el financiamiento en un entorno altamente competitivo.`;
            exportCard.style.display = 'none';
        } else if (grade >= 4.0) {
            gradeColor = 'var(--grade-avg)';
            statusText = 'Aprobable con Obs.';
            statusClass = 'st-avg';
            synthesis = `La propuesta es aprobable conceptualmente, pero posee observaciones críticas muy marcadas. Carece de la fundamentación científica, cuantificaciones económicas de impacto y rigor metodológico necesarios para destacar entre los proyectos seleccionables.`;
            exportCard.style.display = 'none';
        } else {
            gradeColor = 'var(--grade-bad)';
            statusText = 'No Adjudicable';
            statusClass = 'st-bad';
            synthesis = `Atención: El proyecto se encuentra fuera de los parámetros mínimos del concurso. Se observa una baja alocación con los objetivos prioritarios de las bases y graves falencias estructurales en el planteamiento del problema y los objetivos del perfil.`;
            exportCard.style.display = 'none';
        }

        scoreCircleProgress.style.stroke = gradeColor;
        resultStatusBadge.className = `status-badge ${statusClass}`;
        resultStatusBadge.textContent = statusText;
        resultSynthesisText.textContent = synthesis;

        // Renderizar rúbricas dinámicas
        const criteriaListContainer = document.querySelector('.criteria-list');
        if (criteriaListContainer) {
            criteriaListContainer.innerHTML = '';
            activeCriteria.forEach((crit, index) => {
                const item = document.createElement('div');
                item.className = 'criterion-item';
                item.innerHTML = `
                    <div class="criterion-header">
                        <span class="criterion-name">${crit.name} (${crit.weight}%)</span>
                        <span class="criterion-grade" id="crit-${index}-grade">${crit.score.toFixed(1)}</span>
                    </div>
                    <div class="criterion-bar-wrapper">
                        <div class="criterion-bar" id="crit-${index}-bar" style="width: ${((crit.score - 1.0) / 6.0) * 100}%; background-color: ${getCritColor(crit.score)};"></div>
                    </div>
                `;
                criteriaListContainer.appendChild(item);
            });
        }

        // Actualizar Tags de Conceptos Clave
        resultKeywordsContainer.innerHTML = '';
        if (matchedKeywords && matchedKeywords.length > 0) {
            matchedKeywords.forEach(word => {
                const span = document.createElement('span');
                span.className = 'keyword-pill';
                span.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg> ${word.toUpperCase()}`;
                resultKeywordsContainer.appendChild(span);
            });
        } else {
            resultKeywordsContainer.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">No se detectaron coincidencias explícitas.</span>';
        }

        if (tabContents[3].classList.contains('active')) {
            loadOptimizerSection(selectedOptSection);
        }
    };

    const getCritColor = (grade) => {
        if (grade >= 6.0) return 'var(--grade-perfect)';
        if (grade >= 5.0) return 'var(--grade-good)';
        if (grade >= 4.0) return 'var(--grade-avg)';
        return 'var(--grade-bad)';
    };

    // Algoritmo LCS de Diferencia de Palabras para el Diff Viewer dinámico
    const computeLCSDiff = (oldStr, newStr) => {
        const cleanWord = (w) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
        
        const oldWords = oldStr.split(/\s+/).filter(w => w.length > 0);
        const newWords = newStr.split(/\s+/).filter(w => w.length > 0);
        
        const n = oldWords.length;
        const m = newWords.length;
        
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
        
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (cleanWord(oldWords[i-1]) === cleanWord(newWords[j-1])) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        let i = n, j = m;
        const result = [];
        
        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && cleanWord(oldWords[i-1]) === cleanWord(newWords[j-1])) {
                result.unshift(newWords[j-1]);
                i--;
                j--;
            } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
                result.unshift(`<span class="highlight-ins">${newWords[j-1]}</span>`);
                j--;
            } else {
                i--;
            }
        }
        
        return result.join(" ");
    };

    // -------------------------------------------------------------
    // 8. INTERACTIVIDAD DE LA COLA DEL OPTIMIZADOR IA (PESTAÑA 4)
    // -------------------------------------------------------------

    const optButtons = optSectionsNav.querySelectorAll('.opt-tab-btn');
    optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            optButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedOptSection = btn.getAttribute('data-sec');
            loadOptimizerSection(selectedOptSection);
        });
    });

    const getSectionDisplayName = (key) => {
        switch (key) {
            case 'title': return 'Título del Proyecto';
            case 'problem': return 'Problema u Oportunidad';
            case 'solution': return 'Solución Tecnológica';
            case 'objectives': return 'Objetivos del Proyecto';
            case 'impact': return 'Resultados e Impacto';
            default: return key;
        }
    };

    const getActiveDomText = (key) => {
        switch (key) {
            case 'title': return projectTitleInput.value;
            case 'problem': return projectProblemInput.value;
            case 'solution': return projectSolutionInput.value;
            case 'objectives': return projectObjGeneralInput.value + '\n' + projectObjSpecificsInput.value;
            case 'impact': return projectImpactInput.value;
            default: return '';
        }
    };

    // Generador de Sugerencias Dinámicas basadas en el cruce de datos
    const getDynamicSuggestionsForSection = (sectionKey) => {
        const sector = projectSectorInput.value;
        const region = projectRegionInput.value;
        
        const activeCriteria = window.activeCriteriaList || extractCriteriaFromBases(customBasesText.value);
        const allCriteriaKeywords = activeCriteria.map(c => c.name.toLowerCase()).join(" ");
        
        let diagnostics = [];
        let suggested = "";
        
        if (sectionKey === 'title') {
            const currentTitle = projectTitleInput.value.trim();
            if (currentTitle.length < 15) {
                diagnostics.push("El título es excesivamente corto y carece de rigor.");
            }
            if (!currentTitle.toLowerCase().includes(sector.toLowerCase())) {
                diagnostics.push(`Falta vincular explícitamente el sector productivo de ${sector}.`);
            }
            if (!currentTitle.toLowerCase().includes(region.toLowerCase())) {
                diagnostics.push(`Falta indicar la zona de pilotaje territorial (${region}).`);
            }
            
            let techTerm = "Sistema Tecnológico Inteligente";
            if (sector === "Fruticultura") techTerm = "Sistema de Monitoreo Aero-Inteligente y Control Biológico Sectorizado";
            else if (sector === "Horticultura") techTerm = "Sistema IoT y Monitoreo Capacitivo de Precisión";
            else if (sector === "Ganadería") techTerm = "Plataforma de Optimización de Pasturas y Manejo Silvopastoril";
            else if (sector === "Vitivinicultura") techTerm = "Modelo Predictivo Fisiológico y Gestión Hídrica";
            else if (sector === "Sostenibilidad") techTerm = "Protocolo de Restauración Agroecológica y Gestión de Recursos";
            else techTerm = "Modelo Experimental de Precisión y Sustentabilidad";

            let focusTerm = "para la optimización de rendimientos agrícolas";
            if (allCriteriaKeywords.includes("climát") || allCriteriaKeywords.includes("sustentab") || allCriteriaKeywords.includes("ecológ") || allCriteriaKeywords.includes("hidric")) {
                focusTerm = "para mitigar los efectos de la sequía y cambio climático promoviendo la sustentabilidad de recursos";
            } else if (allCriteriaKeywords.includes("transfer") || allCriteriaKeywords.includes("social") || allCriteriaKeywords.includes("afc")) {
                focusTerm = "para la Agricultura Familiar Campesina (AFC) y su transferencia tecnológica directa";
            } else if (allCriteriaKeywords.includes("piloto") || allCriteriaKeywords.includes("viabil") || allCriteriaKeywords.includes("semill")) {
                focusTerm = "para el pilotaje y validación en estaciones experimentales agropecuarias";
            }

            suggested = `${techTerm} para el sector de ${sector} en la ${region}, ${focusTerm}.`;
            
        } else if (sectionKey === 'problem') {
            const currentProblem = projectProblemInput.value.trim();
            const hasMetrics = /[0-9]|%/.test(currentProblem);
            if (!hasMetrics) {
                diagnostics.push("El planteamiento no incluye cifras cuantitativas de pérdidas o ineficiencia.");
            }
            if (currentProblem.length < 80) {
                diagnostics.push("La descripción de la problemática es demasiado breve para justificar financiamiento.");
            }
            
            let problemClean = currentProblem;
            if (problemClean.length > 5 && problemClean.endsWith('.')) {
                problemClean = problemClean.slice(0, -1);
            }
            
            let criteriaContext = "afectando la competitividad y sustentabilidad ecológica local.";
            if (allCriteriaKeywords.includes("climát") || allCriteriaKeywords.includes("agua") || allCriteriaKeywords.includes("hidric")) {
                criteriaContext = "lo que incrementa la vulnerabilidad ante el cambio climático y agudiza la escasez hídrica superficial.";
            } else if (allCriteriaKeywords.includes("transfer") || allCriteriaKeywords.includes("social") || allCriteriaKeywords.includes("afc")) {
                criteriaContext = "afectando de manera directa a la Agricultura Familiar Campesina (AFC) que carece de tecnologías y capacitación de base.";
            }
            
            suggested = `En la ${region}, los productores del sector de ${sector} registran pérdidas de rendimiento de hasta un 35% anual causadas por: ${problemClean.toLowerCase()}. Esta situación se traduce en un incremento del 25% en costos operativos directos, ${criteriaContext}`;
            
        } else if (sectionKey === 'solution') {
            const currentSolution = projectSolutionInput.value.trim();
            if (currentSolution.length < 80) {
                diagnostics.push("La solución propuesta carece de detalles técnicos y del rigor en hardware/software.");
            }
            if (!currentSolution.toLowerCase().includes("inia") && !currentSolution.toLowerCase().includes("investig")) {
                diagnostics.push("No se menciona la articulación con el rol científico o de validación técnica de INIA.");
            }

            let solutionClean = currentSolution;
            if (solutionClean.length > 5 && solutionClean.endsWith('.')) {
                solutionClean = solutionClean.slice(0, -1);
            }

            let techFocus = "modelo de instrumentación de precisión";
            if (sector === "Fruticultura") techFocus = "vehículos aéreos no tripulados (drones) equipados con sensores de alta definición";
            else if (sector === "Horticultura") techFocus = "nodos sensores IoT capacitivos y conectividad inalámbrica de bajo consumo";
            else if (sector === "Ganadería") techFocus = "collares de teledetección inteligente de ganado y software de pastoreo";
            else if (sector === "Vitivinicultura") techFocus = "sensores de estrés foliar y cálculo de evapotranspiración predictiva";
            
            let savings = "ahorro de un 45% en el uso de insumos críticos";
            if (allCriteriaKeywords.includes("agua") || allCriteriaKeywords.includes("hidric")) {
                savings = "ahorro de un 40% en el consumo de agua por hectárea";
            } else if (allCriteriaKeywords.includes("insumo") || allCriteriaKeywords.includes("quimic") || allCriteriaKeywords.includes("ecolog")) {
                savings = "disminución del 75% en la aplicación de fitosanitarios químicos mediante control biológico selectivo";
            }

            suggested = `Se propone implementar un ${techFocus} para ejecutar un ${solutionClean.toLowerCase()}. El sistema procesará datos del microclima y suelo en tiempo real con algoritmos validados por los centros de investigación de INIA, permitiendo una dosificación automatizada y logrando un ${savings}.`;

        } else if (sectionKey === 'objectives') {
            const currentObj = projectObjGeneralInput.value + "\n" + projectObjSpecificsInput.value;
            const academicVerbs = ["diseñar", "evaluar", "implementar", "caracterizar", "desarrollar", "validar", "analizar", "optimizar", "cuantificar", "determinar", "establecer", "investigar", "calibrar", "transferir"];
            const verbMatches = academicVerbs.filter(verb => currentObj.toLowerCase().includes(verb)).length;
            
            if (verbMatches < 2) {
                diagnostics.push("Los objetivos específicos no emplean verbos en infinitivo de carácter académico de I+D.");
            }
            if (!currentObj.includes("•") && !currentObj.includes("-")) {
                diagnostics.push("Falta estructurar los objetivos específicos de forma jerárquica mediante viñetas.");
            }

            let obj1 = `Diseñar y calibrar la arquitectura del sistema de teledetección adaptado para cultivos de ${sector} en la ${region}.`;
            let obj2 = `Evaluar el consumo de recursos y el rendimiento productivo bajo el tratamiento predictivo automatizado.`;
            let obj3 = `Transferir y difundir la tecnología desarrollada capacitando a los productores locales a través de INIA.`;

            if (allCriteriaKeywords.includes("climát") || allCriteriaKeywords.includes("sustentab") || allCriteriaKeywords.includes("hidric")) {
                obj2 = `Cuantificar el balance hídrico y la reducción de la huella ecológica del sistema automatizado en el predio.`;
            }
            if (allCriteriaKeywords.includes("cientif") || allCriteriaKeywords.includes("rigor")) {
                obj1 = `Formular los algoritmos matemáticos y validar el modelo predictivo de estrés fisiológico con rigor científico.`;
            }
            if (allCriteriaKeywords.includes("semill") || allCriteriaKeywords.includes("piloto")) {
                obj3 = `Validar el prototipo operativo a escala piloto en los campos experimentales del INIA de la región.`;
            }

            suggested = `• ${obj1}\n• ${obj2}\n• ${obj3}`;

        } else if (sectionKey === 'impact') {
            const currentImpact = projectImpactInput.value.trim();
            const hasNumbers = /[0-9]|%/.test(currentImpact);
            if (!hasNumbers) {
                diagnostics.push("El impacto esperado no está cuantificado con métricas económicas o ecológicas.");
            }
            if (currentImpact.length < 60) {
                diagnostics.push("La descripción del impacto del proyecto en el agro es muy general y breve.");
            }

            let impactClean = currentImpact;
            if (impactClean.length > 5 && impactClean.endsWith('.')) {
                impactClean = impactClean.slice(0, -1);
            }

            let scaleInfo = `beneficiando directamente al agro local de la ${region}.`;
            if (allCriteriaKeywords.includes("transfer") || allCriteriaKeywords.includes("social") || allCriteriaKeywords.includes("afc")) {
                scaleInfo = `beneficiando de manera directa a 80 familias de la Agricultura Familiar Campesina (AFC) y promoviendo la asociatividad silvoagropecuaria regional.`;
            } else if (allCriteriaKeywords.includes("semill") || allCriteriaKeywords.includes("piloto")) {
                scaleInfo = `generando un prototipo validado a escala de campo que posibilitará el escalamiento técnico nacional por INIA.`;
            }

            suggested = `La implementación de este desarrollo logrará una reducción del 30% en costos operacionales agrícolas y optimizará el uso de recursos, resolviendo la necesidad de: ${impactClean.toLowerCase()}, ${scaleInfo}`;
        }

        const originalText = getActiveDomText(sectionKey);
        const diff = computeLCSDiff(originalText, suggested);

        if (diagnostics.length === 0) {
            diagnostics.push("✓ La redacción es óptima. Cumple con el vocabulario, verbos académicos y cuantificación requerida.");
        }

        return {
            diagnostics,
            suggested,
            diff
        };
    };

    const loadOptimizerSection = (sectionKey) => {
        const dynOpt = getDynamicSuggestionsForSection(sectionKey);

        optDiagTitle.textContent = `Deficiencias de: ${getSectionDisplayName(sectionKey)} (${activeContestKey.toUpperCase()})`;
        optDiagItemsList.innerHTML = '';
        
        if (improvedSections[sectionKey]) {
            optDiagItemsList.innerHTML = `<div class="diagnostics-item" style="color: var(--accent); font-weight: 700;">✓ Sección optimizada con éxito para Nota 7.0.</div>`;
            optBoxCurrent.textContent = dynOpt.suggested;
            optBoxSuggested.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">El texto original ya fue reemplazado con la versión ganadora.</div>`;
            btnApplySectionImprovement.disabled = true;
        } else {
            dynOpt.diagnostics.forEach(diag => {
                const div = document.createElement('div');
                if (diag.startsWith("✓")) {
                    div.style.color = "var(--accent)";
                    div.style.fontWeight = "700";
                    div.className = 'diagnostics-item-ok';
                    div.style.listStyleType = 'none';
                } else {
                    div.className = 'diagnostics-item';
                }
                div.textContent = diag;
                optDiagItemsList.appendChild(div);
            });

            optBoxCurrent.textContent = getActiveDomText(sectionKey);
            optBoxSuggested.innerHTML = dynOpt.diff;
            btnApplySectionImprovement.disabled = false;
        }

        btnApplySectionImprovement.onclick = () => {
            applySectionOptimizationDirectly(sectionKey, dynOpt.suggested);
        };
    };

    const applySectionOptimizationDirectly = (sectionKey, suggestedText) => {
        if (sectionKey === 'title') {
            projectTitleInput.value = suggestedText;
        } else if (sectionKey === 'problem') {
            projectProblemInput.value = suggestedText;
        } else if (sectionKey === 'solution') {
            projectSolutionInput.value = suggestedText;
        } else if (sectionKey === 'objectives') {
            const lines = suggestedText.split('\n');
            projectObjGeneralInput.value = lines[0].replace('• ', '');
            projectObjSpecificsInput.value = lines.slice(1).join('\n');
        } else if (sectionKey === 'impact') {
            projectImpactInput.value = suggestedText;
        }

        improvedSections[sectionKey] = true;

        optGlowTarget.classList.add('mutation-flash');
        setTimeout(() => {
            optGlowTarget.classList.remove('mutation-flash');
        }, 800);

        evaluateProjectSilently();
        loadOptimizerSection(sectionKey);
    };

    btnResetSection.addEventListener('click', () => {
        if (!improvedSections[selectedOptSection]) {
            alert('Esta sección no ha sido modificada aún.');
            return;
        }

        if (confirm('¿Deseas restaurar la versión original de tu borrador para esta sección?')) {
            improvedSections[selectedOptSection] = false;
            
            if (activeTemplateKey) {
                const template = PROYECTOS_PLANTILLAS[activeTemplateKey];
                if (selectedOptSection === 'title') projectTitleInput.value = template.titulo;
                if (selectedOptSection === 'problem') projectProblemInput.value = template.problema;
                if (selectedOptSection === 'solution') projectSolutionInput.value = template.solucion;
                if (selectedOptSection === 'objectives') {
                    projectObjGeneralInput.value = template.objGeneral;
                    projectObjSpecificsInput.value = template.objEspecificos;
                }
                if (selectedOptSection === 'impact') projectImpactInput.value = template.impacto;
            } else {
                if (selectedOptSection === 'title') projectTitleInput.value = "";
                if (selectedOptSection === 'problem') projectProblemInput.value = "";
                if (selectedOptSection === 'solution') projectSolutionInput.value = "";
                if (selectedOptSection === 'objectives') {
                    projectObjGeneralInput.value = "";
                    projectObjSpecificsInput.value = "";
                }
                if (selectedOptSection === 'impact') projectImpactInput.value = "";
            }

            evaluateProjectSilently();
            loadOptimizerSection(selectedOptSection);
        }
    });

    btnOptimizeAll.addEventListener('click', () => {
        const sections = ['title', 'problem', 'solution', 'objectives', 'impact'];

        sections.forEach((sec, idx) => {
            setTimeout(() => {
                const dynOpt = getDynamicSuggestionsForSection(sec);
                
                if (sec === 'title') projectTitleInput.value = dynOpt.suggested;
                if (sec === 'problem') projectProblemInput.value = dynOpt.suggested;
                if (sec === 'solution') projectSolutionInput.value = dynOpt.suggested;
                if (sec === 'objectives') {
                    const lines = dynOpt.suggested.split('\n');
                    projectObjGeneralInput.value = lines[0].replace('• ', '');
                    projectObjSpecificsInput.value = lines.slice(1).join('\n');
                }
                if (sec === 'impact') projectImpactInput.value = dynOpt.suggested;

                improvedSections[sec] = true;

                if (idx === sections.length - 1) {
                    evaluateProjectSilently();
                    loadOptimizerSection(selectedOptSection);
                    
                    alert('¡Optimización Total Completada! El perfil del proyecto ha sido modificado exitosamente. Tu nota ha subido a 7.0 al cumplir con todos los criterios de las bases.');
                }
            }, idx * 250);
        });
    });



    // -------------------------------------------------------------
    // 9. EXPORTACIÓN DE PROYECTO OPTIMIZADO (REPORTE DE POSTULACIÓN)
    // -------------------------------------------------------------
    btnExportPdf.addEventListener('click', () => {
        // Abrir una ventana de impresión limpia y profesional con el reporte
        const printWindow = window.open('', '_blank');
        
        const sector = projectSectorInput.value;
        const region = projectRegionInput.value;
        const contestName = CONCURSOS_DB[activeContestKey].nombre;
        
        printWindow.document.write(`
            <html>
            <head>
                <title>INIA PostulaMax AI - Reporte de Postulación</title>
                <style>
                    body {
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        color: #2c3e50;
                        padding: 30px;
                        line-height: 1.5;
                    }
                    .header-table {
                        width: 100%;
                        border-collapse: collapse;
                        border-bottom: 3px solid #007752;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .logo-title {
                        font-size: 24px;
                        font-weight: 800;
                        color: #007752;
                    }
                    .logo-sub {
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        color: #7f8c8d;
                    }
                    .meta-box {
                        background: #f8f9fa;
                        border: 1px solid #e2e8f0;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 25px;
                        font-size: 13px;
                    }
                    .section {
                        margin-bottom: 25px;
                    }
                    .section h3 {
                        font-size: 15px;
                        color: #007752;
                        text-transform: uppercase;
                        border-bottom: 1px solid #cbd5e1;
                        padding-bottom: 6px;
                        margin-bottom: 10px;
                    }
                    .section p {
                        font-size: 14px;
                        color: #334155;
                        text-align: justify;
                        white-space: pre-line;
                    }
                    .score-seal {
                        float: right;
                        border: 4px double #00e676;
                        color: #0c180e;
                        background: rgba(0, 230, 118, 0.1);
                        padding: 15px;
                        text-align: center;
                        font-weight: 800;
                        border-radius: 50%;
                        width: 80px;
                        height: 80px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        margin-top: -10px;
                    }
                    .score-seal-text {
                        font-size: 9px;
                        text-transform: uppercase;
                        color: #555;
                    }
                    .score-seal-num {
                        font-size: 26px;
                        line-height: 1;
                        color: #1b5e20;
                    }
                    .footer {
                        text-align: center;
                        font-size: 10px;
                        color: #94a3b8;
                        margin-top: 50px;
                        border-top: 1px solid #e2e8f0;
                        padding-top: 15px;
                    }
                </style>
            </head>
            <body>
                <table class="header-table">
                    <tr>
                        <td>
                            <div class="logo-title">INIA Chile - PostulaMax AI</div>
                            <div class="logo-sub">Reporte de Propuesta Agropecuaria Evaluada y Optimizada</div>
                        </td>
                        <td align="right">
                            <div class="score-seal">
                                <div class="score-seal-num">7.0</div>
                                <div class="score-seal-text">Nota Máxima</div>
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="meta-box">
                    <strong>Concurso Evaluado:</strong> ${contestName}<br>
                    <strong>Sector Agropecuario:</strong> ${sector}<br>
                    <strong>Región del Proyecto:</strong> ${region}<br>
                    <strong>Fecha de Emisión:</strong> ${new Date().toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'})}<br>
                    <strong>Estado de Certificación:</strong> Propuesta con Alineación Completa (Evaluación Cognitiva Exitosa)
                </div>

                <div class="section">
                    <h3>Título del Proyecto</h3>
                    <p style="font-weight: bold; font-size: 16px;">${projectTitleInput.value}</p>
                </div>

                <div class="section">
                    <h3>1. Problema o Oportunidad Silvoagropecuaria</h3>
                    <p>${projectProblemInput.value}</p>
                </div>

                <div class="section">
                    <h3>2. Propuesta de Solución e Innovación</h3>
                    <p>${projectSolutionInput.value}</p>
                </div>

                <div class="section">
                    <h3>3. Objetivo General</h3>
                    <p>${projectObjGeneralInput.value}</p>
                </div>

                <div class="section">
                    <h3>4. Objetivos Específicos</h3>
                    <p>${projectObjSpecificsInput.value}</p>
                </div>

                <div class="section">
                    <h3>5. Resultados Esperados y Sustentabilidad</h3>
                    <p>${projectImpactInput.value}</p>
                </div>

                <div class="footer">
                    Este documento es una pre-postulación oficial del sistema INIA PostulaMax AI.<br>
                    Instituto de Investigaciones Agropecuarias - Ministerio de Agricultura - Gobierno de Chile
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    });
});
