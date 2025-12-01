// Tend App - Internationalization System
// Lightweight i18n system for English, German, and Spanish

class TendI18n {
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

    // Get translation for a key with error handling
    t(key, params = {}, fallback = null) {
        try {
            const translation = this.getNestedValue(this.translations[this.currentLang], key) ||
                              this.getNestedValue(this.translations.en, key) ||
                              fallback ||
                              key;
            
            // Replace parameters in translation
            return this.interpolate(translation, params);
        } catch (error) {
            console.error('Translation error for key:', key, error);
            // Return the key itself as a fallback
            return key;
        }
    }

    // Get nested object value by dot notation
    getNestedValue(obj, key) {
        return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, obj);
    }

    // Replace parameters in translation strings with error handling
    interpolate(str, params) {
        try {
            if (typeof str !== 'string') return str;
            return str.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
        } catch (error) {
            console.error('Interpolation error:', error);
            return str;
        }
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
                    title: "Tend",
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
                    routineCompleteMessage: "You've completed the {{routineName}} routine!",
                    startNewRoutine: "Start New Routine",
                    minutes: "Minutes",
                    exercises: "Exercises",
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
                    backSafeHips: "Back-Safe Hip Strengthening",
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
                    neckShoulders10min: "Neck & Shoulders - 10 min",
                    "neck-4min": "Neck - 4 min",
                    "neck-8min": "Neck - 8 min",
                    "neck-12min": "Neck - 12 min",
                    "hips-5min": "Hips - 5 min",
                    "hips-10min": "Hips - 10 min",
                    "hips-15min": "Hips - 15 min",
                    "hips-20min": "Hips - 20 min",
                    "shoulders-4min": "Shoulders - 4 min",
                    "shoulders-8min": "Shoulders - 8 min",
                    "shoulders-12min": "Shoulders - 12 min",
                    "shoulders-16min": "Shoulders - 16 min",
                    "lower-back-5min": "Lower Back - 5 min",
                    "lower-back-10min": "Lower Back - 10 min",
                    "lower-back-15min": "Lower Back - 15 min",
                    "lower-back-20min": "Lower Back - 20 min",
                    "hamstrings-5min": "Hamstrings - 5 min",
                    "hamstrings-10min": "Hamstrings - 10 min",
                    "hamstrings-15min": "Hamstrings - 15 min",
                    "feet-ankles-4min": "Feet & Ankles - 4 min",
                    "feet-ankles-8min": "Feet & Ankles - 8 min",
                    "feet-ankles-12min": "Feet & Ankles - 12 min",
                    "core-5min": "Core - 5 min",
                    "core-10min": "Core - 10 min",
                    "core-15min": "Core - 15 min",
                    "upper-body-4min": "Upper Body - 4 min",
                    "upper-body-8min": "Upper Body - 8 min",
                    "upper-body-12min": "Upper Body - 12 min",
                    "lower-body-5min": "Lower Body - 5 min",
                    "lower-body-10min": "Lower Body - 10 min",
                    "lower-body-15min": "Lower Body - 15 min",
                    "seated-4min": "Seated - 4 min",
                    "seated-8min": "Seated - 8 min",
                    "seated-12min": "Seated - 12 min",
                    "posture-4min": "Posture - 4 min",
                    "posture-8min": "Posture - 8 min",
                    "posture-12min": "Posture - 12 min",
                    "chest-4min": "Chest - 4 min",
                    "chest-8min": "Chest - 8 min",
                    "chest-12min": "Chest - 12 min"
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
                    backSafeHips: "Gentle hip and core strengthening for people with back issues",
                    isometric: "Strength through static holds",
                    neck: "Relieve neck tension and stiffness",
                    shoulders: "Release shoulder tension",
                    feet: "Foot flexibility and health",
                    ankle: "Ankle mobility and flexibility",
                    knees: "Knee mobility and joint health",
                    hands: "Hand and finger dexterity",
                    fingers: "Individual finger flexibility",
                    wrists: "Wrist mobility and flexibility",
                    "neck-4min": "Quick neck tension relief",
                    "neck-8min": "Comprehensive neck mobility routine",
                    "neck-12min": "Extended neck therapy routine",
                    "hips-5min": "Quick hip mobility routine",
                    "hips-10min": "Comprehensive hip flexibility routine",
                    "hips-15min": "Extended hip mobility and strength routine",
                    "hips-20min": "Complete hip mobility, flexibility and strength routine",
                    feetAnkles: "Foot and ankle mobility routine",
                    "shoulders-4min": "Quick shoulder mobility routine",
                    "shoulders-8min": "Comprehensive shoulder flexibility routine",
                    "shoulders-12min": "Extended shoulder mobility and strength routine",
                    "shoulders-16min": "Complete shoulder therapy and mobility routine",
                    "lower-back-5min": "Quick lower back relief routine",
                    "lower-back-10min": "Comprehensive lower back mobility routine",
                    "lower-back-15min": "Extended lower back therapy routine",
                    "lower-back-20min": "Complete lower back rehabilitation routine",
                    "hamstrings-5min": "Quick hamstring flexibility routine",
                    "hamstrings-10min": "Comprehensive hamstring flexibility routine",
                    "hamstrings-15min": "Extended hamstring mobility and strength routine",
                    "feet-ankles-4min": "Quick foot and ankle mobility routine",
                    "feet-ankles-8min": "Comprehensive foot and ankle flexibility routine",
                    "feet-ankles-12min": "Extended foot and ankle therapy routine",
                    "core-5min": "Quick core strengthening routine",
                    "core-10min": "Comprehensive core stability routine",
                    "core-15min": "Extended core strength and stability routine",
                    "upper-body-4min": "Quick upper body mobility routine",
                    "upper-body-8min": "Comprehensive upper body flexibility routine",
                    "upper-body-12min": "Extended upper body strength and mobility routine",
                    "lower-body-5min": "Quick lower body mobility routine",
                    "lower-body-10min": "Comprehensive lower body flexibility routine",
                    "lower-body-15min": "Extended lower body strength and mobility routine",
                    "seated-4min": "Quick seated mobility routine",
                    "seated-8min": "Comprehensive seated flexibility routine",
                    "seated-12min": "Extended seated therapy routine",
                    "posture-4min": "Quick posture correction routine",
                    "posture-8min": "Comprehensive posture improvement routine",
                    "posture-12min": "Extended posture therapy routine",
                    "chest-4min": "Quick chest opening routine",
                    "chest-8min": "Comprehensive chest flexibility routine",
                    "chest-12min": "Extended chest therapy routine",
                    "shoulders-4min": "Rutina rápida de movilidad de hombros",
                    "shoulders-8min": "Rutina integral de flexibilidad de hombros",
                    "shoulders-12min": "Rutina extendida de movilidad y fuerza de hombros",
                    "shoulders-16min": "Rutina completa de terapia y movilidad de hombros",
                    "lower-back-5min": "Rutina rápida de alivio de espalda baja",
                    "lower-back-10min": "Rutina integral de movilidad de espalda baja",
                    "lower-back-15min": "Rutina extendida de terapia de espalda baja",
                    "lower-back-20min": "Rutina completa de rehabilitación de espalda baja",
                    "hamstrings-5min": "Rutina rápida de flexibilidad de isquiotibiales",
                    "hamstrings-10min": "Rutina integral de flexibilidad de isquiotibiales",
                    "hamstrings-15min": "Rutina extendida de movilidad y fuerza de isquiotibiales",
                    "feet-ankles-4min": "Rutina rápida de movilidad de pies y tobillos",
                    "feet-ankles-8min": "Rutina integral de flexibilidad de pies y tobillos",
                    "feet-ankles-12min": "Rutina extendida de terapia de pies y tobillos",
                    "core-5min": "Rutina rápida de fortalecimiento del core",
                    "core-10min": "Rutina integral de estabilidad del core",
                    "core-15min": "Rutina extendida de fuerza y estabilidad del core",
                    "upper-body-4min": "Rutina rápida de movilidad del tren superior",
                    "upper-body-8min": "Rutina integral de flexibilidad del tren superior",
                    "upper-body-12min": "Rutina extendida de fuerza y movilidad del tren superior",
                    "lower-body-5min": "Rutina rápida de movilidad del tren inferior",
                    "lower-body-10min": "Rutina integral de flexibilidad del tren inferior",
                    "lower-body-15min": "Rutina extendida de fuerza y movilidad del tren inferior",
                    "seated-4min": "Rutina rápida de movilidad sentada",
                    "seated-8min": "Rutina integral de flexibilidad sentada",
                    "seated-12min": "Rutina extendida de terapia sentada",
                    "posture-4min": "Rutina rápida de corrección postural",
                    "posture-8min": "Rutina integral de mejora postural",
                    "posture-12min": "Rutina extendida de terapia postural",
                    "chest-4min": "Rutina rápida de apertura de pecho",
                    "chest-8min": "Rutina integral de flexibilidad de pecho",
                    "chest-12min": "Rutina extendida de terapia de pecho",
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
                    chest: "Chest",
                    "upper-body": "Upper Body",
                    "lower-body": "Lower Body"
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
                    },
                    cactusarms: {
                        name: "Cactus Arms",
                        description: "Sit tall, bring your arms up to shoulder height, bend your elbows to 90 degrees, and press your arms back against your chair."
                    },
                    divers: {
                        name: "Divers",
                        description: "Sit tall, reach your arms forward and up, then dive them down between your legs, rounding your spine."
                    },
                    seatedbacktwist: {
                        name: "Seated Back Twist",
                        description: "Sit tall and gently twist your torso to the right, placing your left hand on your right knee. Hold and repeat on other side."
                    },
                    shoulderbladesqueeze: {
                        name: "Shoulder Blade Squeeze",
                        description: "Squeeze your shoulder blades together, hold for 5 seconds, then release. Keep your shoulders relaxed."
                    },
                    chintucks: {
                        name: "Chin Tucks",
                        description: "Gently pull your chin back, creating a double chin. Hold for 5 seconds, then release. Repeat slowly."
                    },
                    // Additional critical exercises
                    finalrelaxation: {
                        name: "Final Relaxation",
                        description: "Sit comfortably with your feet flat on the floor, close your eyes, and feel your feet and ankles relax."
                    },
                    sunsalutation: {
                        name: "Sun Salutation",
                        description: "Stand tall, reach your arms up, then fold forward, step back into a plank, and return to standing."
                    },
                    fullbodystretch: {
                        name: "Full Body Stretch",
                        description: "Stand with feet apart, reach your arms up and over your head, then gently lean to each side."
                    },
                    childspose: {
                        name: "Child's Pose",
                        description: "Kneel and sit back on your heels, then reach your arms forward and lower your chest toward the floor."
                    },
                    downwarddog: {
                        name: "Downward Dog",
                        description: "From hands and knees, tuck your toes and lift your hips up and back, straightening your legs as much as comfortable."
                    },
                    warriori: {
                        name: "Warrior I",
                        description: "Step one foot forward into a lunge, raise your arms overhead, and hold the position."
                    },
                    trianglepose: {
                        name: "Triangle Pose",
                        description: "Stand with feet wide apart, reach one hand down to your shin and the other up to the sky."
                    },
                    butterflystretch: {
                        name: "Butterfly Stretch",
                        description: "Sit with the soles of your feet together, gently press your knees down toward the floor."
                    },
                    supinetwist: {
                        name: "Supine Twist",
                        description: "Lie on your back, bring your knees to one side, keeping your shoulders on the floor. Hold and repeat on other side."
                    },
                    happybaby: {
                        name: "Happy Baby",
                        description: "Lie on your back, grab the outsides of your feet, and gently rock from side to side."
                    },
                    ragdoll: {
                        name: "Rag Doll",
                        description: "Stand with feet hip-width apart, slowly bend forward from your hips, letting your arms hang down like a rag doll."
                    },
                    kneestochest: {
                        name: "Knees to Chest",
                        description: "Lie on your back, bring both knees to your chest, and gently rock from side to side."
                    },
                    legsupthewall: {
                        name: "Legs Up the Wall",
                        description: "Sit close to a wall, swing your legs up the wall, and lie back with your arms at your sides."
                    },
                    corpsepose: {
                        name: "Corpse Pose",
                        description: "Lie on your back with arms at your sides, close your eyes, and focus on your breathing."
                    },
                    // New exercises for missing folders
                    anklecircles: {
                        name: "Ankle Circles",
                        description: "Sit or stand, rotate ankles in circles both directions"
                    },
                    toeraises: {
                        name: "Toe Raises",
                        description: "Stand and lift toes up, then lower them down"
                    },
                    heelraises: {
                        name: "Heel Raises",
                        description: "Stand and lift heels up, then lower them down"
                    },
                    anklealphabet: {
                        name: "Ankle Alphabet",
                        description: "Trace alphabet with your big toe in the air"
                    },
                    toespreading: {
                        name: "Toe Spreading",
                        description: "Sit and spread toes apart, then bring them together"
                    },
                    singlelegbalance: {
                        name: "Single Leg Balance",
                        description: "Stand on one foot, maintain balance"
                    },
                    archstrengthening: {
                        name: "Arch Strengthening",
                        description: "Sit and lift arch of foot while keeping toes down"
                    },
                    plantarfasciastretch: {
                        name: "Plantar Fascia Stretch",
                        description: "Sit and pull toes back to stretch bottom of foot"
                    },
                    towelscrunches: {
                        name: "Towel Scrunches",
                        description: "Sit and use toes to scrunch up a towel"
                    },
                    marblepickup: {
                        name: "Marble Pickup",
                        description: "Use toes to pick up marbles and place in container"
                    },
                    ankleeversioninversion: {
                        name: "Ankle Eversion/Inversion",
                        description: "Turn foot inward and outward to strengthen ankle"
                    },
                    plank: {
                        name: "Plank",
                        description: "Hold plank position, keeping body straight"
                    },
                    deadbug: {
                        name: "Dead Bug",
                        description: "Lie on back, extend opposite arm and leg"
                    },
                    birddog: {
                        name: "Bird Dog",
                        description: "On hands and knees, extend opposite arm and leg"
                    },
                    sideplank: {
                        name: "Side Plank",
                        description: "Hold side plank position"
                    },
                    russiantwists: {
                        name: "Russian Twists",
                        description: "Sit and rotate torso side to side"
                    },
                    mountainclimbers: {
                        name: "Mountain Climbers",
                        description: "In plank, alternate bringing knees to chest"
                    },
                    bicyclecrunches: {
                        name: "Bicycle Crunches",
                        description: "Lie on back, bring opposite elbow to knee"
                    },
                    hollowbodyhold: {
                        name: "Hollow Body Hold",
                        description: "Lie on back, lift shoulders and legs off ground"
                    },
                    superman: {
                        name: "Superman",
                        description: "Lie on stomach, lift chest and legs simultaneously"
                    },
                    pallofpress: {
                        name: "Pallof Press",
                        description: "Stand with resistance, press arms out and pull back"
                    },
                    pushups: {
                        name: "Push-ups",
                        description: "Perform push-ups with proper form"
                    },
                    tricepdips: {
                        name: "Tricep Dips",
                        description: "Sit on edge of chair, lower and raise body"
                    },
                    pikepushups: {
                        name: "Pike Push-ups",
                        description: "Handstand position against wall, lower head to ground"
                    },
                    pullupschinups: {
                        name: "Pull-ups/Chin-ups",
                        description: "Hang from bar, pull body up"
                    },
                    lateralraises: {
                        name: "Lateral Raises",
                        description: "Hold weights, raise arms to sides"
                    },
                    bentoverrows: {
                        name: "Bent-Over Rows",
                        description: "Hinge at hips, pull weights to chest"
                    },
                    overheadpress: {
                        name: "Overhead Press",
                        description: "Press weights overhead from shoulders"
                    },
                    bicepcurls: {
                        name: "Bicep Curls",
                        description: "Curl weights up to shoulders"
                    },
                    squats: {
                        name: "Squats",
                        description: "Stand with feet shoulder-width apart, lower down and up"
                    },
                    lunges: {
                        name: "Lunges",
                        description: "Step forward into lunge position, alternate legs"
                    },
                    glutebridges: {
                        name: "Glute Bridges",
                        description: "Lie on back, lift hips up and down"
                    },
                    legswings: {
                        name: "Leg Swings",
                        description: "Hold wall, swing leg forward and back"
                    },
                    singlelegdeadlifts: {
                        name: "Single Leg Deadlifts",
                        description: "Stand on one leg, hinge forward while extending other leg back"
                    },
                    wallsits: {
                        name: "Wall Sits",
                        description: "Sit against wall with knees at 90 degrees"
                    },
                    stepups: {
                        name: "Step-ups",
                        description: "Step up onto platform, alternate legs"
                    },
                    hipthrusts: {
                        name: "Hip Thrusts",
                        description: "Lie on back, lift hips up with shoulders on ground"
                    },
                    bulgariansplitsquats: {
                        name: "Bulgarian Split Squats",
                        description: "Back foot on elevated surface, lunge down and up"
                    },
                    romaniandeadlifts: {
                        name: "Romanian Deadlifts",
                        description: "Stand with slight knee bend, hinge at hips"
                    },
                    jumpsquats: {
                        name: "Jump Squats",
                        description: "Squat down and jump up explosively"
                    },
                    seatedneckrolls: {
                        name: "Seated Neck Rolls",
                        description: "Sit tall, slowly roll head in circles"
                    },
                    seatedshouldershrugs: {
                        name: "Seated Shoulder Shrugs",
                        description: "Lift shoulders up toward ears, hold and relax"
                    },
                    seatedspinaltwist: {
                        name: "Seated Spinal Twist",
                        description: "Sit tall, rotate torso to one side, hold"
                    },
                    seatedhipcircles: {
                        name: "Seated Hip Circles",
                        description: "Sit and make circles with your knees"
                    },
                    seatedanklecircles: {
                        name: "Seated Ankle Circles",
                        description: "Rotate ankles in circles both directions"
                    },
                    seatedcalfraises: {
                        name: "Seated Calf Raises",
                        description: "Lift heels up and down while seated"
                    },
                    seatedlegextensions: {
                        name: "Seated Leg Extensions",
                        description: "Sit tall, extend one leg out and hold"
                    },
                    seatedarmcircles: {
                        name: "Seated Arm Circles",
                        description: "Make circles with your arms while seated"
                    },
                    seatedforwardfold: {
                        name: "Seated Forward Fold",
                        description: "Sit tall, hinge forward at hips"
                    },
                    seatedsidestretch: {
                        name: "Seated Side Stretch",
                        description: "Sit tall, reach one arm overhead and lean to side"
                    },
                    seatedkneetochest: {
                        name: "Seated Knee to Chest",
                        description: "Sit tall, pull one knee to chest"
                    },
                    seateddeepbreathing: {
                        name: "Seated Deep Breathing",
                        description: "Sit tall, take 5 deep breaths"
                    },
                    wallangels: {
                        name: "Wall Angels",
                        description: "Stand against wall, slide arms up and down"
                    },
                    chintucks: {
                        name: "Chin Tucks",
                        description: "Gently pull head back, creating double chin"
                    },
                    shoulderbladesqueezes: {
                        name: "Shoulder Blade Squeezes",
                        description: "Squeeze shoulder blades together and release"
                    },
                    chestopener: {
                        name: "Chest Opener",
                        description: "Clasp hands behind back, lift arms up"
                    },
                    hipflexorstretch: {
                        name: "Hip Flexor Stretch",
                        description: "Step forward into lunge, feel stretch in front hip"
                    },
                    posturecheck: {
                        name: "Posture Check",
                        description: "Stand tall, align ears over shoulders over hips"
                    },
                    catcowstretch: {
                        name: "Cat-Cow Stretch",
                        description: "On hands and knees, arch and round back"
                    },
                    thoracicextension: {
                        name: "Thoracic Extension",
                        description: "Place hands behind head, extend upper back"
                    },
                    postureawareness: {
                        name: "Posture Awareness",
                        description: "Stand tall, focus on maintaining good posture"
                    },
                    doorwaycheststretch: {
                        name: "Doorway Chest Stretch",
                        description: "Place forearm against doorway, lean forward"
                    },
                    wallcheststretch: {
                        name: "Wall Chest Stretch",
                        description: "Place hand on wall, turn body away"
                    },
                    chestexpansion: {
                        name: "Chest Expansion",
                        description: "Interlace fingers behind back, lift arms up"
                    },
                    pecstretch: {
                        name: "Pec Stretch",
                        description: "Lie on side, extend top arm back"
                    },
                    chestflystretch: {
                        name: "Chest Fly Stretch",
                        description: "Lie on back, extend arms to sides"
                    },
                    reversefly: {
                        name: "Reverse Fly",
                        description: "Tend forward, lift arms out to sides"
                    },
                    chestmassage: {
                        name: "Chest Massage",
                        description: "Use tennis ball to massage chest muscles"
                    },
                    chestbreathing: {
                        name: "Chest Breathing",
                        description: "Place hands on chest, breathe deeply"
                    },
                    chestcompression: {
                        name: "Chest Compression",
                        description: "Hug yourself, apply gentle pressure"
                    },
                    chestmobility: {
                        name: "Chest Mobility",
                        description: "Make circles with arms, focus on chest movement"
                    },
                    standinghamstringstretch: {
                        name: "Standing Hamstring Stretch",
                        description: "Stand with one foot forward, hinge at hips to stretch back leg"
                    },
                    seatedhamstringstretch: {
                        name: "Seated Hamstring Stretch",
                        description: "Sit with legs extended, reach forward to stretch hamstrings"
                    },
                    wallhamstringstretch: {
                        name: "Wall Hamstring Stretch",
                        description: "Lie on back, place leg against wall, straighten knee"
                    },
                    dynamiclegswings: {
                        name: "Dynamic Leg Swings",
                        description: "Hold wall, swing leg forward and back gently"
                    },
                    pigeonposehamstring: {
                        name: "Pigeon Pose Hamstring",
                        description: "From pigeon pose, extend back leg and flex foot"
                    },
                    supinehamstringstretch: {
                        name: "Supine Hamstring Stretch",
                        description: "Lie on back, use strap or towel to pull leg toward chest"
                    },
                    hamstringcurls: {
                        name: "Hamstring Curls",
                        description: "Lie on stomach, bend knees to bring heels toward glutes"
                    },
                    glutehamraises: {
                        name: "Glute-Ham Raises",
                        description: "Kneel and slowly lower chest toward ground, then return up"
                    },
                    neckretraction: {
                        name: "Neck Retraction",
                        description: "Gently pull head back, creating double chin"
                    },
                    eartoshoulder: {
                        name: "Ear to Shoulder",
                        description: "Gently tilt head toward shoulder, hold"
                    },
                    neckrotation: {
                        name: "Neck Rotation",
                        description: "Slowly turn head to look over shoulder"
                    },
                    uppertrapstretch: {
                        name: "Upper Trap Stretch",
                        description: "Place hand behind back, tilt head, gently pull with other hand"
                    },
                    levatorscapulaestretch: {
                        name: "Levator Scapulae Stretch",
                        description: "Turn head 45 degrees, look down, gently pull head forward and down"
                    },
                    suboccipitalrelease: {
                        name: "Suboccipital Release",
                        description: "Place fingers at base of skull, gently massage and hold pressure"
                    },
                    neckisometrics: {
                        name: "Neck Isometrics",
                        description: "Place hand on forehead, gently push while resisting with neck muscles"
                    },
                    sideneckisometrics: {
                        name: "Side Neck Isometrics",
                        description: "Place hand on side of head, gently push while resisting with neck muscles"
                    }
                },
                accessibility: {
                    toggleDarkMode: "Toggle dark mode",
                    languageSelector: "Select language",
                    startPauseTimer: "Start or pause exercise timer",
                    nextExercise: "Next exercise",
                    previousExercise: "Previous exercise",
                    backToRoutines: "Go back to routine selection",
                    shareApp: "Share Tend app"
                },
                share: {
                    shareWithFriend: "Share with a friend"
                },
                editorial: {
                    createdBy: "Created by",
                    inYear: "in 2025",
                    shareMessage: "Please share with family, friends and colleagues",
                    businessInquiries: "For business inquiries:"
                }
            },
            de: {
                app: {
                    title: "Tend",
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
                    routineCompleteMessage: "Sie haben die {{routineName}} Routine abgeschlossen!",
                    startNewRoutine: "Neue Routine starten",
                    minutes: "Minuten",
                    exercises: "Übungen",
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
                    backSafeHips: "Rückenschonende Hüftkräftigung",
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
                    neckShoulders10min: "Nacken & Schultern - 10 Min",
                    "neck-4min": "Nacken - 4 Min",
                    "neck-8min": "Nacken - 8 Min",
                    "neck-12min": "Nacken - 12 Min",
                    "hips-5min": "Hüften - 5 Min",
                    "hips-10min": "Hüften - 10 Min",
                    "hips-15min": "Hüften - 15 Min",
                    "hips-20min": "Hüften - 20 Min",
                    "shoulders-4min": "Schultern - 4 Min",
                    "shoulders-8min": "Schultern - 8 Min",
                    "shoulders-12min": "Schultern - 12 Min",
                    "shoulders-16min": "Schultern - 16 Min",
                    "lower-back-5min": "Unterer Rücken - 5 Min",
                    "lower-back-10min": "Unterer Rücken - 10 Min",
                    "lower-back-15min": "Unterer Rücken - 15 Min",
                    "lower-back-20min": "Unterer Rücken - 20 Min",
                    "hamstrings-5min": "Oberschenkelrückseite - 5 Min",
                    "hamstrings-10min": "Oberschenkelrückseite - 10 Min",
                    "hamstrings-15min": "Oberschenkelrückseite - 15 Min",
                    "feet-ankles-4min": "Füße & Knöchel - 4 Min",
                    "feet-ankles-8min": "Füße & Knöchel - 8 Min",
                    "feet-ankles-12min": "Füße & Knöchel - 12 Min",
                    "core-5min": "Rumpf - 5 Min",
                    "core-10min": "Rumpf - 10 Min",
                    "core-15min": "Rumpf - 15 Min",
                    "upper-body-4min": "Oberkörper - 4 Min",
                    "upper-body-8min": "Oberkörper - 8 Min",
                    "upper-body-12min": "Oberkörper - 12 Min",
                    "lower-body-5min": "Unterkörper - 5 Min",
                    "lower-body-10min": "Unterkörper - 10 Min",
                    "lower-body-15min": "Unterkörper - 15 Min",
                    "seated-4min": "Sitzend - 4 Min",
                    "seated-8min": "Sitzend - 8 Min",
                    "seated-12min": "Sitzend - 12 Min",
                    "posture-4min": "Haltung - 4 Min",
                    "posture-8min": "Haltung - 8 Min",
                    "posture-12min": "Haltung - 12 Min",
                    "chest-4min": "Brust - 4 Min",
                    "chest-8min": "Brust - 8 Min",
                    "chest-12min": "Brust - 12 Min",
                    "shoulders-4min": "Hombros - 4 min",
                    "shoulders-8min": "Hombros - 8 min",
                    "shoulders-12min": "Hombros - 12 min",
                    "shoulders-16min": "Hombros - 16 min",
                    "lower-back-5min": "Espalda Baja - 5 min",
                    "lower-back-10min": "Espalda Baja - 10 min",
                    "lower-back-15min": "Espalda Baja - 15 min",
                    "lower-back-20min": "Espalda Baja - 20 min",
                    "hamstrings-5min": "Isquiotibiales - 5 min",
                    "hamstrings-10min": "Isquiotibiales - 10 min",
                    "hamstrings-15min": "Isquiotibiales - 15 min",
                    "feet-ankles-4min": "Pies y Tobillos - 4 min",
                    "feet-ankles-8min": "Pies y Tobillos - 8 min",
                    "feet-ankles-12min": "Pies y Tobillos - 12 min",
                    "core-5min": "Core - 5 min",
                    "core-10min": "Core - 10 min",
                    "core-15min": "Core - 15 min",
                    "upper-body-4min": "Tren Superior - 4 min",
                    "upper-body-8min": "Tren Superior - 8 min",
                    "upper-body-12min": "Tren Superior - 12 min",
                    "lower-body-5min": "Tren Inferior - 5 min",
                    "lower-body-10min": "Tren Inferior - 10 min",
                    "lower-body-15min": "Tren Inferior - 15 min",
                    "seated-4min": "Sentado - 4 min",
                    "seated-8min": "Sentado - 8 min",
                    "seated-12min": "Sentado - 12 min",
                    "posture-4min": "Postura - 4 min",
                    "posture-8min": "Postura - 8 min",
                    "posture-12min": "Postura - 12 min",
                    "chest-4min": "Pecho - 4 min",
                    "chest-8min": "Pecho - 8 min",
                    "chest-12min": "Pecho - 12 min",
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
                    backSafeHips: "Sanfte Hüft- und Kernkräftigung für Menschen mit Rückenproblemen",
                    isometric: "Kraft durch statische Halteübungen",
                    neck: "Nackenspannung und Steifheit lindern",
                    shoulders: "Schulterspannung lösen",
                    feet: "Fußflexibilität und Gesundheit",
                    ankle: "Knöchelmobilität und Flexibilität",
                    knees: "Kniemobilität und Gelenkgesundheit",
                    hands: "Hand- und Fingerfertigkeit",
                    fingers: "Einzelne Fingerflexibilität",
                    wrists: "Handgelenkmobilität und Flexibilität",
                    "neck-4min": "Schnelle Nackenspannungsentlastung",
                    "neck-8min": "Umfassende Nackenmobilitätsroutine",
                    "neck-12min": "Erweiterte Nackentherapieroutine",
                    "hips-5min": "Schnelle Hüftmobilitätsroutine",
                    "hips-10min": "Umfassende Hüftflexibilitätsroutine",
                    "hips-15min": "Erweiterte Hüftmobilitäts- und Kraftroutine",
                    "hips-20min": "Vollständige Hüftmobilitäts-, Flexibilitäts- und Kraftroutine",
                    feetAnkles: "Fuß- und Knöchelmobilitätsroutine",
                    "shoulders-4min": "Schnelle Schultermobilitätsroutine",
                    "shoulders-8min": "Umfassende Schulterflexibilitätsroutine",
                    "shoulders-12min": "Erweiterte Schultermobilitäts- und Kraftroutine",
                    "shoulders-16min": "Vollständige Schultertherapie- und Mobilitätsroutine",
                    "lower-back-5min": "Schnelle untere Rückenentlastungsroutine",
                    "lower-back-10min": "Umfassende untere Rückenmobilitätsroutine",
                    "lower-back-15min": "Erweiterte untere Rückentherapieroutine",
                    "lower-back-20min": "Vollständige untere Rückenrehabilitationsroutine",
                    "hamstrings-5min": "Schnelle Oberschenkelrückseiten-Flexibilitätsroutine",
                    "hamstrings-10min": "Umfassende Oberschenkelrückseiten-Flexibilitätsroutine",
                    "hamstrings-15min": "Erweiterte Oberschenkelrückseiten-Mobilitäts- und Kraftroutine",
                    "feet-ankles-4min": "Schnelle Fuß- und Knöchelmobilitätsroutine",
                    "feet-ankles-8min": "Umfassende Fuß- und Knöchelflexibilitätsroutine",
                    "feet-ankles-12min": "Erweiterte Fuß- und Knöchelmobilitätsroutine",
                    "core-5min": "Schnelle Rumpfkräftigungsroutine",
                    "core-10min": "Umfassende Rumpfstabilitätsroutine",
                    "core-15min": "Erweiterte Rumpfkraft- und Stabilitätsroutine",
                    "upper-body-4min": "Schnelle Oberkörper-Mobilitätsroutine",
                    "upper-body-8min": "Umfassende Oberkörper-Flexibilitätsroutine",
                    "upper-body-12min": "Erweiterte Oberkörper-Kraft- und Mobilitätsroutine",
                    "lower-body-5min": "Schnelle Unterkörper-Mobilitätsroutine",
                    "lower-body-10min": "Umfassende Unterkörper-Flexibilitätsroutine",
                    "lower-body-15min": "Erweiterte Unterkörper-Kraft- und Mobilitätsroutine",
                    "seated-4min": "Schnelle sitzende Mobilitätsroutine",
                    "seated-8min": "Umfassende sitzende Flexibilitätsroutine",
                    "seated-12min": "Erweiterte sitzende Therapieroutine",
                    "posture-4min": "Schnelle Haltungskorrekturroutine",
                    "posture-8min": "Umfassende Haltungsverbesserungsroutine",
                    "posture-12min": "Erweiterte Haltungstherapieroutine",
                    "chest-4min": "Schnelle Brustöffnungsroutine",
                    "chest-8min": "Umfassende Brustflexibilitätsroutine",
                    "chest-12min": "Erweiterte Brusttherapieroutine",
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
                    chest: "Brust",
                    "upper-body": "Oberkörper",
                    "lower-body": "Unterkörper"
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
                    },
                    cactusarms: {
                        name: "Kaktusarme",
                        description: "Sitzen Sie aufrecht, bringen Sie Ihre Arme auf Schulterhöhe, beugen Sie die Ellbogen um 90 Grad und drücken Sie Ihre Arme gegen den Stuhl zurück."
                    },
                    divers: {
                        name: "Taucher",
                        description: "Sitzen Sie aufrecht, strecken Sie Ihre Arme nach vorne und oben, dann tauchen Sie sie zwischen Ihre Beine, wobei Sie Ihre Wirbelsäule runden."
                    },
                    seatedbacktwist: {
                        name: "Sitzende Rückendrehung",
                        description: "Sitzen Sie aufrecht und drehen Sie Ihren Oberkörper sanft nach rechts, legen Sie Ihre linke Hand auf Ihr rechtes Knie. Halten Sie und wiederholen Sie auf der anderen Seite."
                    },
                    shoulderbladesqueeze: {
                        name: "Schulterblatt-Zusammenziehen",
                        description: "Drücken Sie Ihre Schulterblätter zusammen, halten Sie 5 Sekunden, dann lassen Sie los. Halten Sie Ihre Schultern entspannt."
                    },
                    chintucks: {
                        name: "Kinn-Einziehen",
                        description: "Ziehen Sie Ihr Kinn sanft zurück, wodurch ein Doppelkinn entsteht. Halten Sie 5 Sekunden, dann lassen Sie los. Wiederholen Sie langsam."
                    },
                    // Additional critical exercises
                    finalrelaxation: {
                        name: "Endentspannung",
                        description: "Sitzen Sie bequem mit flachen Füßen auf dem Boden, schließen Sie die Augen und spüren Sie, wie sich Ihre Füße und Knöchel entspannen."
                    },
                    sunsalutation: {
                        name: "Sonnengruß",
                        description: "Stehen Sie aufrecht, strecken Sie die Arme nach oben, beugen Sie sich dann nach vorne, treten Sie zurück in eine Planke und kehren Sie zum Stehen zurück."
                    },
                    fullbodystretch: {
                        name: "Ganzkörperdehnung",
                        description: "Stehen Sie mit auseinander stehenden Füßen, strecken Sie die Arme nach oben und über den Kopf, dann lehnen Sie sich sanft zu jeder Seite."
                    },
                    childspose: {
                        name: "Kindhaltung",
                        description: "Knien Sie und setzen Sie sich auf die Fersen, dann strecken Sie die Arme nach vorne und senken Sie die Brust zum Boden."
                    },
                    downwarddog: {
                        name: "Herabschauender Hund",
                        description: "Von Händen und Knien aus, ziehen Sie die Zehen ein und heben Sie die Hüften nach oben und hinten, strecken Sie die Beine so weit wie bequem."
                    },
                    warriori: {
                        name: "Krieger I",
                        description: "Treten Sie mit einem Fuß nach vorne in einen Ausfallschritt, heben Sie die Arme über den Kopf und halten Sie die Position."
                    },
                    trianglepose: {
                        name: "Dreieckshaltung",
                        description: "Stehen Sie mit weit auseinander stehenden Füßen, erreichen Sie mit einer Hand Ihr Schienbein und mit der anderen den Himmel."
                    },
                    butterflystretch: {
                        name: "Schmetterlingsdehnung",
                        description: "Sitzen Sie mit den Fußsohlen zusammen, drücken Sie sanft die Knie zum Boden."
                    },
                    supinetwist: {
                        name: "Rückenlage-Drehung",
                        description: "Legen Sie sich auf den Rücken, bringen Sie die Knie zu einer Seite, halten Sie die Schultern auf dem Boden. Halten Sie und wiederholen Sie auf der anderen Seite."
                    },
                    happybaby: {
                        name: "Glückliches Baby",
                        description: "Legen Sie sich auf den Rücken, greifen Sie die Außenseiten Ihrer Füße und schaukeln Sie sanft von Seite zu Seite."
                    },
                    ragdoll: {
                        name: "Stoffpuppe",
                        description: "Stehen Sie mit hüftbreit auseinander stehenden Füßen, beugen Sie sich langsam von den Hüften nach vorne und lassen Sie die Arme wie eine Stoffpuppe hängen."
                    },
                    kneestochest: {
                        name: "Knie zur Brust",
                        description: "Legen Sie sich auf den Rücken, bringen Sie beide Knie zur Brust und schaukeln Sie sanft von Seite zu Seite."
                    },
                    legsupthewall: {
                        name: "Beine an der Wand",
                        description: "Setzen Sie sich nahe an eine Wand, schwingen Sie die Beine an die Wand und legen Sie sich mit den Armen an den Seiten zurück."
                    },
                    corpsepose: {
                        name: "Leichenhaltung",
                        description: "Legen Sie sich auf den Rücken mit Armen an den Seiten, schließen Sie die Augen und konzentrieren Sie sich auf das Atmen."
                    },
                    // Hip & Leg Exercises - Batch 1
                    squatstretch: {
                        name: "Kniebeugen-Dehnung",
                        description: "Stehen Sie mit den Füßen breiter als hüftbreit, gehen Sie in eine tiefe Kniebeuge und halten Sie die Position."
                    },
                    reverselunge: {
                        name: "Rückwärts-Ausfallschritt",
                        description: "Treten Sie mit einem Fuß nach hinten in einen Ausfallschritt, halten Sie Ihr vorderes Knie über dem Knöchel und halten Sie die Position."
                    },
                    toesquats: {
                        name: "Zehen-Kniebeugen",
                        description: "Knien Sie auf dem Boden, setzen Sie sich auf Ihre Fersen und halten Sie die Position, um Ihre Zehen und Füße zu dehnen."
                    },
                    hipcircles: {
                        name: "Hüftkreise",
                        description: "Stehen Sie mit den Händen an den Hüften und machen Sie langsame Kreise mit Ihren Hüften."
                    },
                    seatedhipstretch: {
                        name: "Sitzende Hüftdehnung",
                        description: "Setzen Sie sich mit einem ausgestreckten Bein und ziehen Sie das andere Knie zur Brust."
                    },
                    supinehipstretch: {
                        name: "Rückenlage-Hüftdehnung",
                        description: "Legen Sie sich hin, ziehen Sie das Knie zur Brust und dann über den Körper."
                    },
                    singlelegforwardfold: {
                        name: "Einbeinige Vorwärtsbeuge",
                        description: "Stehen Sie auf einem Bein, strecken Sie das andere Bein nach vorne und greifen Sie nach Ihrem ausgestreckten Fuß."
                    },
                    isometricsquat: {
                        name: "Isometrische Kniebeuge",
                        description: "Stehen Sie mit schulterbreit auseinander stehenden Füßen, gehen Sie in eine Kniebeuge und halten Sie die Position ohne sich zu bewegen."
                    },
                    singlelegstand: {
                        name: "Einbeinstand",
                        description: "Stehen Sie auf einem Bein, heben Sie das andere Bein leicht vom Boden ab und halten Sie die Position für das Gleichgewicht."
                    },
                    isometriclunge: {
                        name: "Isometrischer Ausfallschritt",
                        description: "Gehen Sie in eine Ausfallschritt-Position und halten Sie ohne sich zu bewegen, wobei Sie Ihr vorderes Knie über dem Knöchel halten."
                    },
                    isometriccalfraise: {
                        name: "Isometrische Wadenhebung",
                        description: "Stehen Sie auf Ihren Zehenspitzen und halten Sie die Position ohne sich zu bewegen, wobei Sie Ihre Wadenmuskeln anspannen."
                    },
                    calfstretch: {
                        name: "Wadendehnung",
                        description: "Stehen Sie mit dem Gesicht zur Wand, stellen Sie einen Fuß nach vorne und lehnen Sie sich gegen die Wand, um Ihre Wade zu dehnen."
                    },
                    quadstretch: {
                        name: "Quadrizeps-Dehnung",
                        description: "Stehen Sie auf einem Bein, beugen Sie das andere Knie und ziehen Sie Ihre Ferse zu Ihren Gesäßmuskeln."
                    },
                    hamstringstretch: {
                        name: "Hamstring-Dehnung",
                        description: "Setzen Sie sich mit einem ausgestreckten Bein und greifen Sie nach vorne zu Ihren Zehen, während Sie Ihren Rücken gerade halten."
                    },
                    standingquadstretch: {
                        name: "Stehende Quadrizeps-Dehnung",
                        description: "Stehen Sie auf einem Bein, beugen Sie das andere Knie und ziehen Sie Ihre Ferse zu Ihren Gesäßmuskeln, während Sie stehen."
                    },
                    hipcirclesseated: {
                        name: "Sitzende Hüftkreise",
                        description: "Setzen Sie sich und machen Sie Kreise mit Ihren Knien."
                    },
                    hipabduction: {
                        name: "Hüftabduktion",
                        description: "Stehen Sie und heben Sie ein Bein zur Seite, halten Sie es gerade."
                    },
                    hipadduction: {
                        name: "Hüftadduktion",
                        description: "Stehen Sie und kreuzen Sie ein Bein vor dem anderen, dann heben Sie es an."
                    },
                    hipbridge: {
                        name: "Hüftbrücke",
                        description: "Legen Sie sich auf den Rücken, beugen Sie Ihre Knie und heben Sie Ihre Hüften vom Boden ab."
                    },
                    hipflexorstrengthening: {
                        name: "Hüftbeuger-Kräftigung",
                        description: "Stehen Sie und heben Sie ein Knie zur Brust, dann senken Sie es langsam ab."
                    },
                    clamshells: {
                        name: "Muschelöffnung",
                        description: "Legen Sie sich auf die Seite, Knie gebeugt. Füße zusammen halten und das obere Knie öffnen."
                    },
                    singlelegglutbridge: {
                        name: "Einbeinige Gesäßbrücke",
                        description: "Gesäßbrücke mit einem Bein ausgestreckt. Stärkt Gesäßmuskeln ohne Wirbelsäulenbelastung."
                    },
                    supinemarching: {
                        name: "Marschieren in Rückenlage",
                        description: "Auf dem Rücken liegend, abwechselnd die Knie zur Brust heben. Baut Kernstabilität auf."
                    },
                    hipflexoractivation: {
                        name: "Hüftbeuger-Aktivierung",
                        description: "Isometrische Kräftigung: Fuß in den Boden drücken während Sie versuchen, das Knie zu heben."
                    },
                    singlelegdeadlift: {
                        name: "Einbeiniges Kreuzheben",
                        description: "Stehen Sie auf einem Bein, beugen Sie sich an den Hüften nach vorne, während Sie das andere Bein nach hinten strecken."
                    },
                    // Core & Back Exercises - Batch 2
                    gentletwist: {
                        name: "Sanfte Drehung",
                        description: "Stehen Sie mit hüftbreit auseinander stehenden Füßen, legen Sie Ihre Hände an die Hüften und drehen Sie sich sanft von Seite zu Seite."
                    },
                    plankhold: {
                        name: "Planke Halten",
                        description: "Halten Sie eine Planke-Position und halten Sie Ihren Körper gerade von Kopf bis Ferse."
                    },
                    glutebridgehold: {
                        name: "Gesäßbrücke Halten",
                        description: "Legen Sie sich auf den Rücken, heben Sie Ihre Hüften an und halten Sie die Position."
                    },
                    backwardneckstretch: {
                        name: "Rückwärts-Nackendehnung",
                        description: "Neigen Sie Ihren Kopf sanft nach hinten und spüren Sie eine Dehnung an der Vorderseite Ihres Nackens."
                    },
                    behindbackshoulderstretch: {
                        name: "Hinter-Rücken-Schulterdehnung",
                        description: "Greifen Sie mit einem Arm hinter Ihren Rücken und ziehen Sie ihn sanft mit der anderen Hand."
                    },
                    lowerbackstretch: {
                        name: "Unterer-Rücken-Dehnung",
                        description: "Legen Sie sich auf den Rücken, bringen Sie Ihre Knie zur Brust und wiegen Sie sich sanft von Seite zu Seite."
                    },
                    glutebridge: {
                        name: "Gesäßbrücke",
                        description: "Legen Sie sich auf den Rücken, beugen Sie Ihre Knie und heben Sie Ihre Hüften auf und ab."
                    },
                    lowerbackstrengthening: {
                        name: "Unterer-Rücken-Kräftigung",
                        description: "Legen Sie sich auf den Bauch und heben Sie Ihre Brust und Beine vom Boden ab."
                    },
                    // Arm & Shoulder Exercises - Batch 2
                    kneetochest: {
                        name: "Knie zur Brust",
                        description: "Legen Sie sich auf den Rücken, bringen Sie ein Knie zur Brust und halten Sie die Position."
                    },
                    isometricpushup: {
                        name: "Isometrischer Liegestütz",
                        description: "Halten Sie eine Liegestütz-Position ohne sich zu bewegen und halten Sie Ihren Körper gerade."
                    },
                    crossbodyshoulderstretch: {
                        name: "Kreuzkörper-Schulterdehnung",
                        description: "Bringen Sie einen Arm über Ihren Körper und ziehen Sie ihn sanft mit der anderen Hand."
                    },
                    overheadshoulderstretch: {
                        name: "Überkopf-Schulterdehnung",
                        description: "Greifen Sie mit einem Arm über den Kopf und ziehen Sie ihn sanft mit der anderen Hand."
                    },
                    shoulderexternalrotation: {
                        name: "Schulter-Außenrotation",
                        description: "Halten Sie Ihren Ellbogen in einem 90-Grad-Winkel und drehen Sie Ihren Arm nach außen."
                    },
                    shoulderinternalrotation: {
                        name: "Schulter-Innenrotation",
                        description: "Halten Sie Ihren Ellbogen in einem 90-Grad-Winkel und drehen Sie Ihren Arm nach innen."
                    },
                    // Foot & Ankle Exercises
                    wheelpose: {
                        name: "Rad-Haltung",
                        description: "Legen Sie sich auf den Rücken, platzieren Sie Ihre Hände neben Ihren Ohren und heben Sie sich in eine Rückbeuge."
                    },
                    reclinedhandtobigtoe: {
                        name: "Rückenlage-Hand-zum-Großzeh",
                        description: "Legen Sie sich auf den Rücken und greifen Sie mit Ihrer Hand nach Ihrem großen Zeh."
                    },
                    toespreads: {
                        name: "Zehenspreizen",
                        description: "Setzen Sie sich und spreizen Sie Ihre Zehen auseinander, dann bringen Sie sie wieder zusammen."
                    },
                    toecurls: {
                        name: "Zehenkrallen",
                        description: "Setzen Sie sich und krallen Sie Ihre Zehen unter, dann strecken Sie sie wieder aus."
                    },
                    footmassage: {
                        name: "Fußmassage",
                        description: "Verwenden Sie Ihre Hände, um Ihre Füße zu massieren, wobei Sie sich auf die Gewölbe und Sohlen konzentrieren."
                    },
                    ankleflexion: {
                        name: "Knöchelbeugung",
                        description: "Zeigen Sie mit Ihren Zehen nach oben und unten und beugen Sie Ihren Knöchel."
                    },
                    ankleinversion: {
                        name: "Knöchel-Inversion",
                        description: "Drehen Sie Ihren Fuß nach innen und außen, um Ihren Knöchel zu dehnen."
                    },
                    heeltotoerocks: {
                        name: "Ferse-zu-Zehen-Wippen",
                        description: "Wippen Sie von Ihren Fersen zu Ihren Zehen, während Sie stehen."
                    },
                    lateralfootrocks: {
                        name: "Seitliche Fußwippen",
                        description: "Wippen Sie Ihre Füße von Seite zu Seite, während Sie stehen."
                    },
                    // Hand & Wrist Exercises
                    fingerspreads: {
                        name: "Fingerspreizen",
                        description: "Spreizen Sie Ihre Finger so weit wie möglich auseinander, dann bringen Sie sie wieder zusammen."
                    },
                    thumbcircles: {
                        name: "Daumenkreise",
                        description: "Machen Sie Kreise mit Ihrem Daumen in beide Richtungen."
                    },
                    fingerbends: {
                        name: "Fingerbeugen",
                        description: "Beugen Sie jeden Finger einzeln, dann strecken Sie sie wieder aus."
                    },
                    wristflexorstretch: {
                        name: "Handgelenk-Beuger-Dehnung",
                        description: "Strecken Sie Ihren Arm aus und ziehen Sie Ihre Hand zurück, um Ihre Handgelenk-Beuger zu dehnen."
                    },
                    handmassage: {
                        name: "Handmassage",
                        description: "Verwenden Sie Ihre andere Hand, um Ihre Handfläche, Finger und Handgelenk zu massieren."
                    },
                    individualfingerlifts: {
                        name: "Einzelne Fingerhebung",
                        description: "Heben Sie jeden Finger einzeln an, während Sie die anderen unten halten."
                    },
                    fingertaps: {
                        name: "Fingertippen",
                        description: "Tippen Sie jeden Finger in der Reihenfolge zu Ihrem Daumen."
                    },
                    fingerstretches: {
                        name: "Fingerdehnungen",
                        description: "Dehnen Sie jeden Finger, indem Sie ihn sanft mit Ihrer anderen Hand ziehen."
                    },
                    fingercircles: {
                        name: "Fingerkreise",
                        description: "Machen Sie Kreise mit jedem Finger in beide Richtungen."
                    },
                    pinkytothumb: {
                        name: "Kleinfinger-zum-Daumen",
                        description: "Berühren Sie Ihren kleinen Finger mit Ihrem Daumen, dann strecken Sie sie auseinander."
                    },
                    wristcircles: {
                        name: "Handgelenkkreise",
                        description: "Machen Sie Kreise mit Ihren Handgelenken in beide Richtungen."
                    },
                    wristflexion: {
                        name: "Handgelenkbeugung",
                        description: "Beugen Sie Ihr Handgelenk nach oben und unten, dann von Seite zu Seite."
                    },
                    wristsidetoside: {
                        name: "Handgelenk-Seit-zu-Seit",
                        description: "Bewegen Sie Ihr Handgelenk von Seite zu Seite."
                    },
                    wristextensorstretch: {
                        name: "Handgelenk-Strecker-Dehnung",
                        description: "Strecken Sie Ihren Arm aus und ziehen Sie Ihre Hand nach unten, um Ihre Handgelenk-Strecker zu dehnen."
                    },
                    // Advanced & Yoga Poses
                    pigeonpose: {
                        name: "Tauben-Haltung",
                        description: "Von Händen und Knien aus, bringen Sie ein Knie nach vorne und platzieren Sie es hinter Ihr Handgelenk, strecken Sie das andere Bein nach hinten."
                    },
                    lizardpose: {
                        name: "Echsen-Haltung",
                        description: "Niedriger Ausfallschritt mit Unterarmen auf dem Boden."
                    },
                    pyramidpose: {
                        name: "Pyramiden-Haltung",
                        description: "Stehen Sie mit weit auseinander stehenden Füßen, beugen Sie sich nach vorne und greifen Sie nach Ihrem vorderen Fuß."
                    },
                    // Isometric & Strength
                    wallsit: {
                        name: "Wandsitz",
                        description: "Setzen Sie sich gegen eine Wand mit Ihren Knien im 90-Grad-Winkel und halten Sie die Position."
                    },
                    deadbughold: {
                        name: "Toter-Käfer-Halten",
                        description: "Legen Sie sich auf den Rücken, heben Sie Ihre Arme und Beine an und halten Sie die Position."
                    },
                    // Specialized & Other
                    foldedbutterfly: {
                        name: "Gefalteter Schmetterling",
                        description: "Setzen Sie sich mit den Fußsohlen zusammen, beugen Sie sich von Ihren Hüften nach vorne und halten Sie die Position."
                    },
                    seatedstraddle: {
                        name: "Sitzende Spreizung",
                        description: "Setzen Sie sich mit weit auseinander stehenden Beinen, greifen Sie nach vorne zur Mitte, dann zu jeder Seite."
                    },
                    scorpionprep: {
                        name: "Skorpion-Vorbereitung",
                        description: "Legen Sie sich auf den Bauch, greifen Sie nach hinten und fassen Sie Ihre Füße, und heben Sie Ihre Brust und Beine vom Boden ab."
                    },
                    figurestretch: {
                        name: "Figure-4-Dehnung",
                        description: "Setzen Sie sich und platzieren Sie den Knöchel auf dem gegenüberliegenden Knie, beugen Sie sich nach vorne."
                    },
                    standingforwardfold: {
                        name: "Stehende Vorwärtsbeuge",
                        description: "Stehen Sie mit hüftbreit auseinander stehenden Füßen und beugen Sie sich von Ihren Hüften nach vorne."
                    },
                    standingsplit: {
                        name: "Stehende Spaltung",
                        description: "Stehen Sie auf einem Bein und heben Sie das andere Bein so hoch wie möglich hinter sich."
                    },
                    pelvictilts: {
                        name: "Beckenkippung",
                        description: "Legen Sie sich auf den Rücken und wiegen Sie Ihr Becken sanft auf und ab."
                    },
                    achillesstretch: {
                        name: "Achillessehnen-Dehnung",
                        description: "Stehen Sie mit dem Gesicht zur Wand, stellen Sie einen Fuß nach hinten und lehnen Sie sich nach vorne, um Ihre Achillessehne zu dehnen."
                    },
                    kneecircles: {
                        name: "Kniekreise",
                        description: "Setzen Sie sich und machen Sie Kreise mit Ihren Knien in beide Richtungen."
                    },
                    seatedkneeextensions: {
                        name: "Sitzende Kniestreckung",
                        description: "Setzen Sie sich und strecken Sie ein Bein gerade aus, dann beugen Sie es wieder zurück."
                    },
                    itbandstretch: {
                        name: "IT-Band-Dehnung",
                        description: "Stehen Sie und kreuzen Sie ein Bein hinter dem anderen, dann lehnen Sie sich zur Seite."
                    },
                    kneehugs: {
                        name: "Knieumarmung",
                        description: "Stehen Sie und umarmen Sie ein Knie zur Brust, dann wechseln Sie die Beine."
                    },
                    fisttoopen: {
                        name: "Faust-zu-Offen",
                        description: "Machen Sie eine Faust, dann öffnen Sie Ihre Hand weit und spreizen Sie Ihre Finger."
                    },
                    prayerstretch: {
                        name: "Gebets-Dehnung",
                        description: "Drücken Sie Ihre Handflächen vor Ihrer Brust zusammen und halten Sie."
                    },
                    spidercrawl: {
                        name: "Spinnenkrabbeln",
                        description: "Lassen Sie Ihre Finger wie eine krabbelnde Spinne auf und ab laufen."
                    },
                    reverseprayer: {
                        name: "Umgekehrtes Gebet",
                        description: "Drücken Sie Ihre Handflächen hinter Ihrem Rücken zusammen und halten Sie."
                    },
                    soleusstretch: {
                        name: "Soleus-Dehnung",
                        description: "Stehen Sie mit einem Fuß nach vorne, beugen Sie beide Knie, um Ihren Soleus-Muskel zu dehnen."
                    },
                    wallslides: {
                        name: "Wandrutschen",
                        description: "Stehen Sie gegen eine Wand und lassen Sie Ihre Arme auf und ab gleiten."
                    },
                    scapularwallslides: {
                        name: "Schulterblatt-Wandrutschen",
                        description: "Stehen Sie gegen eine Wand und lassen Sie Ihre Schulterblätter auf und ab gleiten."
                    },
                    romaniandeadlift: {
                        name: "Rumänisches Kreuzheben",
                        description: "Stehen Sie mit leicht gebeugten Knien, beugen Sie sich an den Hüften, während Sie Ihren Rücken gerade halten."
                    },
                    // Neck & Head Exercises
                    headstandprep: {
                        name: "Kopfstand-Vorbereitung",
                        description: "Üben Sie die Kopfstand-Vorbereitung, indem Sie Ihren Kopf auf den Boden legen und Ihre Hüften anheben."
                    },
                    diagonalneckstretch: {
                        name: "Diagonale Nackendehnung",
                        description: "Neigen Sie Ihren Kopf sanft diagonal, um die Seite Ihres Nackens zu dehnen."
                    }
                },
                accessibility: {
                    toggleDarkMode: "Dunklen Modus umschalten",
                    languageSelector: "Sprache auswählen",
                    startPauseTimer: "Timer starten oder pausieren",
                    nextExercise: "Nächste Übung",
                    previousExercise: "Vorherige Übung",
                    backToRoutines: "Zurück zur Routineauswahl",
                    shareApp: "Tend App teilen"
                },
                share: {
                    shareWithFriend: "Mit einem Freund teilen"
                },
                editorial: {
                    createdBy: "Erstellt von",
                    inYear: "im Jahr 2025",
                    shareMessage: "Bitte teilen Sie mit Familie, Freunden und Kollegen",
                    businessInquiries: "Für Geschäftsanfragen:"
                }
            },
            es: {
                app: {
                    title: "Tend",
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
                    routineCompleteMessage: "¡Has completado la rutina {{routineName}}!",
                    startNewRoutine: "Comenzar Nueva Rutina",
                    minutes: "Minutos",
                    exercises: "Ejercicios",
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
                    backSafeHips: "Fortalecimiento de Cadera Seguro para la Espalda",
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
                    neckShoulders10min: "Cuello y Hombros - 10 min",
                    "neck-4min": "Cuello - 4 min",
                    "neck-8min": "Cuello - 8 min",
                    "neck-12min": "Cuello - 12 min",
                    "hips-5min": "Caderas - 5 min",
                    "hips-10min": "Caderas - 10 min",
                    "hips-15min": "Caderas - 15 min",
                    "hips-20min": "Caderas - 20 min"
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
                    backSafeHips: "Fortalecimiento suave de cadera y core para personas con problemas de espalda",
                    isometric: "Fuerza a través de posiciones estáticas",
                    neck: "Aliviar tensión y rigidez del cuello",
                    shoulders: "Liberar tensión de hombros",
                    feet: "Flexibilidad y salud del pie",
                    ankle: "Movilidad y flexibilidad del tobillo",
                    knees: "Movilidad de rodilla y salud articular",
                    hands: "Destreza de manos y dedos",
                    fingers: "Flexibilidad individual de dedos",
                    wrists: "Movilidad y flexibilidad de muñeca",
                    "neck-4min": "Alivio rápido de tensión del cuello",
                    "neck-8min": "Rutina integral de movilidad del cuello",
                    "neck-12min": "Rutina extendida de terapia del cuello",
                    "hips-5min": "Rutina rápida de movilidad de caderas",
                    "hips-10min": "Rutina integral de flexibilidad de caderas",
                    "hips-15min": "Rutina extendida de movilidad y fuerza de caderas",
                    "hips-20min": "Rutina completa de movilidad, flexibilidad y fuerza de caderas",
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
                    chest: "Pecho",
                    "upper-body": "Parte Superior",
                    "lower-body": "Parte Inferior"
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
                    },
                    cactusarms: {
                        name: "Brazos de Cactus",
                        description: "Siéntese derecho, lleve los brazos a la altura de los hombros, doble los codos a 90 grados y presione los brazos contra la silla."
                    },
                    divers: {
                        name: "Buzos",
                        description: "Siéntese derecho, extienda los brazos hacia adelante y arriba, luego bújelos entre las piernas, redondeando la columna."
                    },
                    seatedbacktwist: {
                        name: "Giro de Espalda Sentado",
                        description: "Siéntese derecho y gire suavemente el torso hacia la derecha, colocando la mano izquierda en la rodilla derecha. Mantenga y repita en el otro lado."
                    },
                    shoulderbladesqueeze: {
                        name: "Apretón de Omóplatos",
                        description: "Apriete los omóplatos, mantenga 5 segundos, luego suelte. Mantenga los hombros relajados."
                    },
                    chintucks: {
                        name: "Retracción de Barbilla",
                        description: "Retraiga suavemente la barbilla, creando una papada. Mantenga 5 segundos, luego suelte. Repita lentamente."
                    },
                    // Additional critical exercises
                    finalrelaxation: {
                        name: "Relajación Final",
                        description: "Siéntese cómodamente con los pies planos en el suelo, cierre los ojos y sienta cómo se relajan sus pies y tobillos."
                    },
                    sunsalutation: {
                        name: "Saludo al Sol",
                        description: "Párese derecho, levante los brazos, luego dóblese hacia adelante, retroceda en una plancha y regrese a estar de pie."
                    },
                    fullbodystretch: {
                        name: "Estiramiento de Cuerpo Completo",
                        description: "Párese con los pies separados, levante los brazos y sobre la cabeza, luego inclínese suavemente hacia cada lado."
                    },
                    childspose: {
                        name: "Postura del Niño",
                        description: "Arrodíllese y siéntese sobre los talones, luego extienda los brazos hacia adelante y baje el pecho hacia el suelo."
                    },
                    downwarddog: {
                        name: "Perro Boca Abajo",
                        description: "Desde manos y rodillas, meta los dedos de los pies y levante las caderas hacia arriba y atrás, enderezando las piernas tanto como sea cómodo."
                    },
                    warriori: {
                        name: "Guerrero I",
                        description: "Dé un paso con un pie hacia adelante en una estocada, levante los brazos por encima de la cabeza y mantenga la posición."
                    },
                    trianglepose: {
                        name: "Postura del Triángulo",
                        description: "Párese con los pies muy separados, alcance con una mano hacia la espinilla y con la otra hacia el cielo."
                    },
                    butterflystretch: {
                        name: "Estiramiento de Mariposa",
                        description: "Siéntese con las plantas de los pies juntas, presione suavemente las rodillas hacia el suelo."
                    },
                    supinetwist: {
                        name: "Giro Supino",
                        description: "Acuéstese boca arriba, lleve las rodillas a un lado, manteniendo los hombros en el suelo. Mantenga y repita del otro lado."
                    },
                    happybaby: {
                        name: "Bebé Feliz",
                        description: "Acuéstese boca arriba, agarre los lados exteriores de los pies y balancee suavemente de lado a lado."
                    },
                    ragdoll: {
                        name: "Muñeca de Trapo",
                        description: "Párese con los pies separados al ancho de las caderas, dóblese lentamente hacia adelante desde las caderas, dejando que los brazos cuelguen como una muñeca de trapo."
                    },
                    kneestochest: {
                        name: "Rodillas al Pecho",
                        description: "Acuéstese boca arriba, lleve ambas rodillas al pecho y balancee suavemente de lado a lado."
                    },
                    legsupthewall: {
                        name: "Piernas en la Pared",
                        description: "Siéntese cerca de una pared, balancee las piernas hacia la pared y acuéstese con los brazos a los lados."
                    },
                    corpsepose: {
                        name: "Postura del Cadáver",
                        description: "Acuéstese boca arriba con los brazos a los lados, cierre los ojos y concéntrese en la respiración."
                    },
                    // Hip & Leg Exercises - Batch 1
                    squatstretch: {
                        name: "Estiramiento de Sentadillas",
                        description: "Párese con los pies más anchos que el ancho de las caderas, baje en una sentadilla profunda y mantenga la posición."
                    },
                    reverselunge: {
                        name: "Zancada Inversa",
                        description: "Dé un paso hacia atrás con un pie en una zancada, manteniendo la rodilla delantera sobre el tobillo, y mantenga la posición."
                    },
                    toesquats: {
                        name: "Sentadillas de Dedos",
                        description: "Arrodíllese en el suelo, siéntese sobre los talones y mantenga la posición para estirar los dedos de los pies y los pies."
                    },
                    hipcircles: {
                        name: "Círculos de Cadera",
                        description: "Párese con las manos en las caderas y haga círculos lentos con las caderas."
                    },
                    seatedhipstretch: {
                        name: "Estiramiento de Cadera Sentado",
                        description: "Siéntese con una pierna extendida y lleve la otra rodilla al pecho."
                    },
                    supinehipstretch: {
                        name: "Estiramiento de Cadera Supino",
                        description: "Acuéstese, lleve la rodilla al pecho y luego cruce el cuerpo."
                    },
                    singlelegforwardfold: {
                        name: "Flexión Hacia Adelante de Una Pierna",
                        description: "Párese en una pierna, extienda la otra pierna hacia adelante y alcance hacia su pie extendido."
                    },
                    isometricsquat: {
                        name: "Sentadilla Isométrica",
                        description: "Párese con los pies separados al ancho de los hombros, baje en una sentadilla y mantenga la posición sin moverse."
                    },
                    singlelegstand: {
                        name: "Equilibrio en Una Pierna",
                        description: "Párese en una pierna, levante la otra pierna ligeramente del suelo y mantenga la posición para el equilibrio."
                    },
                    isometriclunge: {
                        name: "Zancada Isométrica",
                        description: "Entre en una posición de zancada y manténgala sin moverse, manteniendo la rodilla delantera sobre el tobillo."
                    },
                    isometriccalfraise: {
                        name: "Elevación de Pantorrilla Isométrica",
                        description: "Párese en las puntas de los pies y mantenga la posición sin moverse, activando los músculos de la pantorrilla."
                    },
                    calfstretch: {
                        name: "Estiramiento de Pantorrilla",
                        description: "Párese frente a una pared, coloque un pie hacia adelante e inclínese contra la pared para estirar la pantorrilla."
                    },
                    quadstretch: {
                        name: "Estiramiento de Cuádriceps",
                        description: "Párese en una pierna, doble la otra rodilla y tire del talón hacia los glúteos."
                    },
                    hamstringstretch: {
                        name: "Estiramiento de Isquiotibiales",
                        description: "Siéntese con una pierna extendida, alcance hacia adelante hacia los dedos de los pies mientras mantiene la espalda recta."
                    },
                    standingquadstretch: {
                        name: "Estiramiento de Cuádriceps de Pie",
                        description: "Párese en una pierna, doble la otra rodilla y tire del talón hacia los glúteos mientras está de pie."
                    },
                    hipcirclesseated: {
                        name: "Círculos de Cadera Sentado",
                        description: "Siéntese y haga círculos con las rodillas."
                    },
                    hipabduction: {
                        name: "Abducción de Cadera",
                        description: "Párese y levante una pierna hacia el lado, manteniéndola recta."
                    },
                    hipadduction: {
                        name: "Aducción de Cadera",
                        description: "Párese y cruce una pierna frente a la otra, luego levántela."
                    },
                    hipbridge: {
                        name: "Puente de Cadera",
                        description: "Acuéstese boca arriba, doble las rodillas y levante las caderas del suelo."
                    },
                    hipflexorstrengthening: {
                        name: "Fortalecimiento de Flexores de Cadera",
                        description: "Párese y levante una rodilla hacia el pecho, luego bájela lentamente."
                    },
                    clamshells: {
                        name: "Almejas",
                        description: "Acuéstese de lado, rodillas dobladas. Mantenga los pies juntos y abra la rodilla superior."
                    },
                    singlelegglutbridge: {
                        name: "Puente de Glúteos con Una Pierna",
                        description: "Puente de glúteos con una pierna extendida. Fortalece los glúteos sin carga espinal."
                    },
                    supinemarching: {
                        name: "Marcha en Posición Supina",
                        description: "Acostado boca arriba, levante alternadamente las rodillas hacia el pecho. Construye estabilidad del core."
                    },
                    hipflexoractivation: {
                        name: "Activación de Flexores de Cadera",
                        description: "Fortalecimiento isométrico: presione el pie contra el suelo mientras intenta levantar la rodilla."
                    },
                    singlelegdeadlift: {
                        name: "Peso Muerto de Una Pierna",
                        description: "Párese en una pierna, inclínese hacia adelante en las caderas mientras extiende la otra pierna hacia atrás."
                    },
                    // Core & Back Exercises - Batch 2
                    gentletwist: {
                        name: "Giro Suave",
                        description: "Párese con los pies separados al ancho de las caderas, coloque las manos en las caderas y gire suavemente de lado a lado."
                    },
                    plankhold: {
                        name: "Mantener Plancha",
                        description: "Mantenga una posición de plancha, manteniendo el cuerpo recto de la cabeza a los talones."
                    },
                    glutebridgehold: {
                        name: "Mantener Puente de Glúteos",
                        description: "Acuéstese boca arriba, levante las caderas y mantenga la posición."
                    },
                    backwardneckstretch: {
                        name: "Estiramiento de Cuello Hacia Atrás",
                        description: "Incline suavemente la cabeza hacia atrás, sintiendo un estiramiento en la parte frontal del cuello."
                    },
                    behindbackshoulderstretch: {
                        name: "Estiramiento de Hombro Detrás de la Espalda",
                        description: "Alcance un brazo detrás de la espalda y tírelo suavemente con la otra mano."
                    },
                    lowerbackstretch: {
                        name: "Estiramiento de Espalda Baja",
                        description: "Acuéstese boca arriba, lleve las rodillas al pecho y balancee suavemente de lado a lado."
                    },
                    glutebridge: {
                        name: "Puente de Glúteos",
                        description: "Acuéstese boca arriba, doble las rodillas y levante las caderas hacia arriba y hacia abajo."
                    },
                    lowerbackstrengthening: {
                        name: "Fortalecimiento de Espalda Baja",
                        description: "Acuéstese boca abajo y levante el pecho y las piernas del suelo."
                    },
                    // Arm & Shoulder Exercises - Batch 2
                    kneetochest: {
                        name: "Rodilla al Pecho",
                        description: "Acuéstese boca arriba, lleve una rodilla al pecho y mantenga la posición."
                    },
                    isometricpushup: {
                        name: "Flexión Isométrica",
                        description: "Mantenga una posición de flexión sin moverse, manteniendo el cuerpo recto."
                    },
                    crossbodyshoulderstretch: {
                        name: "Estiramiento de Hombro Cruzado",
                        description: "Lleve un brazo a través del cuerpo y tírelo suavemente con la otra mano."
                    },
                    overheadshoulderstretch: {
                        name: "Estiramiento de Hombro por Encima",
                        description: "Alcance un brazo por encima de la cabeza y tírelo suavemente con la otra mano."
                    },
                    shoulderexternalrotation: {
                        name: "Rotación Externa de Hombro",
                        description: "Mantenga el codo en 90 grados y rote el brazo hacia afuera."
                    },
                    shoulderinternalrotation: {
                        name: "Rotación Interna de Hombro",
                        description: "Mantenga el codo en 90 grados y rote el brazo hacia adentro."
                    },
                    // Foot & Ankle Exercises
                    wheelpose: {
                        name: "Postura de la Rueda",
                        description: "Acuéstese boca arriba, coloque las manos junto a las orejas y levántese en una extensión hacia atrás."
                    },
                    reclinedhandtobigtoe: {
                        name: "Mano al Dedo Gordo Recostado",
                        description: "Acuéstese boca arriba y alcance el dedo gordo del pie con la mano."
                    },
                    toespreads: {
                        name: "Separación de Dedos",
                        description: "Siéntese y separe los dedos de los pies, luego júntelos."
                    },
                    toecurls: {
                        name: "Rizado de Dedos",
                        description: "Siéntese y enrosque los dedos de los pies, luego estírelos."
                    },
                    footmassage: {
                        name: "Masaje de Pies",
                        description: "Use las manos para masajear los pies, enfocándose en los arcos y las plantas."
                    },
                    ankleflexion: {
                        name: "Flexión de Tobillo",
                        description: "Apunte los dedos de los pies hacia arriba y hacia abajo, flexionando el tobillo."
                    },
                    ankleinversion: {
                        name: "Inversión de Tobillo",
                        description: "Gire el pie hacia adentro y hacia afuera para estirar el tobillo."
                    },
                    heeltotoerocks: {
                        name: "Balanceo de Talón a Dedo",
                        description: "Balancee desde los talones hasta los dedos de los pies mientras está de pie."
                    },
                    lateralfootrocks: {
                        name: "Balanceo Lateral de Pie",
                        description: "Balancee los pies de lado a lado mientras está de pie."
                    },
                    // Hand & Wrist Exercises
                    fingerspreads: {
                        name: "Separación de Dedos",
                        description: "Separe los dedos lo más posible, luego júntelos."
                    },
                    thumbcircles: {
                        name: "Círculos de Pulgar",
                        description: "Haga círculos con el pulgar en ambas direcciones."
                    },
                    fingerbends: {
                        name: "Flexión de Dedos",
                        description: "Doble cada dedo individualmente, luego estírelos."
                    },
                    wristflexorstretch: {
                        name: "Estiramiento de Flexores de Muñeca",
                        description: "Extienda el brazo y tire de la mano hacia atrás para estirar los flexores de la muñeca."
                    },
                    handmassage: {
                        name: "Masaje de Manos",
                        description: "Use la otra mano para masajear la palma, los dedos y la muñeca."
                    },
                    individualfingerlifts: {
                        name: "Elevación Individual de Dedos",
                        description: "Levante cada dedo individualmente mientras mantiene los otros abajo."
                    },
                    fingertaps: {
                        name: "Toque de Dedos",
                        description: "Toque cada dedo con el pulgar en secuencia."
                    },
                    fingerstretches: {
                        name: "Estiramientos de Dedos",
                        description: "Estire cada dedo tirando suavemente con la otra mano."
                    },
                    fingercircles: {
                        name: "Círculos de Dedos",
                        description: "Haga círculos con cada dedo en ambas direcciones."
                    },
                    pinkytothumb: {
                        name: "Meñique al Pulgar",
                        description: "Toque el meñique con el pulgar, luego estírelos separados."
                    },
                    wristcircles: {
                        name: "Círculos de Muñeca",
                        description: "Haga círculos con las muñecas en ambas direcciones."
                    },
                    wristflexion: {
                        name: "Flexión de Muñeca",
                        description: "Doble la muñeca hacia arriba y hacia abajo, luego de lado a lado."
                    },
                    wristsidetoside: {
                        name: "Muñeca de Lado a Lado",
                        description: "Mueva la muñeca de lado a lado."
                    },
                    wristextensorstretch: {
                        name: "Estiramiento de Extensores de Muñeca",
                        description: "Extienda el brazo y tire de la mano hacia abajo para estirar los extensores de la muñeca."
                    },
                    // Advanced & Yoga Poses
                    pigeonpose: {
                        name: "Postura de la Paloma",
                        description: "Desde manos y rodillas, lleve una rodilla hacia adelante y colóquela detrás de la muñeca, extienda la otra pierna hacia atrás."
                    },
                    lizardpose: {
                        name: "Postura del Lagarto",
                        description: "Zancada baja con antebrazos en el suelo."
                    },
                    pyramidpose: {
                        name: "Postura de la Pirámide",
                        description: "Párese con los pies separados, dóblese hacia adelante y alcance el pie delantero."
                    },
                    // Isometric & Strength
                    wallsit: {
                        name: "Sentadilla en Pared",
                        description: "Siéntese contra una pared con las rodillas en 90 grados y mantenga la posición."
                    },
                    deadbughold: {
                        name: "Mantener Bicho Muerto",
                        description: "Acuéstese boca arriba, levante los brazos y las piernas, y mantenga la posición."
                    },
                    // Specialized & Other
                    foldedbutterfly: {
                        name: "Mariposa Plegada",
                        description: "Siéntese con las plantas de los pies juntas, dóblese hacia adelante desde las caderas y mantenga la posición."
                    },
                    seatedstraddle: {
                        name: "Apertura Sentada",
                        description: "Siéntese con las piernas separadas, alcance hacia adelante hacia el centro, luego a cada lado."
                    },
                    scorpionprep: {
                        name: "Preparación de Escorpión",
                        description: "Acuéstese boca abajo, alcance hacia atrás y agarre los pies, y levante el pecho y las piernas del suelo."
                    },
                    figurestretch: {
                        name: "Estiramiento Figura 4",
                        description: "Siéntese y coloque el tobillo en la rodilla opuesta, inclínese hacia adelante."
                    },
                    standingforwardfold: {
                        name: "Flexión Hacia Adelante de Pie",
                        description: "Párese con los pies separados al ancho de las caderas y dóblese hacia adelante desde las caderas."
                    },
                    standingsplit: {
                        name: "Apertura de Pie",
                        description: "Párese en una pierna y levante la otra pierna lo más alto posible detrás de usted."
                    },
                    pelvictilts: {
                        name: "Inclinación Pélvica",
                        description: "Acuéstese boca arriba y balancee suavemente la pelvis hacia arriba y hacia abajo."
                    },
                    achillesstretch: {
                        name: "Estiramiento de Aquiles",
                        description: "Párese frente a una pared, coloque un pie hacia atrás e inclínese hacia adelante para estirar el tendón de Aquiles."
                    },
                    kneecircles: {
                        name: "Círculos de Rodilla",
                        description: "Siéntese y haga círculos con las rodillas en ambas direcciones."
                    },
                    seatedkneeextensions: {
                        name: "Extensiones de Rodilla Sentado",
                        description: "Siéntese y extienda una pierna recta, luego dóblela hacia atrás."
                    },
                    itbandstretch: {
                        name: "Estiramiento de Banda IT",
                        description: "Párese y cruce una pierna detrás de la otra, luego inclínese hacia el lado."
                    },
                    kneehugs: {
                        name: "Abrazo de Rodilla",
                        description: "Párese y abrace una rodilla al pecho, luego cambie de pierna."
                    },
                    fisttoopen: {
                        name: "Puño a Abierto",
                        description: "Haga un puño, luego abra la mano ampliamente, separando los dedos."
                    },
                    prayerstretch: {
                        name: "Estiramiento de Oración",
                        description: "Presione las palmas de las manos juntas frente al pecho y mantenga."
                    },
                    spidercrawl: {
                        name: "Gateo de Araña",
                        description: "Camine con los dedos hacia arriba y hacia abajo como una araña gateando."
                    },
                    reverseprayer: {
                        name: "Oración Inversa",
                        description: "Presione las palmas de las manos juntas detrás de la espalda y mantenga."
                    },
                    soleusstretch: {
                        name: "Estiramiento de Sóleo",
                        description: "Párese con un pie hacia adelante, doble ambas rodillas para estirar el músculo sóleo."
                    },
                    wallslides: {
                        name: "Deslizamiento en Pared",
                        description: "Párese contra una pared y deslice los brazos hacia arriba y hacia abajo."
                    },
                    scapularwallslides: {
                        name: "Deslizamiento de Escápula en Pared",
                        description: "Párese contra una pared y deslice las escápulas hacia arriba y hacia abajo."
                    },
                    romaniandeadlift: {
                        name: "Peso Muerto Rumano",
                        description: "Párese con las rodillas ligeramente dobladas, articule en las caderas mientras mantiene la espalda recta."
                    },
                    // Neck & Head Exercises
                    headstandprep: {
                        name: "Preparación de Parada de Cabeza",
                        description: "Practique la preparación de parada de cabeza colocando la cabeza en el suelo y levantando las caderas."
                    },
                    diagonalneckstretch: {
                        name: "Estiramiento Diagonal de Cuello",
                        description: "Incline suavemente la cabeza diagonalmente para estirar el lado del cuello."
                    }
                },
                accessibility: {
                    toggleDarkMode: "Alternar modo oscuro",
                    languageSelector: "Seleccionar idioma",
                    startPauseTimer: "Iniciar o pausar temporizador",
                    nextExercise: "Siguiente ejercicio",
                    previousExercise: "Ejercicio anterior",
                    backToRoutines: "Volver a selección de rutinas",
                    shareApp: "Compartir aplicación Tend"
                },
                share: {
                    shareWithFriend: "Compartir con un amigo"
                },
                editorial: {
                    createdBy: "Creado por",
                    inYear: "en 2025",
                    shareMessage: "Por favor comparte con familia, amigos y colegas",
                    businessInquiries: "Para consultas comerciales:"
                }
            },
            ta: {
                app: {
                    title: "Tend",
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
                    routineCompleteMessage: "நீங்கள் {{routineName}} வழக்கத்தை முடித்துவிட்டீர்கள்!",
                    startNewRoutine: "புதிய வழக்கத்தை தொடங்கவும்",
                    minutes: "நிமிடங்கள்",
                    exercises: "பயிற்சிகள்",
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
                    backSafeHips: "முதுகு பாதுகாப்பான இடுப்பு வலுப்படுத்துதல்",
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
                    neckShoulders10min: "கழுத்து மற்றும் தோள்கள் - 10 நிமிடம்",
                    "neck-4min": "கழுத்து - 4 நிமிடம்",
                    "neck-8min": "கழுத்து - 8 நிமிடம்",
                    "neck-12min": "கழுத்து - 12 நிமிடம்",
                    "hips-5min": "இடுப்புகள் - 5 நிமிடம்",
                    "hips-10min": "இடுப்புகள் - 10 நிமிடம்",
                    "hips-15min": "இடுப்புகள் - 15 நிமிடம்",
                    "hips-20min": "இடுப்புகள் - 20 நிமிடம்",
                    "shoulders-4min": "தோள்கள் - 4 நிமிடம்",
                    "shoulders-8min": "தோள்கள் - 8 நிமிடம்",
                    "shoulders-12min": "தோள்கள் - 12 நிமிடம்",
                    "shoulders-16min": "தோள்கள் - 16 நிமிடம்",
                    "lower-back-5min": "கீழ் முதுகு - 5 நிமிடம்",
                    "lower-back-10min": "கீழ் முதுகு - 10 நிமிடம்",
                    "lower-back-15min": "கீழ் முதுகு - 15 நிமிடம்",
                    "lower-back-20min": "கீழ் முதுகு - 20 நிமிடம்",
                    "hamstrings-5min": "பின்புற துடை எலும்பு - 5 நிமிடம்",
                    "hamstrings-10min": "பின்புற துடை எலும்பு - 10 நிமிடம்",
                    "hamstrings-15min": "பின்புற துடை எலும்பு - 15 நிமிடம்",
                    "feet-ankles-4min": "பாதங்கள் மற்றும் கணுக்கால்கள் - 4 நிமிடம்",
                    "feet-ankles-8min": "பாதங்கள் மற்றும் கணுக்கால்கள் - 8 நிமிடம்",
                    "feet-ankles-12min": "பாதங்கள் மற்றும் கணுக்கால்கள் - 12 நிமிடம்",
                    "core-5min": "மையம் - 5 நிமிடம்",
                    "core-10min": "மையம் - 10 நிமிடம்",
                    "core-15min": "மையம் - 15 நிமிடம்",
                    "upper-body-4min": "மேல் உடல் - 4 நிமிடம்",
                    "upper-body-8min": "மேல் உடல் - 8 நிமிடம்",
                    "upper-body-12min": "மேல் உடல் - 12 நிமிடம்",
                    "lower-body-5min": "கீழ் உடல் - 5 நிமிடம்",
                    "lower-body-10min": "கீழ் உடல் - 10 நிமிடம்",
                    "lower-body-15min": "கீழ் உடல் - 15 நிமிடம்",
                    "seated-4min": "உட்கார்ந்த - 4 நிமிடம்",
                    "seated-8min": "உட்கார்ந்த - 8 நிமிடம்",
                    "seated-12min": "உட்கார்ந்த - 12 நிமிடம்",
                    "posture-4min": "உடல்நிலை - 4 நிமிடம்",
                    "posture-8min": "உடல்நிலை - 8 நிமிடம்",
                    "posture-12min": "உடல்நிலை - 12 நிமிடம்",
                    "chest-4min": "மார்பு - 4 நிமிடம்",
                    "chest-8min": "மார்பு - 8 நிமிடம்",
                    "chest-12min": "மார்பு - 12 நிமிடம்",
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
                    backSafeHips: "முதுகு பிரச்சனைகள் உள்ளவர்களுக்கு மென்மையான இடுப்பு மற்றும் மைய வலிமைப்படுத்துதல்",
                    isometric: "நிலையான பிடிப்புகள் மூலம் வலிமை",
                    neck: "கழுத்து பதற்றம் மற்றும் விறைப்பை நிவாரணம்",
                    shoulders: "தோள் பதற்றத்தை விடுவித்தல்",
                    feet: "பாத நெகிழ்வு மற்றும் ஆரோக்கியம்",
                    ankle: "கணுக்கால் இயக்கத்திறன் மற்றும் நெகிழ்வு",
                    knees: "முழங்கால் இயக்கத்திறன் மற்றும் மூட்டு ஆரோக்கியம்",
                    hands: "கை மற்றும் விரல் திறமை",
                    fingers: "தனிப்பட்ட விரல் நெகிழ்வு",
                    wrists: "மணிக்கட்டு இயக்கத்திறன் மற்றும் நெகிழ்வு",
                    "neck-4min": "விரைவான கழுத்து பதற்ற நிவாரணம்",
                    "neck-8min": "விரிவான கழுத்து இயக்கத்திறன் வழக்கம்",
                    "neck-12min": "நீட்டிக்கப்பட்ட கழுத்து சிகிச்சை வழக்கம்",
                    "hips-5min": "விரைவான இடுப்பு இயக்கத்திறன் வழக்கம்",
                    "hips-10min": "விரிவான இடுப்பு நெகிழ்வு வழக்கம்",
                    "hips-15min": "நீட்டிக்கப்பட்ட இடுப்பு இயக்கத்திறன் மற்றும் வலிமை வழக்கம்",
                    "hips-20min": "முழுமையான இடுப்பு இயக்கத்திறன், நெகிழ்வு மற்றும் வலிமை வழக்கம்",
                    feetAnkles: "பாத மற்றும் கணுக்கால் இயக்கத்திறன் வழக்கம்",
                    "shoulders-4min": "விரைவான தோள் இயக்கத்திறன் வழக்கம்",
                    "shoulders-8min": "விரிவான தோள் நெகிழ்வு வழக்கம்",
                    "shoulders-12min": "நீட்டிக்கப்பட்ட தோள் இயக்கத்திறன் மற்றும் வலிமை வழக்கம்",
                    "shoulders-16min": "முழுமையான தோள் சிகிச்சை மற்றும் இயக்கத்திறன் வழக்கம்",
                    "lower-back-5min": "விரைவான கீழ் முதுகு நிவாரண வழக்கம்",
                    "lower-back-10min": "விரிவான கீழ் முதுகு இயக்கத்திறன் வழக்கம்",
                    "lower-back-15min": "நீட்டிக்கப்பட்ட கீழ் முதுகு சிகிச்சை வழக்கம்",
                    "lower-back-20min": "முழுமையான கீழ் முதுகு மறுவாழ்வு வழக்கம்",
                    "hamstrings-5min": "விரைவான பின்புற துடை எலும்பு நெகிழ்வு வழக்கம்",
                    "hamstrings-10min": "விரிவான பின்புற துடை எலும்பு நெகிழ்வு வழக்கம்",
                    "hamstrings-15min": "நீட்டிக்கப்பட்ட பின்புற துடை எலும்பு இயக்கத்திறன் மற்றும் வலிமை வழக்கம்",
                    "feet-ankles-4min": "விரைவான பாத மற்றும் கணுக்கால் இயக்கத்திறன் வழக்கம்",
                    "feet-ankles-8min": "விரிவான பாத மற்றும் கணுக்கால் நெகிழ்வு வழக்கம்",
                    "feet-ankles-12min": "நீட்டிக்கப்பட்ட பாத மற்றும் கணுக்கால் சிகிச்சை வழக்கம்",
                    "core-5min": "விரைவான மைய வலிமை வழக்கம்",
                    "core-10min": "விரிவான மைய நிலைப்பாடு வழக்கம்",
                    "core-15min": "நீட்டிக்கப்பட்ட மைய வலிமை மற்றும் நிலைப்பாடு வழக்கம்",
                    "upper-body-4min": "விரைவான மேல் உடல் இயக்கத்திறன் வழக்கம்",
                    "upper-body-8min": "விரிவான மேல் உடல் நெகிழ்வு வழக்கம்",
                    "upper-body-12min": "நீட்டிக்கப்பட்ட மேல் உடல் வலிமை மற்றும் இயக்கத்திறன் வழக்கம்",
                    "lower-body-5min": "விரைவான கீழ் உடல் இயக்கத்திறன் வழக்கம்",
                    "lower-body-10min": "விரிவான கீழ் உடல் நெகிழ்வு வழக்கம்",
                    "lower-body-15min": "நீட்டிக்கப்பட்ட கீழ் உடல் வலிமை மற்றும் இயக்கத்திறன் வழக்கம்",
                    "seated-4min": "விரைவான உட்கார்ந்த இயக்கத்திறன் வழக்கம்",
                    "seated-8min": "விரிவான உட்கார்ந்த நெகிழ்வு வழக்கம்",
                    "seated-12min": "நீட்டிக்கப்பட்ட உட்கார்ந்த சிகிச்சை வழக்கம்",
                    "posture-4min": "விரைவான உடல்நிலை திருத்த வழக்கம்",
                    "posture-8min": "விரிவான உடல்நிலை மேம்பாடு வழக்கம்",
                    "posture-12min": "நீட்டிக்கப்பட்ட உடல்நிலை சிகிச்சை வழக்கம்",
                    "chest-4min": "விரைவான மார்பு திறப்பு வழக்கம்",
                    "chest-8min": "விரிவான மார்பு நெகிழ்வு வழக்கம்",
                    "chest-12min": "நீட்டிக்கப்பட்ட மார்பு சிகிச்சை வழக்கம்",
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
                    chest: "மார்பு",
                    "upper-body": "மேல் உடல்",
                    "lower-body": "கீழ் உடல்"
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
                    },
                    cactusarms: {
                        name: "கள்ளி கைகள்",
                        description: "நேராக உட்கார்ந்து, உங்கள் கைகளை தோள் உயரத்திற்கு கொண்டு வாருங்கள், உங்கள் முழங்கைகளை 90 டிகிரிக்கு வளைக்கவும், மற்றும் உங்கள் கைகளை நாற்காலிக்கு எதிராக அழுத்தவும்."
                    },
                    divers: {
                        name: "நீச்சல் வீரர்கள்",
                        description: "நேராக உட்கார்ந்து, உங்கள் கைகளை முன்னோக்கி மற்றும் மேல்நோக்கி நீட்டுங்கள், பின்னர் அவற்றை உங்கள் கால்களுக்கு இடையில் மூழ்கடிக்கவும், உங்கள் முதுகெலும்பை வட்டமாக்கவும்."
                    },
                    seatedbacktwist: {
                        name: "உட்கார்ந்த முதுகு திருப்பம்",
                        description: "நேராக உட்கார்ந்து உங்கள் மேல் உடலை வலது பக்கமாக மெதுவாக திருப்புங்கள், உங்கள் இடது கையை உங்கள் வலது முழங்காலில் வைக்கவும். வைத்திருங்கள் மற்றும் மறுபக்கத்தில் மீண்டும் செய்யுங்கள்."
                    },
                    shoulderbladesqueeze: {
                        name: "தோள் துடை அழுத்தம்",
                        description: "உங்கள் தோள் துடைகளை ஒன்றாக அழுத்துங்கள், 5 வினாடிகள் வைத்திருங்கள், பின்னர் விடுங்கள். உங்கள் தோள்களை தளர்வாக வைத்திருங்கள்."
                    },
                    chintucks: {
                        name: "தாடி இழுத்தல்",
                        description: "உங்கள் தாடியை மெதுவாக பின்னோக்கி இழுக்கவும், இரட்டை தாடியை உருவாக்கவும். 5 வினாடிகள் வைத்திருங்கள், பின்னர் விடுங்கள். மெதுவாக மீண்டும் செய்யுங்கள்."
                    },
                    // Additional critical exercises
                    finalrelaxation: {
                        name: "இறுதி தளர்வு",
                        description: "உங்கள் கால்களை தரையில் தட்டையாக வைத்து வசதியாக உட்கார்ந்து, கண்களை மூடி, உங்கள் கால்கள் மற்றும் கணுக்கால்கள் தளர்வடைகிறது என்பதை உணருங்கள்."
                    },
                    sunsalutation: {
                        name: "சூரிய வணக்கம்",
                        description: "நேராக நிற்கவும், உங்கள் கைகளை உயர்த்தவும், பின்னர் முன்னோக்கி வளைந்து, பிளாங்க் நிலையில் பின்னோக்கி சென்று, நிற்கும் நிலைக்குத் திரும்பவும்."
                    },
                    fullbodystretch: {
                        name: "முழு உடல் நீட்சி",
                        description: "கால்களை விரித்து நிற்கவும், உங்கள் கைகளை உயர்த்தி தலையின் மேல் கொண்டு வாருங்கள், பின்னர் ஒவ்வொரு பக்கமாக மெதுவாக சாயுங்கள்."
                    },
                    childspose: {
                        name: "குழந்தை நிலை",
                        description: "முழங்காலிட்டு உட்கார்ந்து உங்கள் குதிகால்களில் அமர்ந்து, உங்கள் கைகளை முன்னோக்கி நீட்டி உங்கள் மார்பை தரையை நோக்கி கீழே கொண்டு வாருங்கள்."
                    },
                    downwarddog: {
                        name: "கீழ்நோக்கிய நாய்",
                        description: "கைகள் மற்றும் முழங்கால்களில் இருந்து, உங்கள் கால் விரல்களை உள்ளிழுத்து உங்கள் இடுப்புகளை மேல்நோக்கி மற்றும் பின்னோக்கி உயர்த்துங்கள், உங்கள் கால்களை வசதியாக நேராக்குங்கள்."
                    },
                    warriori: {
                        name: "வீரர் I",
                        description: "ஒரு காலை முன்னோக்கி லஞ்ச் நிலையில் வைக்கவும், உங்கள் கைகளை தலையின் மேல் உயர்த்தி நிலையை வைத்திருங்கள்."
                    },
                    trianglepose: {
                        name: "முக்கோண நிலை",
                        description: "கால்களை அகலமாக விரித்து நிற்கவும், ஒரு கையை உங்கள் கால் எலும்புக்கு கீழே கொண்டு வாருங்கள் மற்றும் மற்றொன்றை வானத்தை நோக்கி உயர்த்துங்கள்."
                    },
                    butterflystretch: {
                        name: "வண்ணத்துப்பூச்சி நீட்சி",
                        description: "உங்கள் கால்களின் அடிப்பகுதிகளை ஒன்றாக வைத்து உட்கார்ந்து, உங்கள் முழங்கால்களை மெதுவாக தரையை நோக்கி அழுத்துங்கள்."
                    },
                    supinetwist: {
                        name: "பின்புற திருப்பம்",
                        description: "உங்கள் முதுகில் படுத்து, உங்கள் முழங்கால்களை ஒரு பக்கமாக கொண்டு வாருங்கள், உங்கள் தோள்களை தரையில் வைத்து. வைத்திருங்கள் மற்றும் மறுபக்கத்தில் மீண்டும் செய்யுங்கள்."
                    },
                    happybaby: {
                        name: "மகிழ்ச்சியான குழந்தை",
                        description: "உங்கள் முதுகில் படுத்து, உங்கள் கால்களின் வெளிப்புறங்களை பிடித்து, பக்கத்திலிருந்து பக்கத்திற்கு மெதுவாக ஆடுங்கள்."
                    },
                    ragdoll: {
                        name: "துணி பொம்மை",
                        description: "உங்கள் கால்களை இடுப்பு அகலத்தில் வைத்து நிற்கவும், உங்கள் இடுப்புகளிலிருந்து மெதுவாக முன்னோக்கி வளைந்து, உங்கள் கைகளை துணி பொம்மையைப் போல தொங்க விடுங்கள்."
                    },
                    kneestochest: {
                        name: "முழங்கால்கள் மார்புக்கு",
                        description: "உங்கள் முதுகில் படுத்து, இரண்டு முழங்கால்களையும் உங்கள் மார்புக்கு கொண்டு வாருங்கள், மற்றும் பக்கத்திலிருந்து பக்கத்திற்கு மெதுவாக ஆடுங்கள்."
                    },
                    legsupthewall: {
                        name: "சுவரில் கால்கள்",
                        description: "ஒரு சுவருக்கு அருகில் உட்கார்ந்து, உங்கள் கால்களை சுவரில் உயர்த்தி, உங்கள் கைகளை பக்கங்களில் வைத்து பின்னால் படுத்து கொள்ளுங்கள்."
                    },
                    corpsepose: {
                        name: "சவ நிலை",
                        description: "உங்கள் கைகளை பக்கங்களில் வைத்து முதுகில் படுத்து, கண்களை மூடி, சுவாசத்தில் கவனம் செலுத்துங்கள்."
                    },
                    // Hip & Leg Exercises - Batch 1
                    squatstretch: {
                        name: "குந்தி நீட்சி",
                        description: "இடுப்பு அகலத்தை விட அகலமாக கால்களை வைத்து நிற்கவும், ஆழமான குந்தியில் இறங்கி நிலையை வைத்திருக்கவும்."
                    },
                    reverselunge: {
                        name: "தலைகீழ் முன்னேற்றம்",
                        description: "ஒரு காலை பின்னால் முன்னேற்ற நிலையில் வைத்து, முன் முழங்காலை கணுக்காலுக்கு மேலே வைத்து நிலையை வைத்திருக்கவும்."
                    },
                    toesquats: {
                        name: "கால் விரல் குந்திகள்",
                        description: "தரையில் முழங்காலிட்டு உட்கார்ந்து, உங்கள் குதிகால்களில் பின்னால் உட்கார்ந்து, உங்கள் கால் விரல்கள் மற்றும் கால்களை நீட்டுவதற்கு நிலையை வைத்திருக்கவும்."
                    },
                    hipcircles: {
                        name: "இடுப்பு வட்டங்கள்",
                        description: "இடுப்புகளில் கைகளை வைத்து நிற்கவும், உங்கள் இடுப்புகளுடன் மெதுவான வட்டங்களை உருவாக்கவும்."
                    },
                    seatedhipstretch: {
                        name: "உட்கார்ந்த இடுப்பு நீட்சி",
                        description: "ஒரு கால் நீட்டிய நிலையில் உட்கார்ந்து, மற்ற முழங்காலை மார்புக்கு இழுக்கவும்."
                    },
                    supinehipstretch: {
                        name: "பின்புற இடுப்பு நீட்சி",
                        description: "படுத்து, முழங்காலை மார்புக்கு இழுத்து, பின்னர் உடலுக்கு குறுக்கே வைக்கவும்."
                    },
                    singlelegforwardfold: {
                        name: "ஒற்றை கால் முன்னோக்கு மடிப்பு",
                        description: "ஒரு காலில் நிற்கவும், மற்ற காலை முன்னோக்கு நீட்டவும், உங்கள் நீட்டிய காலை நோக்கி அடையவும்."
                    },
                    isometricsquat: {
                        name: "ஐசோமெட்ரிக் குந்தி",
                        description: "தோள்களின் அகலத்தில் கால்களை வைத்து நிற்கவும், குந்தியில் இறங்கி, நகராமல் நிலையை வைத்திருக்கவும்."
                    },
                    singlelegstand: {
                        name: "ஒற்றை கால் நிற்கும்",
                        description: "ஒரு காலில் நிற்கவும், மற்ற காலை தரையில் இருந்து சற்று உயர்த்தவும், சமநிலைக்காக நிலையை வைத்திருக்கவும்."
                    },
                    isometriclunge: {
                        name: "ஐசோமெட்ரிக் முன்னேற்றம்",
                        description: "முன்னேற்ற நிலையில் நுழைந்து, உங்கள் முன் முழங்காலை கணுக்காலுக்கு மேலே வைத்து, நகராமல் வைத்திருக்கவும்."
                    },
                    isometriccalfraise: {
                        name: "ஐசோமெட்ரிக் கால் தூக்குதல்",
                        description: "உங்கள் கால் விரல்களில் நிற்கவும், உங்கள் கால் தசைகளை செயல்படுத்தி, நகராமல் நிலையை வைத்திருக்கவும்."
                    },
                    calfstretch: {
                        name: "கால் நீட்சி",
                        description: "ஒரு சுவரை நோக்கி நிற்கவும், ஒரு காலை முன்னோக்கு வைத்து சுவரில் சாய்ந்து உங்கள் காலை நீட்டவும்."
                    },
                    quadstretch: {
                        name: "நான்கு தலை நீட்சி",
                        description: "ஒரு காலில் நிற்கவும், மற்ற முழங்காலை வளைத்து, உங்கள் குதிகாலை உங்கள் பிட்ட தசைகளுக்கு இழுக்கவும்."
                    },
                    hamstringstretch: {
                        name: "ஹாம்ஸ்ட்ரிங் நீட்சி",
                        description: "ஒரு கால் நீட்டிய நிலையில் உட்கார்ந்து, உங்கள் முதுகை நேராக வைத்து, உங்கள் கால் விரல்களை நோக்கி முன்னோக்கு அடையவும்."
                    },
                    standingquadstretch: {
                        name: "நிற்கும் நான்கு தலை நீட்சி",
                        description: "ஒரு காலில் நிற்கவும், மற்ற முழங்காலை வளைத்து, நிற்கும்போது உங்கள் குதிகாலை உங்கள் பிட்ட தசைகளுக்கு இழுக்கவும்."
                    },
                    hipcirclesseated: {
                        name: "உட்கார்ந்த இடுப்பு வட்டங்கள்",
                        description: "உட்கார்ந்து உங்கள் முழங்கால்களுடன் வட்டங்களை உருவாக்கவும்."
                    },
                    hipabduction: {
                        name: "இடுப்பு வெளிப்புற இயக்கம்",
                        description: "நிற்கவும் மற்றும் ஒரு காலை பக்கவாட்டில் நேராக வைத்து உயர்த்தவும்."
                    },
                    hipadduction: {
                        name: "இடுப்பு உள்புற இயக்கம்",
                        description: "நிற்கவும் மற்றும் ஒரு காலை மற்றொன்றுக்கு முன்னால் குறுக்கே வைத்து, பின்னர் அதை உயர்த்தவும்."
                    },
                    hipbridge: {
                        name: "இடுப்பு பாலம்",
                        description: "முதுகில் படுத்து, உங்கள் முழங்கால்களை வளைத்து, உங்கள் இடுப்புகளை தரையில் இருந்து உயர்த்தவும்."
                    },
                    hipflexorstrengthening: {
                        name: "இடுப்பு வளைவு வலிமை",
                        description: "நிற்கவும் மற்றும் ஒரு முழங்காலை உங்கள் மார்புக்கு நோக்கி உயர்த்தவும், பின்னர் அதை மெதுவாக கீழே இறக்கவும்."
                    },
                    clamshells: {
                        name: "கிளாம்ஷெல்ஸ்",
                        description: "பக்கவாட்டில் படுத்து, முழங்கால்கள் வளைந்தவை. பாதங்களை ஒன்றாக வைத்து மேல் முழங்காலைத் திறக்கவும்."
                    },
                    singlelegglutbridge: {
                        name: "ஒற்றை கால் குளுட் பாலம்",
                        description: "ஒரு கால் நீட்டிய குளுட் பாலம். முதுகெலும்பு சுமை இல்லாமல் குளுட்களை வலுப்படுத்துகிறது."
                    },
                    supinemarching: {
                        name: "படுத்த நிலையில் அணிவகுப்பு",
                        description: "முதுகில் படுத்து, மாற்றி மாற்றி முழங்கால்களை மார்பை நோக்கி உயர்த்தவும். மைய நிலைப்பாட்டை உருவாக்குகிறது."
                    },
                    hipflexoractivation: {
                        name: "இடுப்பு வளைவு செயல்படுத்துதல்",
                        description: "ஐசோமெட்ரிக் வலிமைப்படுத்துதல்: முழங்காலை உயர்த்த முயற்சிக்கும் போது பாதத்தை தரையில் அழுத்தவும்."
                    },
                    singlelegdeadlift: {
                        name: "ஒற்றை கால் டெட்லிப்ட்",
                        description: "ஒரு காலில் நிற்கவும், மற்ற காலை பின்னோக்கு நீட்டிக்கொண்டே இடுப்புகளில் முன்னோக்கு வளைக்கவும்."
                    },
                    // Core & Back Exercises - Batch 2
                    gentletwist: {
                        name: "மென்மையான திருப்பம்",
                        description: "இடுப்பு அகலத்தில் கால்களை வைத்து நிற்கவும், உங்கள் கைகளை இடுப்புகளில் வைத்து, பக்கவாட்டிலிருந்து பக்கவாட்டிற்கு மெதுவாக திருப்பவும்."
                    },
                    plankhold: {
                        name: "பலகை வைத்திருத்தல்",
                        description: "உங்கள் உடலை தலையிலிருந்து குதிகால்கள் வரை நேராக வைத்து பலகை நிலையை வைத்திருக்கவும்."
                    },
                    glutebridgehold: {
                        name: "குளுட் பாலம் வைத்திருத்தல்",
                        description: "முதுகில் படுத்து, உங்கள் இடுப்புகளை உயர்த்தி நிலையை வைத்திருக்கவும்."
                    },
                    backwardneckstretch: {
                        name: "பின்புற கழுத்து நீட்சி",
                        description: "உங்கள் கழுத்தின் முன்புறத்தில் நீட்சியை உணர்ந்து, உங்கள் தலையை மெதுவாக பின்னோக்கு சாய்க்கவும்."
                    },
                    behindbackshoulderstretch: {
                        name: "பின்புற தோள் நீட்சி",
                        description: "ஒரு கையை உங்கள் முதுகுக்கு பின்னால் அடைந்து, மற்ற கையால் அதை மெதுவாக இழுக்கவும்."
                    },
                    lowerbackstretch: {
                        name: "கீழ் முதுகு நீட்சி",
                        description: "முதுகில் படுத்து, உங்கள் முழங்கால்களை மார்புக்கு கொண்டு வந்து, பக்கவாட்டிலிருந்து பக்கவாட்டிற்கு மெதுவாக ஆட்டவும்."
                    },
                    glutebridge: {
                        name: "குளுட் பாலம்",
                        description: "முதுகில் படுத்து, உங்கள் முழங்கால்களை வளைத்து, உங்கள் இடுப்புகளை மேலும் கீழும் உயர்த்தவும்."
                    },
                    lowerbackstrengthening: {
                        name: "கீழ் முதுகு வலிமை",
                        description: "வயிற்றில் படுத்து, உங்கள் மார்பு மற்றும் கால்களை தரையில் இருந்து உயர்த்தவும்."
                    },
                    // Arm & Shoulder Exercises - Batch 2
                    kneetochest: {
                        name: "மார்புக்கு முழங்கால்",
                        description: "முதுகில் படுத்து, ஒரு முழங்காலை மார்புக்கு கொண்டு வந்து நிலையை வைத்திருக்கவும்."
                    },
                    isometricpushup: {
                        name: "ஐசோமெட்ரிக் புஷ்-அப்",
                        description: "உங்கள் உடலை நேராக வைத்து, நகராமல் புஷ்-அப் நிலையை வைத்திருக்கவும்."
                    },
                    crossbodyshoulderstretch: {
                        name: "குறுக்கு உடல் தோள் நீட்சி",
                        description: "ஒரு கையை உங்கள் உடலுக்கு குறுக்கே கொண்டு வந்து, மற்ற கையால் அதை மெதுவாக இழுக்கவும்."
                    },
                    overheadshoulderstretch: {
                        name: "மேலே தோள் நீட்சி",
                        description: "ஒரு கையை மேலே அடைந்து, மற்ற கையால் அதை மெதுவாக இழுக்கவும்."
                    },
                    shoulderexternalrotation: {
                        name: "தோள் வெளிப்புற சுழற்சி",
                        description: "உங்கள் முழங்காலை 90 டிகிரியில் வைத்து, உங்கள் கையை வெளிப்புறமாக சுழற்றவும்."
                    },
                    shoulderinternalrotation: {
                        name: "தோள் உள்புற சுழற்சி",
                        description: "உங்கள் முழங்காலை 90 டிகிரியில் வைத்து, உங்கள் கையை உள்புறமாக சுழற்றவும்."
                    },
                    // Foot & Ankle Exercises
                    wheelpose: {
                        name: "சக்கர நிலை",
                        description: "முதுகில் படுத்து, உங்கள் கைகளை உங்கள் காதுகளுக்கு அருகில் வைத்து, பின்னோக்கு வளைவில் உயர்த்தவும்."
                    },
                    reclinedhandtobigtoe: {
                        name: "பின்புற கை பெரிய விரலுக்கு",
                        description: "முதுகில் படுத்து, உங்கள் கையால் உங்கள் பெரிய கால் விரலை அடையவும்."
                    },
                    toespreads: {
                        name: "விரல் பரவுதல்",
                        description: "உட்கார்ந்து உங்கள் கால் விரல்களை பிரித்து, பின்னர் அவற்றை ஒன்றாக கொண்டு வாருங்கள்."
                    },
                    toecurls: {
                        name: "விரல் சுருட்டுதல்",
                        description: "உட்கார்ந்து உங்கள் கால் விரல்களை கீழே சுருட்டி, பின்னர் அவற்றை நேராக்கவும்."
                    },
                    footmassage: {
                        name: "கால் மசாஜ்",
                        description: "உங்கள் கால்களை மசாஜ் செய்ய உங்கள் கைகளை பயன்படுத்தவும், வளைவுகள் மற்றும் உள்ளங்கால்களில் கவனம் செலுத்தவும்."
                    },
                    ankleflexion: {
                        name: "கணுக்கால் வளைவு",
                        description: "உங்கள் கால் விரல்களை மேலும் கீழும் சுட்டி, உங்கள் கணுக்காலை வளைக்கவும்."
                    },
                    ankleinversion: {
                        name: "கணுக்கால் தலைகீழ்",
                        description: "உங்கள் கணுக்காலை நீட்டுவதற்கு உங்கள் காலை உள்புறமாகவும் வெளிப்புறமாகவும் திருப்பவும்."
                    },
                    heeltotoerocks: {
                        name: "குதிகால் முதல் விரல் வரை ராக்",
                        description: "நிற்கும்போது உங்கள் குதிகால்களிலிருந்து உங்கள் கால் விரல்கள் வரை ராக் செய்யவும்."
                    },
                    lateralfootrocks: {
                        name: "பக்கவாட்டு கால் ராக்",
                        description: "நிற்கும்போது உங்கள் கால்களை பக்கவாட்டிலிருந்து பக்கவாட்டிற்கு ராக் செய்யவும்."
                    },
                    // Hand & Wrist Exercises
                    fingerspreads: {
                        name: "விரல் பரவுதல்",
                        description: "உங்கள் விரல்களை முடிந்தவரை அகலமாக பிரித்து, பின்னர் அவற்றை ஒன்றாக கொண்டு வாருங்கள்."
                    },
                    thumbcircles: {
                        name: "கட்டைவிரல் வட்டங்கள்",
                        description: "இரண்டு திசைகளிலும் உங்கள் கட்டைவிரலுடன் வட்டங்களை உருவாக்கவும்."
                    },
                    fingerbends: {
                        name: "விரல் வளைவுகள்",
                        description: "ஒவ்வொரு விரலையும் தனித்தனியாக வளைத்து, பின்னர் அவற்றை நேராக்கவும்."
                    },
                    wristflexorstretch: {
                        name: "மணிக்கட்டு வளைவு நீட்சி",
                        description: "உங்கள் கையை நீட்டி, உங்கள் மணிக்கட்டு வளைவுகளை நீட்டுவதற்கு உங்கள் கையை பின்னோக்கு இழுக்கவும்."
                    },
                    handmassage: {
                        name: "கை மசாஜ்",
                        description: "உங்கள் உள்ளங்கை, விரல்கள் மற்றும் மணிக்கட்டை மசாஜ் செய்ய உங்கள் மற்ற கையை பயன்படுத்தவும்."
                    },
                    individualfingerlifts: {
                        name: "தனிப்பட்ட விரல் தூக்குதல்",
                        description: "மற்றவற்றை கீழே வைத்திருக்கும்போது ஒவ்வொரு விரலையும் தனித்தனியாக தூக்கவும்."
                    },
                    fingertaps: {
                        name: "விரல் தட்டுதல்",
                        description: "ஒவ்வொரு விரலையும் உங்கள் கட்டைவிரலுடன் வரிசையாக தட்டவும்."
                    },
                    fingerstretches: {
                        name: "விரல் நீட்சிகள்",
                        description: "உங்கள் மற்ற கையால் ஒவ்வொரு விரலையும் மெதுவாக இழுத்து நீட்டவும்."
                    },
                    fingercircles: {
                        name: "விரல் வட்டங்கள்",
                        description: "இரண்டு திசைகளிலும் ஒவ்வொரு விரலுடன் வட்டங்களை உருவாக்கவும்."
                    },
                    pinkytothumb: {
                        name: "சின்ன விரல் கட்டைவிரலுக்கு",
                        description: "உங்கள் சின்ன விரலை உங்கள் கட்டைவிரலுடன் தொடவும், பின்னர் அவற்றை விலக்கவும்."
                    },
                    wristcircles: {
                        name: "மணிக்கட்டு வட்டங்கள்",
                        description: "இரண்டு திசைகளிலும் உங்கள் மணிக்கட்டுகளுடன் வட்டங்களை உருவாக்கவும்."
                    },
                    wristflexion: {
                        name: "மணிக்கட்டு வளைவு",
                        description: "உங்கள் மணிக்கட்டை மேலும் கீழும் வளைக்கவும், பின்னர் பக்கவாட்டிலிருந்து பக்கவாட்டிற்கு."
                    },
                    wristsidetoside: {
                        name: "மணிக்கட்டு பக்கவாட்டு",
                        description: "உங்கள் மணிக்கட்டை பக்கவாட்டிலிருந்து பக்கவாட்டிற்கு நகர்த்தவும்."
                    },
                    wristextensorstretch: {
                        name: "மணிக்கட்டு நீட்டுதல் நீட்சி",
                        description: "உங்கள் கையை நீட்டி, உங்கள் மணிக்கட்டு நீட்டிகளை நீட்டுவதற்கு உங்கள் கையை கீழே இழுக்கவும்."
                    },
                    // Advanced & Yoga Poses
                    pigeonpose: {
                        name: "புறா நிலை",
                        description: "கைகள் மற்றும் முழங்கால்களிலிருந்து, ஒரு முழங்காலை முன்னால் கொண்டு வந்து அதை உங்கள் மணிக்கட்டுக்கு பின்னால் வைக்கவும், மற்ற காலை பின்னால் நீட்டவும்."
                    },
                    lizardpose: {
                        name: "பல்லி நிலை",
                        description: "முன்கைகளை தரையில் வைத்து குறைந்த முன்னேற்ற நிலை."
                    },
                    pyramidpose: {
                        name: "பிரமிட் நிலை",
                        description: "கால்களை அகலமாக பிரித்து நிற்கவும், முன்னோக்கி மடித்து உங்கள் முன் காலை அடைய முயற்சிக்கவும்."
                    },
                    // Isometric & Strength
                    wallsit: {
                        name: "சுவர் உட்காருதல்",
                        description: "உங்கள் முழங்கால்களை 90 டிகிரியில் வைத்து சுவருக்கு எதிராக உட்கார்ந்து நிலையை வைத்திருக்கவும்."
                    },
                    deadbughold: {
                        name: "செத்த பூச்சி வைத்திருத்தல்",
                        description: "முதுகில் படுத்து, உங்கள் கைகள் மற்றும் கால்களை தூக்கி நிலையை வைத்திருக்கவும்."
                    },
                    // Specialized & Other
                    foldedbutterfly: {
                        name: "மடிந்த வண்ணத்துப்பூச்சி",
                        description: "கால்களின் உள்ளங்கால்களை ஒன்றாக வைத்து உட்கார்ந்து, உங்கள் இடுப்பிலிருந்து முன்னோக்கி மடித்து நிலையை வைத்திருக்கவும்."
                    },
                    seatedstraddle: {
                        name: "உட்கார்ந்த பரவுதல்",
                        description: "கால்களை அகலமாக பிரித்து உட்கார்ந்து, முன்னோக்கி மையத்தை நோக்கி அடைய முயற்சிக்கவும், பின்னர் ஒவ்வொரு பக்கமும்."
                    },
                    scorpionprep: {
                        name: "தேள் தயாரிப்பு",
                        description: "வயிற்றில் படுத்து, பின்னோக்கி சென்று உங்கள் கால்களை பிடித்து, உங்கள் மார்பு மற்றும் கால்களை தரையிலிருந்து தூக்கவும்."
                    },
                    figurestretch: {
                        name: "படம் 4 நீட்சி",
                        description: "உட்கார்ந்து எதிர் முழங்காலில் கணுக்காலை வைத்து, முன்னோக்கி சாயவும்."
                    },
                    standingforwardfold: {
                        name: "நிற்கும் முன்னோக்கு மடிப்பு",
                        description: "கால்களை இடுப்பு அகலத்தில் பிரித்து நிற்கவும் மற்றும் உங்கள் இடுப்பிலிருந்து முன்னோக்கி மடிக்கவும்."
                    },
                    standingsplit: {
                        name: "நிற்கும் பிரிப்பு",
                        description: "ஒரு காலில் நிற்கவும் மற்றும் மற்ற காலை உங்கள் பின்னால் முடிந்தவரை உயரமாக தூக்கவும்."
                    },
                    pelvictilts: {
                        name: "இடுப்பு சாய்வு",
                        description: "முதுகில் படுத்து உங்கள் இடுப்பை மெதுவாக மேலும் கீழும் ராக் செய்யவும்."
                    },
                    achillesstretch: {
                        name: "அகிலிஸ் நீட்சி",
                        description: "சுவரை நோக்கி நிற்கவும், ஒரு காலை பின்னால் வைக்கவும், உங்கள் அகிலிஸ் தசைநாணை நீட்டுவதற்கு முன்னோக்கி சாயவும்."
                    },
                    kneecircles: {
                        name: "முழங்கால் வட்டங்கள்",
                        description: "உட்கார்ந்து இரண்டு திசைகளிலும் உங்கள் முழங்கால்களுடன் வட்டங்களை உருவாக்கவும்."
                    },
                    seatedkneeextensions: {
                        name: "உட்கார்ந்த முழங்கால் நீட்டுதல்",
                        description: "உட்கார்ந்து ஒரு காலை நேராக நீட்டவும், பின்னர் அதை மீண்டும் வளைக்கவும்."
                    },
                    itbandstretch: {
                        name: "IT பேண்ட் நீட்சி",
                        description: "நிற்கவும் மற்றும் ஒரு காலை மற்றொன்றுக்கு பின்னால் கடக்கவும், பின்னர் பக்கவாட்டிற்கு சாயவும்."
                    },
                    kneehugs: {
                        name: "முழங்கால் கட்டிப்பிடித்தல்",
                        description: "நிற்கவும் மற்றும் ஒரு முழங்காலை உங்கள் மார்புக்கு கட்டிப்பிடிக்கவும், பின்னர் கால்களை மாற்றவும்."
                    },
                    fisttoopen: {
                        name: "முஷ்டி திறப்பு",
                        description: "ஒரு முஷ்டியை உருவாக்கவும், பின்னர் உங்கள் கையை அகலமாக திறந்து உங்கள் விரல்களை பரவவும்."
                    },
                    prayerstretch: {
                        name: "பிரார்த்தனை நீட்சி",
                        description: "உங்கள் மார்புக்கு முன்னால் உங்கள் உள்ளங்கைகளை ஒன்றாக அழுத்தி வைத்திருக்கவும்."
                    },
                    spidercrawl: {
                        name: "சிலந்தி ஊர்தல்",
                        description: "ஒரு சிலந்தி ஊர்வது போல உங்கள் விரல்களை மேலும் கீழும் நடக்கவும்."
                    },
                    reverseprayer: {
                        name: "தலைகீழ் பிரார்த்தனை",
                        description: "உங்கள் முதுகுக்கு பின்னால் உங்கள் உள்ளங்கைகளை ஒன்றாக அழுத்தி வைத்திருக்கவும்."
                    },
                    soleusstretch: {
                        name: "சோலியஸ் நீட்சி",
                        description: "ஒரு காலை முன்னால் வைத்து நிற்கவும், உங்கள் சோலியஸ் தசையை நீட்டுவதற்கு இரண்டு முழங்கால்களையும் வளைக்கவும்."
                    },
                    wallslides: {
                        name: "சுவர் சரிதல்",
                        description: "சுவருக்கு எதிராக நிற்கவும் மற்றும் உங்கள் கைகளை மேலும் கீழும் சரியவும்."
                    },
                    scapularwallslides: {
                        name: "தோள்பட்டை சுவர் சரிதல்",
                        description: "சுவருக்கு எதிராக நிற்கவும் மற்றும் உங்கள் தோள்பட்டைகளை மேலும் கீழும் சரியவும்."
                    },
                    romaniandeadlift: {
                        name: "ரோமானியன் டெட்லிப்ட்",
                        description: "சிறிது முழங்கால் வளைவுடன் நிற்கவும், உங்கள் முதுகை நேராக வைத்திருக்கும்போது இடுப்பில் கீல் செய்யவும்."
                    },
                    // Neck & Head Exercises
                    headstandprep: {
                        name: "தலை நிற்கும் தயாரிப்பு",
                        description: "உங்கள் தலையை தரையில் வைத்து உங்கள் இடுப்புகளை தூக்குவதன் மூலம் தலை நிற்கும் தயாரிப்பை பயிற்சி செய்யவும்."
                    },
                    diagonalneckstretch: {
                        name: "மூலைவிட்ட கழுத்து நீட்சி",
                        description: "உங்கள் கழுத்தின் பக்கத்தை நீட்டுவதற்கு உங்கள் தலையை மெதுவாக மூலைவிட்டமாக சாயக்கவும்."
                    }
                },
                accessibility: {
                    toggleDarkMode: "இருண்ட பயன்முறையை மாற்றவும்",
                    languageSelector: "மொழியைத் தேர்ந்தெடுக்கவும்",
                    startPauseTimer: "பயிற்சி டைமரைத் தொடங்கவும் அல்லது இடைநிறுத்தவும்",
                    nextExercise: "அடுத்த பயிற்சி",
                    previousExercise: "முந்தைய பயிற்சி",
                    backToRoutines: "வழக்கங்கள் தேர்வுக்குத் திரும்பவும்",
                    shareApp: "Tend பயன்பாட்டைப் பகிரவும்"
                },
                share: {
                    shareWithFriend: "ஒரு நண்பருடன் பகிரவும்"
                },
                editorial: {
                    createdBy: "உருவாக்கியவர்",
                    inYear: "2025 இல்",
                    shareMessage: "தயவுசெய்து குடும்பத்தினர், நண்பர்கள் மற்றும் சக ஊழியர்களுடன் பகிரவும்",
                    businessInquiries: "வணிக விசாரணைகளுக்கு:"
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
window.i18n = new TendI18n();

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
    module.exports = TendI18n;
}
