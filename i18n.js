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
    t(key, params = {}, fallback = null) {
        const translation = this.getNestedValue(this.translations[this.currentLang], key) ||
                          this.getNestedValue(this.translations.en, key) ||
                          fallback ||
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
        if (!['en', 'de', 'es', 'ta'].includes(lang)) {
            // Fallback to English for invalid languages
            this.currentLang = 'en';
            localStorage.setItem('bend-language', 'en');
            this.updateDocumentLanguage();
            this.applyTranslations();
            return;
        }
        
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
                routineDescriptions: {
                    wakeUp: "Quick morning mobility flow",
                    postureReset: "Seated stretches for better posture",
                    fullBody: "Comprehensive flexibility routine",
                    sleep: "Gentle stretches for better sleep",
                    expert: "Advanced flexibility training",
                    hips: "Deep hip opening stretches",
                    hamstrings: "Targeted hamstring flexibility",
                    lowerBack: "Relief for lower back pain",
                    isometric: "Strength through static holds",
                    neck: "Relieve neck tension and stiffness",
                    shoulders: "Release shoulder tension",
                    feet: "Foot flexibility and health",
                    ankle: "Ankle mobility and flexibility",
                    knees: "Knee mobility and joint health",
                    hands: "Hand and finger dexterity",
                    fingers: "Individual finger flexibility",
                    wrists: "Wrist mobility and flexibility",
                    feetAnkles: "Foot and ankle mobility routine"
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
                folderDescriptions: {
                    hips: "Hip mobility and flexibility routines",
                    shoulders: "Shoulder mobility and flexibility routines",
                    lowerBack: "Lower back relief and strengthening routines",
                    neck: "Neck mobility and tension relief routines",
                    hamstrings: "Hamstring flexibility and mobility routines",
                    feetAnkles: "Foot and ankle mobility routines",
                    core: "Core strength and stability routines",
                    upperBody: "Upper body mobility and strength routines",
                    lowerBody: "Lower body mobility and strength routines",
                    seated: "Seated exercises for office or limited mobility",
                    posture: "Posture correction and alignment routines",
                    chest: "Chest opening and flexibility routines"
                },
                exercises: {
                    neckrolls: {
                        name: "Neck Rolls",
                        description: "Slowly roll your head in a circle, first clockwise, then counterclockwise. Keep movements gentle and controlled."
                    },
                    shouldershrugs: {
                        name: "Shoulder Shrugs",
                        description: "Lift your shoulders up toward your ears, hold for 3 seconds, then relax. Repeat slowly."
                    },
                    sideneckstretch: {
                        name: "Side Neck Stretch",
                        description: "Gently tilt your head to the right, hold for 15 seconds, then repeat on the left side."
                    },
                    forwardneckstretch: {
                        name: "Forward Neck Stretch",
                        description: "Slowly lower your chin toward your chest, feeling a gentle stretch in the back of your neck."
                    },
                    armcircles: {
                        name: "Arm Circles",
                        description: "Make small circles with your arms, first forward, then backward. Keep movements slow and controlled."
                    },
                    gentleTwist: {
                        name: "Gentle Twist",
                        description: "Stand with feet hip-width apart, place your hands on your hips, and gently twist from side to side."
                    },
                    calfraises: {
                        name: "Calf Raises",
                        description: "Stand tall and slowly rise up onto your toes, then lower back down. Keep movements controlled."
                    },
                    deepbreathing: {
                        name: "Deep Breathing",
                        description: "Take 5 deep breaths, inhaling through your nose and exhaling through your mouth. Feel your body relax."
                    }
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
                routineDescriptions: {
                    wakeUp: "Schneller morgendlicher Mobilitätsfluss",
                    postureReset: "Sitzende Dehnungen für bessere Haltung",
                    fullBody: "Umfassende Flexibilitätsroutine",
                    sleep: "Sanfte Dehnungen für besseren Schlaf",
                    expert: "Fortgeschrittenes Flexibilitätstraining",
                    hips: "Tiefe Hüftöffnungsdehnungen",
                    hamstrings: "Gezielte Oberschenkelrückseiten-Flexibilität",
                    lowerBack: "Linderung bei Rückenschmerzen",
                    isometric: "Kraft durch statische Halteübungen",
                    neck: "Nackenspannung und Steifheit lindern",
                    shoulders: "Schulterspannung lösen",
                    feet: "Fußflexibilität und Gesundheit",
                    ankle: "Knöchelmobilität und Flexibilität",
                    knees: "Kniemobilität und Gelenkgesundheit",
                    hands: "Hand- und Fingerfertigkeit",
                    fingers: "Einzelne Fingerflexibilität",
                    wrists: "Handgelenkmobilität und Flexibilität",
                    feetAnkles: "Fuß- und Knöchelmobilitätsroutine"
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
                folderDescriptions: {
                    hips: "Hüftmobilität und Flexibilitätsroutinen",
                    shoulders: "Schultermobilität und Flexibilitätsroutinen",
                    lowerBack: "Unterer Rücken Entlastung und Kräftigungsroutinen",
                    neck: "Nackenmobilität und Spannungsabbau-Routinen",
                    hamstrings: "Oberschenkelrückseiten-Flexibilität und Mobilitätsroutinen",
                    feetAnkles: "Fuß- und Knöchelmobilitätsroutinen",
                    core: "Rumpfkraft und Stabilitätsroutinen",
                    upperBody: "Oberkörper-Mobilität und Kraftroutinen",
                    lowerBody: "Unterkörper-Mobilität und Kraftroutinen",
                    seated: "Sitzende Übungen für Büro oder eingeschränkte Mobilität",
                    posture: "Haltungskorrektur und Ausrichtungsroutinen",
                    chest: "Brustöffnung und Flexibilitätsroutinen"
                },
                exercises: {
                    neckrolls: {
                        name: "Nackenrollen",
                        description: "Rollen Sie Ihren Kopf langsam im Kreis, zuerst im Uhrzeigersinn, dann gegen den Uhrzeigersinn. Halten Sie die Bewegungen sanft und kontrolliert."
                    },
                    shouldershrugs: {
                        name: "Schulterzucken",
                        description: "Heben Sie Ihre Schultern zu den Ohren, halten Sie 3 Sekunden, dann entspannen Sie. Wiederholen Sie langsam."
                    },
                    sideneckstretch: {
                        name: "Seitliche Nackendehnung",
                        description: "Neigen Sie Ihren Kopf sanft nach rechts, halten Sie 15 Sekunden, dann wiederholen Sie auf der linken Seite."
                    },
                    forwardneckstretch: {
                        name: "Vorwärts Nackendehnung",
                        description: "Senken Sie Ihr Kinn langsam zur Brust, spüren Sie eine sanfte Dehnung im Nacken."
                    },
                    armcircles: {
                        name: "Armkreise",
                        description: "Machen Sie kleine Kreise mit den Armen, zuerst vorwärts, dann rückwärts. Halten Sie die Bewegungen langsam und kontrolliert."
                    },
                    gentleTwist: {
                        name: "Sanfte Drehung",
                        description: "Stehen Sie mit hüftbreit auseinander stehenden Füßen, legen Sie Ihre Hände auf die Hüften und drehen Sie sich sanft von Seite zu Seite."
                    },
                    calfraises: {
                        name: "Wadenheben",
                        description: "Stehen Sie aufrecht und heben Sie sich langsam auf die Zehenspitzen, dann senken Sie sich wieder ab. Halten Sie die Bewegungen kontrolliert."
                    },
                    deepbreathing: {
                        name: "Tiefes Atmen",
                        description: "Atmen Sie 5 Mal tief ein, durch die Nase einatmen und durch den Mund ausatmen. Spüren Sie, wie sich Ihr Körper entspannt."
                    }
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
                routineDescriptions: {
                    wakeUp: "Flujo de movilidad matutina rápida",
                    postureReset: "Estiramientos sentados para mejor postura",
                    fullBody: "Rutina integral de flexibilidad",
                    sleep: "Estiramientos suaves para mejor sueño",
                    expert: "Entrenamiento avanzado de flexibilidad",
                    hips: "Estiramientos profundos de apertura de cadera",
                    hamstrings: "Flexibilidad dirigida de isquiotibiales",
                    lowerBack: "Alivio para dolor de espalda baja",
                    isometric: "Fuerza a través de posiciones estáticas",
                    neck: "Aliviar tensión y rigidez del cuello",
                    shoulders: "Liberar tensión de hombros",
                    feet: "Flexibilidad y salud del pie",
                    ankle: "Movilidad y flexibilidad del tobillo",
                    knees: "Movilidad de rodilla y salud articular",
                    hands: "Destreza de manos y dedos",
                    fingers: "Flexibilidad individual de dedos",
                    wrists: "Movilidad y flexibilidad de muñeca",
                    feetAnkles: "Rutina de movilidad de pies y tobillos"
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
                folderDescriptions: {
                    hips: "Rutinas de movilidad y flexibilidad de cadera",
                    shoulders: "Rutinas de movilidad y flexibilidad de hombros",
                    lowerBack: "Rutinas de alivio y fortalecimiento de espalda baja",
                    neck: "Rutinas de movilidad de cuello y alivio de tensión",
                    hamstrings: "Rutinas de flexibilidad y movilidad de isquiotibiales",
                    feetAnkles: "Rutinas de movilidad de pies y tobillos",
                    core: "Rutinas de fuerza y estabilidad del núcleo",
                    upperBody: "Rutinas de movilidad y fuerza de parte superior",
                    lowerBody: "Rutinas de movilidad y fuerza de parte inferior",
                    seated: "Ejercicios sentados para oficina o movilidad limitada",
                    posture: "Rutinas de corrección y alineación de postura",
                    chest: "Rutinas de apertura y flexibilidad de pecho"
                },
                exercises: {
                    neckrolls: {
                        name: "Rotaciones de Cuello",
                        description: "Rote su cabeza lentamente en círculo, primero en el sentido de las agujas del reloj, luego en sentido contrario. Mantenga los movimientos suaves y controlados."
                    },
                    shouldershrugs: {
                        name: "Encogimiento de Hombros",
                        description: "Levante los hombros hacia las orejas, mantenga 3 segundos, luego relaje. Repita lentamente."
                    },
                    sideneckstretch: {
                        name: "Estiramiento Lateral del Cuello",
                        description: "Incline suavemente la cabeza hacia la derecha, mantenga 15 segundos, luego repita en el lado izquierdo."
                    },
                    forwardneckstretch: {
                        name: "Estiramiento Frontal del Cuello",
                        description: "Baje lentamente la barbilla hacia el pecho, sintiendo un estiramiento suave en la parte posterior del cuello."
                    },
                    armcircles: {
                        name: "Círculos con Brazos",
                        description: "Haga círculos pequeños con los brazos, primero hacia adelante, luego hacia atrás. Mantenga los movimientos lentos y controlados."
                    },
                    gentleTwist: {
                        name: "Giro Suave",
                        description: "Párese con los pies separados al ancho de las caderas, coloque las manos en las caderas y gire suavemente de lado a lado."
                    },
                    calfraises: {
                        name: "Elevación de Pantorrillas",
                        description: "Párese derecho y levántese lentamente sobre las puntas de los pies, luego baje de nuevo. Mantenga los movimientos controlados."
                    },
                    deepbreathing: {
                        name: "Respiración Profunda",
                        description: "Tome 5 respiraciones profundas, inhalando por la nariz y exhalando por la boca. Sienta cómo su cuerpo se relaja."
                    }
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
                routineDescriptions: {
                    wakeUp: "விரைவான காலை இயக்கத்திறன் ஓட்டம்",
                    postureReset: "சிறந்த உடல்நிலைக்கு உட்கார்ந்த நீட்சிகள்",
                    fullBody: "விரிவான நெகிழ்வு வழக்கம்",
                    sleep: "சிறந்த தூக்கத்திற்கு மென்மையான நீட்சிகள்",
                    expert: "மேம்பட்ட நெகிழ்வு பயிற்சி",
                    hips: "ஆழமான இடுப்பு திறப்பு நீட்சிகள்",
                    hamstrings: "இலக்கு பின்புற துடை எலும்பு நெகிழ்வு",
                    lowerBack: "கீழ் முதுகு வலிக்கு நிவாரணம்",
                    isometric: "நிலையான பிடிப்புகள் மூலம் வலிமை",
                    neck: "கழுத்து பதற்றம் மற்றும் விறைப்பை நிவாரணம்",
                    shoulders: "தோள் பதற்றத்தை விடுவித்தல்",
                    feet: "பாத நெகிழ்வு மற்றும் ஆரோக்கியம்",
                    ankle: "கணுக்கால் இயக்கத்திறன் மற்றும் நெகிழ்வு",
                    knees: "முழங்கால் இயக்கத்திறன் மற்றும் மூட்டு ஆரோக்கியம்",
                    hands: "கை மற்றும் விரல் திறமை",
                    fingers: "தனிப்பட்ட விரல் நெகிழ்வு",
                    wrists: "மணிக்கட்டு இயக்கத்திறன் மற்றும் நெகிழ்வு",
                    feetAnkles: "பாத மற்றும் கணுக்கால் இயக்கத்திறன் வழக்கம்"
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
                folderDescriptions: {
                    hips: "இடுப்பு இயக்கத்திறன் மற்றும் நெகிழ்வு வழக்கங்கள்",
                    shoulders: "தோள் இயக்கத்திறன் மற்றும் நெகிழ்வு வழக்கங்கள்",
                    lowerBack: "கீழ் முதுகு நிவாரணம் மற்றும் வலிமைப்படுத்தும் வழக்கங்கள்",
                    neck: "கழுத்து இயக்கத்திறன் மற்றும் பதற்ற நிவாரண வழக்கங்கள்",
                    hamstrings: "பின்புற துடை எலும்பு நெகிழ்வு மற்றும் இயக்கத்திறன் வழக்கங்கள்",
                    feetAnkles: "பாத மற்றும் கணுக்கால் இயக்கத்திறன் வழக்கங்கள்",
                    core: "மைய வலிமை மற்றும் நிலைப்பாடு வழக்கங்கள்",
                    upperBody: "மேல் உடல் இயக்கத்திறன் மற்றும் வலிமை வழக்கங்கள்",
                    lowerBody: "கீழ் உடல் இயக்கத்திறன் மற்றும் வலிமை வழக்கங்கள்",
                    seated: "அலுவலகம் அல்லது வரையறுக்கப்பட்ட இயக்கத்திறனுக்கான உட்கார்ந்த பயிற்சிகள்",
                    posture: "உடல்நிலை திருத்தம் மற்றும் சீரமைப்பு வழக்கங்கள்",
                    chest: "மார்பு திறப்பு மற்றும் நெகிழ்வு வழக்கங்கள்"
                },
                exercises: {
                    neckrolls: {
                        name: "கழுத்து சுழற்சி",
                        description: "உங்கள் தலையை மெதுவாக வட்டமாக சுழற்றுங்கள், முதலில் கடிகார திசையில், பின்னர் எதிர் திசையில். இயக்கங்களை மென்மையாகவும் கட்டுப்பாட்டுடனும் வைத்திருங்கள்."
                    },
                    shouldershrugs: {
                        name: "தோள் உயர்த்துதல்",
                        description: "உங்கள் தோள்களை காதுகளுக்கு நோக்கி உயர்த்துங்கள், 3 வினாடிகள் வைத்திருங்கள், பின்னர் தளர்த்துங்கள். மெதுவாக மீண்டும் செய்யுங்கள்."
                    },
                    sideneckstretch: {
                        name: "பக்க கழுத்து நீட்சி",
                        description: "உங்கள் தலையை வலது பக்கமாக மெதுவாக சாய்த்து, 15 வினாடிகள் வைத்திருங்கள், பின்னர் இடது பக்கத்தில் மீண்டும் செய்யுங்கள்."
                    },
                    forwardneckstretch: {
                        name: "முன்னோக்கி கழுத்து நீட்சி",
                        description: "உங்கள் தாடியை மெதுவாக மார்புக்கு நோக்கி கீழே கொண்டு வாருங்கள், உங்கள் கழுத்தின் பின்புறத்தில் மென்மையான நீட்சியை உணருங்கள்."
                    },
                    armcircles: {
                        name: "கை வட்டங்கள்",
                        description: "உங்கள் கைகளால் சிறிய வட்டங்கள் செய்யுங்கள், முதலில் முன்னோக்கி, பின்னர் பின்னோக்கி. இயக்கங்களை மெதுவாகவும் கட்டுப்பாட்டுடனும் வைத்திருங்கள்."
                    },
                    gentleTwist: {
                        name: "மென்மையான திருப்பம்",
                        description: "உங்கள் கால்களை இடுப்பு அகலத்தில் வைத்து நிற்கவும், உங்கள் கைகளை இடுப்புகளில் வைக்கவும், மற்றும் பக்கத்திலிருந்து பக்கத்திற்கு மெதுவாக திருப்புங்கள்."
                    },
                    calfraises: {
                        name: "கால் தசை உயர்த்துதல்",
                        description: "நேராக நிற்கவும் மற்றும் மெதுவாக உங்கள் கால் விரல்களில் உயர்த்துங்கள், பின்னர் மீண்டும் கீழே கொண்டு வாருங்கள். இயக்கங்களை கட்டுப்பாட்டுடன் வைத்திருங்கள்."
                    },
                    deepbreathing: {
                        name: "ஆழமான சுவாசம்",
                        description: "5 ஆழமான சுவாசங்கள் எடுக்கவும், மூக்கு வழியாக உள்ளிழுக்கவும் மற்றும் வாய் வழியாக வெளியேற்றவும். உங்கள் உடல் தளர்வடைகிறது என்பதை உணருங்கள்."
                    }
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

// Language Selector Functionality
function setupLanguageSelector() {
    const languageButton = document.getElementById('language-button');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageFlag = document.getElementById('language-flag');
    const currentLanguage = document.getElementById('current-language');
    
    if (!languageButton || !languageDropdown) {
        console.warn('Language selector elements not found');
        return;
    }
    
    // Populate dropdown with available languages
    function populateLanguageDropdown() {
        const languages = window.i18n.getAvailableLanguages();
        languageDropdown.innerHTML = '';
        
        languages.forEach(lang => {
            const option = document.createElement('div');
            option.className = 'language-option';
            option.dataset.lang = lang.code;
            
            if (lang.code === window.i18n.currentLang) {
                option.classList.add('selected');
            }
            
            option.innerHTML = `
                <span class="language-option-flag">${lang.flag}</span>
                <span class="language-option-name">${lang.name}</span>
            `;
            
            option.addEventListener('click', () => {
                window.i18n.changeLanguage(lang.code);
                updateLanguageDisplay(lang);
                closeDropdown();
            });
            
            languageDropdown.appendChild(option);
        });
    }
    
    // Update language display
    function updateLanguageDisplay(lang) {
        if (languageFlag) languageFlag.textContent = lang.flag;
        if (currentLanguage) currentLanguage.textContent = lang.code.toUpperCase();
    }
    
    // Toggle dropdown
    function toggleDropdown() {
        const isOpen = languageDropdown.classList.contains('open');
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    // Open dropdown
    function openDropdown() {
        languageDropdown.classList.add('open');
        languageButton.setAttribute('aria-expanded', 'true');
    }
    
    // Close dropdown
    function closeDropdown() {
        languageDropdown.classList.remove('open');
        languageButton.setAttribute('aria-expanded', 'false');
    }
    
    // Event listeners
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageButton.contains(e.target) && !languageDropdown.contains(e.target)) {
            closeDropdown();
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDropdown();
        }
    });
    
    // Initialize dropdown
    populateLanguageDropdown();
    
    // Set initial language display
    const currentLang = window.i18n.getAvailableLanguages().find(lang => lang.code === window.i18n.currentLang);
    if (currentLang) {
        updateLanguageDisplay(currentLang);
    }
}

// Initialize global i18n instance
window.i18n = new BendI18n();

// Setup language selector and apply translations when DOM is ready
function initializeApp() {
    setupLanguageSelector();
    // Apply translations after DOM is ready with a small delay to ensure all elements are loaded
    setTimeout(() => {
        window.i18n.applyTranslations();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BendI18n;
}
