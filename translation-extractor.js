// Translation Extractor - Extracts all text that needs translation from the app
// This tool helps identify all strings that need to be translated

class TranslationExtractor {
    constructor() {
        this.routines = {};
        this.folders = {};
        this.exercises = {};
        this.uiText = {};
    }

    // Extract all text from bendRoutines
    extractRoutines() {
        console.log('🔍 Extracting routine data...');
        
        // This would normally read from script.js, but for now we'll use the existing data
        const routineKeys = [
            'wake-up', 'posture-reset', 'full-body', 'sleep', 'expert', 
            'hips', 'hamstrings', 'lower-back', 'isometric', 'neck', 
            'shoulders', 'feet', 'ankle', 'knees', 'hands', 'fingers', 
            'wrists', 'feet-ankles'
        ];

        // Extract from existing bendRoutines object
        for (const key of routineKeys) {
            if (bendRoutines[key]) {
                this.routines[key] = {
                    name: bendRoutines[key].name,
                    description: bendRoutines[key].description,
                    exercises: bendRoutines[key].exercises.map(ex => ({
                        name: ex.name,
                        description: ex.description
                    }))
                };
            }
        }

        console.log(`✅ Extracted ${Object.keys(this.routines).length} routines`);
        return this.routines;
    }

    // Extract all text from bodyAreaFolders
    extractFolders() {
        console.log('🔍 Extracting folder data...');
        
        const folderKeys = [
            'hips', 'shoulders', 'lower-back', 'neck', 'hamstrings', 
            'feet-ankles', 'core', 'upper-body', 'lower-body', 
            'seated', 'posture', 'chest'
        ];

        for (const key of folderKeys) {
            if (bodyAreaFolders[key]) {
                this.folders[key] = {
                    name: bodyAreaFolders[key].name,
                    description: bodyAreaFolders[key].description,
                    routines: {}
                };

                // Extract routine data from folders
                for (const [routineKey, routine] of Object.entries(bodyAreaFolders[key].routines)) {
                    this.folders[key].routines[routineKey] = {
                        name: routine.name,
                        description: routine.description,
                        exercises: routine.exercises.map(ex => ({
                            name: ex.name,
                            description: ex.description
                        }))
                    };
                }
            }
        }

        console.log(`✅ Extracted ${Object.keys(this.folders).length} folders`);
        return this.folders;
    }

    // Extract UI text
    extractUIText() {
        console.log('🔍 Extracting UI text...');
        
        this.uiText = {
            app: {
                title: "Bend",
                subtitle: "Stretching & Flexibility",
                description: "A gentle stretching and flexibility app designed for all ages and abilities"
            },
            navigation: {
                back: "Back",
                next: "Next",
                previous: "Previous",
                start: "Start",
                pause: "Pause",
                skip: "Skip",
                chooseRoutine: "Choose a routine:"
            },
            timer: {
                switchSides: "Switch sides",
                exerciseComplete: "Exercise Complete",
                routineComplete: "Routine Complete",
                progress: "{{current}} of {{total}}"
            },
            accessibility: {
                toggleDarkMode: "Toggle dark mode",
                languageSelector: "Select language",
                startPauseTimer: "Start or pause exercise timer",
                nextExercise: "Next exercise",
                previousExercise: "Previous exercise",
                backToRoutines: "Go back to routine selection"
            }
        };

        console.log('✅ Extracted UI text');
        return this.uiText;
    }

    // Generate comprehensive translation template
    generateTranslationTemplate() {
        const template = {
            en: {
                ...this.uiText,
                routines: this.routines,
                folders: this.folders
            },
            de: {
                app: {
                    title: "Bend",
                    subtitle: "Dehnung & Flexibilität",
                    description: "Eine sanfte Dehnungs- und Flexibilitäts-App für alle Altersgruppen und Fähigkeiten"
                },
                navigation: {
                    back: "Zurück",
                    next: "Weiter",
                    previous: "Vorherige",
                    start: "Start",
                    pause: "Pause",
                    skip: "Überspringen",
                    chooseRoutine: "Wähle eine Routine:"
                },
                timer: {
                    switchSides: "Seite wechseln",
                    exerciseComplete: "Übung abgeschlossen",
                    routineComplete: "Routine abgeschlossen",
                    progress: "{{current}} von {{total}}"
                },
                accessibility: {
                    toggleDarkMode: "Dunklen Modus umschalten",
                    languageSelector: "Sprache auswählen",
                    startPauseTimer: "Timer starten oder pausieren",
                    nextExercise: "Nächste Übung",
                    previousExercise: "Vorherige Übung",
                    backToRoutines: "Zurück zur Routineauswahl"
                },
                routines: {},
                folders: {}
            },
            es: {
                app: {
                    title: "Bend",
                    subtitle: "Estiramiento y Flexibilidad",
                    description: "Una aplicación suave de estiramiento y flexibilidad diseñada para todas las edades y habilidades"
                },
                navigation: {
                    back: "Atrás",
                    next: "Siguiente",
                    previous: "Anterior",
                    start: "Comenzar",
                    pause: "Pausar",
                    skip: "Saltar",
                    chooseRoutine: "Elige una rutina:"
                },
                timer: {
                    switchSides: "Cambia de lado",
                    exerciseComplete: "Ejercicio Completado",
                    routineComplete: "Rutina Completada",
                    progress: "{{current}} de {{total}}"
                },
                accessibility: {
                    toggleDarkMode: "Alternar modo oscuro",
                    languageSelector: "Seleccionar idioma",
                    startPauseTimer: "Iniciar o pausar temporizador",
                    nextExercise: "Siguiente ejercicio",
                    previousExercise: "Ejercicio anterior",
                    backToRoutines: "Volver a selección de rutinas"
                },
                routines: {},
                folders: {}
            },
            ta: {
                app: {
                    title: "Bend",
                    subtitle: "நீட்சி மற்றும் நெகிழ்வு",
                    description: "அனைத்து வயதினருக்கும் மற்றும் திறன்களுக்கும் வடிவமைக்கப்பட்ட மென்மையான நீட்சி மற்றும் நெகிழ்வு பயன்பாடு"
                },
                navigation: {
                    back: "பின்",
                    next: "அடுத்து",
                    previous: "முந்தைய",
                    start: "தொடங்கு",
                    pause: "இடைநிறுத்து",
                    skip: "தவிர்க்க",
                    chooseRoutine: "ஒரு வழக்கத்தை தேர்ந்தெடுக்கவும்:"
                },
                timer: {
                    switchSides: "பக்கங்களை மாற்றவும்",
                    exerciseComplete: "பயிற்சி முடிந்தது",
                    routineComplete: "வழக்கமானது முடிந்தது",
                    progress: "{{current}} இல் {{total}}"
                },
                accessibility: {
                    toggleDarkMode: "இருண்ட பயன்முறையை மாற்றவும்",
                    languageSelector: "மொழியைத் தேர்ந்தெடுக்கவும்",
                    startPauseTimer: "பயிற்சி டைமரைத் தொடங்கவும் அல்லது இடைநிறுத்தவும்",
                    nextExercise: "அடுத்த பயிற்சி",
                    previousExercise: "முந்தைய பயிற்சி",
                    backToRoutines: "வழக்கங்கள் தேர்வுக்குத் திரும்பவும்"
                },
                routines: {},
                folders: {}
            }
        };

        return template;
    }

    // Export all data for translation
    exportForTranslation() {
        this.extractRoutines();
        this.extractFolders();
        this.extractUIText();
        
        const template = this.generateTranslationTemplate();
        
        console.log('📋 Translation template generated');
        console.log('Total routines to translate:', Object.keys(this.routines).length);
        console.log('Total folders to translate:', Object.keys(this.folders).length);
        
        return template;
    }
}

// Usage
const extractor = new TranslationExtractor();
const translationData = extractor.exportForTranslation();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationExtractor;
}
