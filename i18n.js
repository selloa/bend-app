// Bend App - Internationalization System
// Lightweight i18n system for English, German, and Spanish

class BendI18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = this.getBuiltInTranslations();
        this.isLoaded = true;
        
        this.updateDocumentLanguage();
    }

    // Detect user's preferred language
    detectLanguage() {
        // Priority: localStorage > navigator language > default 'en'
        const saved = localStorage.getItem('bend-language');
        if (saved) return saved;
        
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        const lang = browserLang.split('-')[0]; // Get base language (en from en-US)
        
        // Support en, de, es, ta
        return ['en', 'de', 'es', 'ta'].includes(lang) ? lang : 'en';
    }

    // Get translation for a key
    t(key, params = {}) {
        const translation = this.getNestedValue(this.translations[this.currentLang], key) ||
                          this.getNestedValue(this.translations.en, key) ||
                          key;
        
        // Replace parameters in translation
        return this.interpolate(translation, params);
    }

    // Get nested object value by dot notation
    getNestedValue(obj, key) {
        return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, obj);
    }

    // Replace parameters in translation strings
    interpolate(str, params) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
    }

    // Change language
    changeLanguage(lang) {
        if (lang === this.currentLang) return;
        if (!['en', 'de', 'es', 'ta'].includes(lang)) return;
        
        this.currentLang = lang;
        localStorage.setItem('bend-language', lang);
        this.updateDocumentLanguage();
        this.applyTranslations();
        
        // Notify listeners about language change
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    // Update document language attributes
    updateDocumentLanguage() {
        document.documentElement.lang = this.currentLang;
        
        // Update meta description if available
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = this.t('app.description');
        }
    }

    // Apply translations to elements with data-i18n attributes
    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.hasAttribute('data-i18n-attr')) {
                // Translate attribute
                const attr = element.getAttribute('data-i18n-attr');
                element.setAttribute(attr, translation);
            } else {
                // Translate text content
                element.textContent = translation;
            }
        });
        
        // Apply placeholder translations
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
    }

    // Get list of available languages
    getAvailableLanguages() {
        return [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'es', name: 'Español', flag: '🇪🇸' },
            { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
        ];
    }

    // Built-in translations to ensure app always works
    getBuiltInTranslations() {
        return {
            en: {
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
                routines: {
                    wakeUp: "Wake Up",
                    bedTime: "Bed Time", 
                    neckShoulders: "Neck & Shoulders",
                    backSpine: "Back & Spine",
                    legsHips: "Legs & Hips",
                    armsWrists: "Arms & Wrists",
                    feetAnkles: "Feet & Ankles",
                    fullBody: "Full Body",
                    quickStretch: "Quick Stretch",
                    postureReset: "Posture Reset",
                    sleep: "Sleep",
                    expert: "Expert",
                    hips: "Hips",
                    hamstrings: "Hamstrings",
                    lowerBack: "Lower Back",
                    isometric: "Isometric",
                    neck: "Neck",
                    shoulders: "Shoulders",
                    feet: "Feet",
                    ankle: "Ankle",
                    knees: "Knees",
                    hands: "Hands",
                    fingers: "Fingers",
                    wrists: "Wrists",
                    wakeUpComplete: "Wake Up Complete",
                    neckShoulders5min: "Neck & Shoulders - 5 min",
                    neckShoulders10min: "Neck & Shoulders - 10 min"
                },
                folders: {
                    hips: "Hips",
                    shoulders: "Shoulders",
                    lowerBack: "Lower Back", 
                    neck: "Neck",
                    hamstrings: "Hamstrings",
                    feetAnkles: "Feet & Ankles",
                    core: "Core",
                    upperBody: "Upper Body",
                    lowerBody: "Lower Body",
                    seated: "Seated",
                    posture: "Posture",
                    chest: "Chest"
                },
                accessibility: {
                    toggleDarkMode: "Toggle dark mode",
                    languageSelector: "Select language",
                    startPauseTimer: "Start or pause exercise timer",
                    nextExercise: "Next exercise",
                    previousExercise: "Previous exercise",
                    backToRoutines: "Go back to routine selection"
                }
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
                routines: {
                    wakeUp: "Aufwachen",
                    bedTime: "Schlafenszeit",
                    neckShoulders: "Nacken & Schultern",
                    backSpine: "Rücken & Wirbelsäule",
                    legsHips: "Beine & Hüften",
                    armsWrists: "Arme & Handgelenke",
                    feetAnkles: "Füße & Knöchel",
                    fullBody: "Ganzkörper",
                    quickStretch: "Schnelle Dehnung",
                    postureReset: "Haltung zurücksetzen",
                    sleep: "Schlaf",
                    expert: "Experte",
                    hips: "Hüften",
                    hamstrings: "Oberschenkelrückseite",
                    lowerBack: "Unterer Rücken",
                    isometric: "Isometrisch",
                    neck: "Nacken",
                    shoulders: "Schultern",
                    feet: "Füße",
                    ankle: "Knöchel",
                    knees: "Knie",
                    hands: "Hände",
                    fingers: "Finger",
                    wrists: "Handgelenke",
                    wakeUpComplete: "Vollständiges Aufwachen",
                    neckShoulders5min: "Nacken & Schultern - 5 Min",
                    neckShoulders10min: "Nacken & Schultern - 10 Min"
                },
                folders: {
                    hips: "Hüften",
                    shoulders: "Schultern",
                    lowerBack: "Unterer Rücken",
                    neck: "Nacken",
                    hamstrings: "Oberschenkelrückseite",
                    feetAnkles: "Füße & Knöchel",
                    core: "Rumpf",
                    upperBody: "Oberkörper",
                    lowerBody: "Unterkörper",
                    seated: "Sitzend",
                    posture: "Haltung",
                    chest: "Brust"
                },
                accessibility: {
                    toggleDarkMode: "Dunklen Modus umschalten",
                    languageSelector: "Sprache auswählen",
                    startPauseTimer: "Timer starten oder pausieren",
                    nextExercise: "Nächste Übung",
                    previousExercise: "Vorherige Übung",
                    backToRoutines: "Zurück zur Routineauswahl"
                }
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
                routines: {
                    wakeUp: "Despertar",
                    bedTime: "Hora de Dormir",
                    neckShoulders: "Cuello y Hombros",
                    backSpine: "Espalda y Columna",
                    legsHips: "Piernas y Caderas",
                    armsWrists: "Brazos y Muñecas",
                    feetAnkles: "Pies y Tobillos",
                    fullBody: "Cuerpo Completo",
                    quickStretch: "Estiramiento Rápido",
                    postureReset: "Reinicio de Postura",
                    sleep: "Dormir",
                    expert: "Experto",
                    hips: "Caderas",
                    hamstrings: "Isquiotibiales",
                    lowerBack: "Espalda Baja",
                    isometric: "Isométrico",
                    neck: "Cuello",
                    shoulders: "Hombros",
                    feet: "Pies",
                    ankle: "Tobillo",
                    knees: "Rodillas",
                    hands: "Manos",
                    fingers: "Dedos",
                    wrists: "Muñecas",
                    wakeUpComplete: "Despertar Completo",
                    neckShoulders5min: "Cuello y Hombros - 5 min",
                    neckShoulders10min: "Cuello y Hombros - 10 min"
                },
                folders: {
                    hips: "Caderas",
                    shoulders: "Hombros",
                    lowerBack: "Espalda Baja",
                    neck: "Cuello",
                    hamstrings: "Isquiotibiales",
                    feetAnkles: "Pies y Tobillos",
                    core: "Núcleo",
                    upperBody: "Parte Superior",
                    lowerBody: "Parte Inferior",
                    seated: "Sentado",
                    posture: "Postura",
                    chest: "Pecho"
                },
                accessibility: {
                    toggleDarkMode: "Alternar modo oscuro",
                    languageSelector: "Seleccionar idioma",
                    startPauseTimer: "Iniciar o pausar temporizador",
                    nextExercise: "Siguiente ejercicio",
                    previousExercise: "Ejercicio anterior",
                    backToRoutines: "Volver a selección de rutinas"
                }
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
                routines: {
                    wakeUp: "எழுந்திரு",
                    bedTime: "படுக்கை நேரம்",
                    neckShoulders: "கழுத்து மற்றும் தோள்கள்",
                    backSpine: "முதுகு மற்றும் முதுகெலும்பு",
                    legsHips: "கால்கள் மற்றும் இடுப்புகள்",
                    armsWrists: "கைகள் மற்றும் மணிக்கட்டுகள்",
                    feetAnkles: "பாதங்கள் மற்றும் கணுக்கால்கள்",
                    fullBody: "முழு உடல்",
                    quickStretch: "விரைவு நீட்சி",
                    postureReset: "உடல்நிலை மீட்டமைப்பு",
                    sleep: "தூக்கம்",
                    expert: "நிபுணர்",
                    hips: "இடுப்புகள்",
                    hamstrings: "பின்புற துடை எலும்பு",
                    lowerBack: "கீழ் முதுகு",
                    isometric: "ஐசோமெட்ரிக்",
                    neck: "கழுத்து",
                    shoulders: "தோள்கள்",
                    feet: "பாதங்கள்",
                    ankle: "கணுக்கால்",
                    knees: "முழங்கால்கள்",
                    hands: "கைகள்",
                    fingers: "விரல்கள்",
                    wrists: "மணிக்கட்டுகள்",
                    wakeUpComplete: "முழுமையான எழுந்திருத்தல்",
                    neckShoulders5min: "கழுத்து மற்றும் தோள்கள் - 5 நிமிடம்",
                    neckShoulders10min: "கழுத்து மற்றும் தோள்கள் - 10 நிமிடம்"
                },
                folders: {
                    hips: "இடுப்புகள்",
                    shoulders: "தோள்கள்",
                    lowerBack: "கீழ் முதுகு",
                    neck: "கழுத்து",
                    hamstrings: "பின்புற துடை எலும்பு",
                    feetAnkles: "பாதங்கள் மற்றும் கணுக்கால்கள்",
                    core: "மையம்",
                    upperBody: "மேல் உடல்",
                    lowerBody: "கீழ் உடல்",
                    seated: "உட்கார்ந்து",
                    posture: "உடல்நிலை",
                    chest: "மார்பு"
                },
                accessibility: {
                    toggleDarkMode: "இருண்ட பயன்முறையை மாற்றவும்",
                    languageSelector: "மொழியைத் தேர்ந்தெடுக்கவும்",
                    startPauseTimer: "பயிற்சி டைமரைத் தொடங்கவும் அல்லது இடைநிறுத்தவும்",
                    nextExercise: "அடுத்த பயிற்சி",
                    previousExercise: "முந்தைய பயிற்சி",
                    backToRoutines: "வழக்கங்கள் தேர்வுக்குத் திரும்பவும்"
                }
            }
        };
    }
}

// Initialize global i18n instance
window.i18n = new BendI18n();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BendI18n;
}
