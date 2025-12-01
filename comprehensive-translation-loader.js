// Comprehensive Translation Loader
// Loads all translation files and provides complete multilingual support

class ComprehensiveTranslationLoader {
    constructor() {
        this.translations = {
            en: {},
            de: {},
            es: {},
            ta: {}
        };
        this.isLoaded = false;
        this.loadingPromises = new Map();
    }

    // Load all translation files
    async loadAllTranslations() {
        console.log('🌍 Loading comprehensive translations...');
        
        try {
            // Load main translation files
            await Promise.all([
                this.loadTranslationFile('en'),
                this.loadTranslationFile('de'),
                this.loadTranslationFile('es'),
                this.loadTranslationFile('ta')
            ]);

            // Load exercise-specific translations
            await this.loadExerciseTranslations();

            // Load routine-specific translations
            await this.loadRoutineTranslations();

            // Load folder-specific translations
            await this.loadFolderTranslations();

            this.isLoaded = true;
            console.log('✅ All translations loaded successfully');
            console.log(`📊 Loaded translations for: ${Object.keys(this.translations).join(', ')}`);
            
            return this.translations;
            
        } catch (error) {
            console.error('❌ Failed to load translations:', error);
            throw error;
        }
    }

    // Load a specific translation file
    async loadTranslationFile(language) {
        if (this.loadingPromises.has(language)) {
            return this.loadingPromises.get(language);
        }

        const loadPromise = this._fetchTranslationFile(language);
        this.loadingPromises.set(language, loadPromise);

        try {
            const translation = await loadPromise;
            this.translations[language] = translation;
            this.loadingPromises.delete(language);
            console.log(`✅ Loaded ${language} translations`);
            return translation;
        } catch (error) {
            this.loadingPromises.delete(language);
            console.warn(`⚠️ Could not load ${language} translations:`, error.message);
            // Use fallback
            this.translations[language] = this.getFallbackTranslations(language);
            return this.translations[language];
        }
    }

    // Internal method to fetch translation file
    async _fetchTranslationFile(language) {
        const response = await fetch(`./translations/${language}.json`);
        if (!response.ok) {
            throw new Error(`Translation file for ${language} not found`);
        }
        return await response.json();
    }

    // Load exercise-specific translations
    async loadExerciseTranslations() {
        console.log('🔍 Loading exercise translations...');
        
        const exerciseCategories = ['neck-shoulders'];
        const exerciseIds = ['neck-rolls', 'shoulder-shrugs', 'side-neck-stretch', 'forward-neck-stretch', 'arm-circles'];
        
        for (const category of exerciseCategories) {
            for (const exerciseId of exerciseIds) {
                try {
                    const response = await fetch(`./data/exercises/${category}/${exerciseId}.json`);
                    if (response.ok) {
                        const exercise = await response.json();
                        
                        // Merge exercise translations into main translations
                        for (const [lang, translation] of Object.entries(exercise.translations || {})) {
                            if (!this.translations[lang].exercises) {
                                this.translations[lang].exercises = {};
                            }
                            this.translations[lang].exercises[exerciseId] = translation;
                        }
                    }
                } catch (error) {
                    console.warn(`Could not load exercise ${exerciseId}:`, error.message);
                }
            }
        }
    }

    // Load routine-specific translations
    async loadRoutineTranslations() {
        console.log('🔍 Loading routine translations...');
        
        const routineIds = ['wake-up', 'wake-up-complete'];
        
        for (const routineId of routineIds) {
            try {
                const response = await fetch(`./data/routines/${routineId}.json`);
                if (response.ok) {
                    const routine = await response.json();
                    
                    // Merge routine translations into main translations
                    for (const [lang, translation] of Object.entries(routine.translations || {})) {
                        if (!this.translations[lang].routines) {
                            this.translations[lang].routines = {};
                        }
                        this.translations[lang].routines[routineId] = translation;
                    }
                }
            } catch (error) {
                console.warn(`Could not load routine ${routineId}:`, error.message);
            }
        }
    }

    // Load folder-specific translations
    async loadFolderTranslations() {
        console.log('🔍 Loading folder translations...');
        
        const folderIds = ['neck-shoulders', 'neck-shoulders-complete'];
        
        for (const folderId of folderIds) {
            try {
                const response = await fetch(`./data/folders/${folderId}.json`);
                if (response.ok) {
                    const folder = await response.json();
                    
                    // Merge folder translations into main translations
                    for (const [lang, translation] of Object.entries(folder.translations || {})) {
                        if (!this.translations[lang].folders) {
                            this.translations[lang].folders = {};
                        }
                        this.translations[lang].folders[folderId] = translation;
                    }
                }
            } catch (error) {
                console.warn(`Could not load folder ${folderId}:`, error.message);
            }
        }
    }

    // Get translation for a key
    getTranslation(key, language = 'en', params = {}) {
        if (!this.isLoaded) {
            console.warn('Translations not loaded yet');
            return key;
        }

        const translation = this.getNestedValue(this.translations[language], key) ||
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
        if (typeof str !== 'string') return str;
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
    }

    // Get all available languages
    getAvailableLanguages() {
        return [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'es', name: 'Español', flag: '🇪🇸' },
            { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
        ];
    }

    // Get fallback translations for a language
    getFallbackTranslations(language) {
        const fallbacks = {
            en: {
                app: { title: "Bend", subtitle: "Stretching & Flexibility" },
                navigation: { back: "Back", next: "Next", start: "Start" },
                timer: { switchSides: "Switch sides" }
            },
            de: {
                app: { title: "Bend", subtitle: "Dehnung & Flexibilität" },
                navigation: { back: "Zurück", next: "Weiter", start: "Start" },
                timer: { switchSides: "Seite wechseln" }
            },
            es: {
                app: { title: "Bend", subtitle: "Estiramiento y Flexibilidad" },
                navigation: { back: "Atrás", next: "Siguiente", start: "Comenzar" },
                timer: { switchSides: "Cambia de lado" }
            },
            ta: {
                app: { title: "Bend", subtitle: "நீட்சி மற்றும் நெகிழ்வு" },
                navigation: { back: "பின்", next: "அடுத்து", start: "தொடங்கு" },
                timer: { switchSides: "பக்கங்களை மாற்றவும்" }
            }
        };

        return fallbacks[language] || fallbacks.en;
    }

    // Get translation statistics
    getTranslationStats() {
        const stats = {};
        
        for (const [lang, translations] of Object.entries(this.translations)) {
            stats[lang] = {
                totalKeys: this.countKeys(translations),
                exercises: translations.exercises ? Object.keys(translations.exercises).length : 0,
                routines: translations.routines ? Object.keys(translations.routines).length : 0,
                folders: translations.folders ? Object.keys(translations.folders).length : 0
            };
        }
        
        return stats;
    }

    // Count total keys in an object
    countKeys(obj, prefix = '') {
        let count = 0;
        
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === 'object' && value !== null) {
                count += this.countKeys(value, fullKey);
            } else {
                count++;
            }
        }
        
        return count;
    }

    // Export all translations
    exportTranslations() {
        return {
            translations: this.translations,
            stats: this.getTranslationStats(),
            isLoaded: this.isLoaded
        };
    }
}

// Initialize global comprehensive translation loader
window.comprehensiveTranslationLoader = new ComprehensiveTranslationLoader();

// Auto-load translations when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await window.comprehensiveTranslationLoader.loadAllTranslations();
        console.log('🎉 Comprehensive translations ready!');
        
        // Dispatch event when translations are loaded
        document.dispatchEvent(new CustomEvent('translationsLoaded', {
            detail: { loader: window.comprehensiveTranslationLoader }
        }));
        
    } catch (error) {
        console.error('Failed to load comprehensive translations:', error);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComprehensiveTranslationLoader;
}
