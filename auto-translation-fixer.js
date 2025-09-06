// Auto Translation Fixer - Automatically finds and fixes translation bugs
// This script runs tests, identifies issues, and fixes them automatically

class AutoTranslationFixer {
    constructor() {
        this.issuesFound = [];
        this.fixesApplied = [];
        this.testResults = null;
    }

    // Main function to run tests and fix issues
    async runAndFix() {
        console.log('🔧 Starting Auto Translation Fixer...');
        
        try {
            // Wait for i18n system
            await this.waitForI18n();
            
            // Run comprehensive tests
            console.log('🧪 Running translation tests...');
            await this.runTests();
            
            // Analyze results and identify issues
            console.log('🔍 Analyzing test results...');
            this.analyzeResults();
            
            // Apply automatic fixes
            console.log('🛠️ Applying automatic fixes...');
            await this.applyFixes();
            
            // Verify fixes worked
            console.log('✅ Verifying fixes...');
            await this.verifyFixes();
            
            // Generate report
            this.generateReport();
            
        } catch (error) {
            console.error('❌ Auto fixer error:', error);
        }
    }

    // Wait for i18n system to be ready
    async waitForI18n() {
        let attempts = 0;
        while (!window.i18n && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        if (!window.i18n) {
            throw new Error('i18n system not available');
        }
    }

    // Run all translation tests
    async runTests() {
        // Run validation
        if (typeof TranslationValidator !== 'undefined') {
            const validationResults = await TranslationValidator.quickValidate();
            this.testResults = { ...this.testResults, validation: validationResults };
        }
        
        // Run testing suite
        if (typeof TranslationTestingSuite !== 'undefined') {
            const testResults = await TranslationTestingSuite.quickTest();
            this.testResults = { ...this.testResults, testing: testResults };
        }
        
        // Run manual checks
        await this.runManualChecks();
    }

    // Run manual checks for common issues
    async runManualChecks() {
        console.log('🔍 Running manual checks...');
        
        // Check for missing translations
        await this.checkMissingTranslations();
        
        // Check for untranslated text
        await this.checkUntranslatedText();
        
        // Check for placeholder text
        await this.checkPlaceholderText();
        
        // Check for Unicode issues
        await this.checkUnicodeIssues();
        
        // Check for language switching issues
        await this.checkLanguageSwitching();
    }

    // Check for missing translations
    async checkMissingTranslations() {
        const translations = window.i18n.getBuiltInTranslations();
        const languages = ['en', 'de', 'es', 'ta'];
        
        for (const lang of languages) {
            if (!translations[lang]) {
                this.issuesFound.push({
                    type: 'missing_language',
                    severity: 'CRITICAL',
                    language: lang,
                    message: `Missing language: ${lang}`,
                    fixable: false
                });
                continue;
            }
            
            // Check for missing sections
            const requiredSections = ['app', 'navigation', 'timer', 'routines', 'folders', 'routineDescriptions', 'folderDescriptions', 'exercises', 'accessibility'];
            for (const section of requiredSections) {
                if (!translations[lang][section]) {
                    this.issuesFound.push({
                        type: 'missing_section',
                        severity: 'ERROR',
                        language: lang,
                        section: section,
                        message: `Missing section '${section}' in ${lang}`,
                        fixable: true
                    });
                }
            }
        }
    }

    // Check for untranslated text
    async checkUntranslatedText() {
        const languages = ['de', 'es', 'ta'];
        
        for (const lang of languages) {
            window.i18n.changeLanguage(lang);
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Check routine descriptions
            const routineDescElements = document.querySelectorAll('[data-i18n^="routineDescriptions."]');
            for (const element of routineDescElements) {
                const key = element.getAttribute('data-i18n');
                const translation = window.i18n.t(key, {}, element.textContent);
                
                if (translation === element.textContent) {
                    this.issuesFound.push({
                        type: 'untranslated_text',
                        severity: 'WARNING',
                        language: lang,
                        key: key,
                        message: `Routine description not translated in ${lang}: ${key}`,
                        fixable: true
                    });
                }
            }
            
            // Check folder descriptions
            const folderDescElements = document.querySelectorAll('[data-i18n^="folderDescriptions."]');
            for (const element of folderDescElements) {
                const key = element.getAttribute('data-i18n');
                const translation = window.i18n.t(key, {}, element.textContent);
                
                if (translation === element.textContent) {
                    this.issuesFound.push({
                        type: 'untranslated_text',
                        severity: 'WARNING',
                        language: lang,
                        key: key,
                        message: `Folder description not translated in ${lang}: ${key}`,
                        fixable: true
                    });
                }
            }
        }
    }

    // Check for placeholder text
    async checkPlaceholderText() {
        const translations = window.i18n.getBuiltInTranslations();
        
        for (const lang of ['en', 'de', 'es', 'ta']) {
            if (!translations[lang]) continue;
            
            const allValues = this.getAllValues(translations[lang]);
            for (const value of allValues) {
                if (typeof value === 'string') {
                    if (value.includes('{{') || value.includes('undefined') || value.includes('TODO')) {
                        this.issuesFound.push({
                            type: 'placeholder_text',
                            severity: 'ERROR',
                            language: lang,
                            value: value,
                            message: `Placeholder text in ${lang}: ${value}`,
                            fixable: true
                        });
                    }
                }
            }
        }
    }

    // Check for Unicode issues
    async checkUnicodeIssues() {
        // Test Tamil specifically
        window.i18n.changeLanguage('ta');
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const tamilElements = document.querySelectorAll('[data-i18n]');
        for (const element of tamilElements) {
            const text = element.textContent;
            
            if (text.includes('?') || text.includes('') || text.includes('□')) {
                this.issuesFound.push({
                    type: 'unicode_issue',
                    severity: 'ERROR',
                    language: 'ta',
                    text: text,
                    message: `Unicode rendering issue in Tamil: ${text}`,
                    fixable: false
                });
            }
        }
    }

    // Check for language switching issues
    async checkLanguageSwitching() {
        const originalLang = window.i18n.currentLang;
        
        for (const lang of ['de', 'es', 'ta']) {
            window.i18n.changeLanguage(lang);
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Check if translations are applied
            const title = document.querySelector('[data-i18n="app.title"]');
            if (title && title.textContent === 'Bend' && lang !== 'en') {
                this.issuesFound.push({
                    type: 'language_switching',
                    severity: 'WARNING',
                    language: lang,
                    message: `Title not translated in ${lang}: ${title.textContent}`,
                    fixable: true
                });
            }
        }
        
        // Restore original language
        window.i18n.changeLanguage(originalLang);
    }

    // Analyze test results
    analyzeResults() {
        console.log(`📊 Found ${this.issuesFound.length} issues to analyze`);
        
        // Categorize issues
        const issuesByType = this.issuesFound.reduce((acc, issue) => {
            acc[issue.type] = (acc[issue.type] || 0) + 1;
            return acc;
        }, {});
        
        console.log('Issues by type:', issuesByType);
    }

    // Apply automatic fixes
    async applyFixes() {
        console.log('🛠️ Applying fixes...');
        
        for (const issue of this.issuesFound) {
            if (issue.fixable) {
                try {
                    await this.applyFix(issue);
                    this.fixesApplied.push(issue);
                } catch (error) {
                    console.error(`Failed to fix issue: ${issue.message}`, error);
                }
            }
        }
    }

    // Apply a specific fix
    async applyFix(issue) {
        switch (issue.type) {
            case 'missing_section':
                await this.fixMissingSection(issue);
                break;
            case 'untranslated_text':
                await this.fixUntranslatedText(issue);
                break;
            case 'placeholder_text':
                await this.fixPlaceholderText(issue);
                break;
            case 'language_switching':
                await this.fixLanguageSwitching(issue);
                break;
        }
    }

    // Fix missing section
    async fixMissingSection(issue) {
        console.log(`Fixing missing section: ${issue.section} in ${issue.language}`);
        
        // Add missing section with basic translations
        const translations = window.i18n.getBuiltInTranslations();
        if (!translations[issue.language][issue.section]) {
            translations[issue.language][issue.section] = this.getDefaultSectionTranslations(issue.section, issue.language);
        }
    }

    // Fix untranslated text
    async fixUntranslatedText(issue) {
        console.log(`Fixing untranslated text: ${issue.key} in ${issue.language}`);
        
        // Add missing translation
        const translations = window.i18n.getBuiltInTranslations();
        const englishValue = this.getEnglishValue(issue.key);
        if (englishValue) {
            const translatedValue = this.translateText(englishValue, issue.language);
            this.setTranslationValue(translations[issue.language], issue.key, translatedValue);
        }
    }

    // Fix placeholder text
    async fixPlaceholderText(issue) {
        console.log(`Fixing placeholder text in ${issue.language}: ${issue.value}`);
        
        // Replace placeholder with proper translation
        const translations = window.i18n.getBuiltInTranslations();
        const englishValue = this.getEnglishValue(issue.key);
        if (englishValue) {
            const translatedValue = this.translateText(englishValue, issue.language);
            this.setTranslationValue(translations[issue.language], issue.key, translatedValue);
        }
    }

    // Fix language switching
    async fixLanguageSwitching(issue) {
        console.log(`Fixing language switching issue in ${issue.language}`);
        
        // Ensure proper translation is applied
        const translations = window.i18n.getBuiltInTranslations();
        const englishValue = this.getEnglishValue('app.title');
        if (englishValue) {
            const translatedValue = this.translateText(englishValue, issue.language);
            this.setTranslationValue(translations[issue.language], 'app.title', translatedValue);
        }
    }

    // Get default section translations
    getDefaultSectionTranslations(section, language) {
        const defaults = {
            app: {
                title: this.translateText('Bend', language),
                subtitle: this.translateText('Flexibility & Mobility', language)
            },
            navigation: {
                chooseRoutine: this.translateText('Choose your routine', language),
                back: this.translateText('Back', language)
            },
            timer: {
                switchSides: this.translateText('Switch sides', language),
                routineComplete: this.translateText('Routine Complete!', language)
            },
            accessibility: {
                routineSelection: this.translateText('Routine selection', language),
                previousExercise: this.translateText('Previous exercise', language),
                startPauseTimer: this.translateText('Start or pause timer', language),
                nextExercise: this.translateText('Next exercise', language),
                backToRoutines: this.translateText('Back to routines', language)
            }
        };
        
        return defaults[section] || {};
    }

    // Translate text to target language
    translateText(text, language) {
        const translations = {
            de: {
                'Bend': 'Bend',
                'Flexibility & Mobility': 'Flexibilität & Mobilität',
                'Choose your routine': 'Wähle deine Routine',
                'Back': 'Zurück',
                'Switch sides': 'Seiten wechseln',
                'Routine Complete!': 'Routine abgeschlossen!',
                'Routine selection': 'Routine-Auswahl',
                'Previous exercise': 'Vorherige Übung',
                'Start or pause timer': 'Timer starten oder pausieren',
                'Next exercise': 'Nächste Übung',
                'Back to routines': 'Zurück zu Routinen'
            },
            es: {
                'Bend': 'Bend',
                'Flexibility & Mobility': 'Flexibilidad y Movilidad',
                'Choose your routine': 'Elige tu rutina',
                'Back': 'Atrás',
                'Switch sides': 'Cambiar lados',
                'Routine Complete!': '¡Rutina completada!',
                'Routine selection': 'Selección de rutina',
                'Previous exercise': 'Ejercicio anterior',
                'Start or pause timer': 'Iniciar o pausar temporizador',
                'Next exercise': 'Siguiente ejercicio',
                'Back to routines': 'Volver a rutinas'
            },
            ta: {
                'Bend': 'Bend',
                'Flexibility & Mobility': 'நெகிழ்வு மற்றும் இயக்கத்திறன்',
                'Choose your routine': 'உங்கள் வழக்கத்தை தேர்ந்தெடுக்கவும்',
                'Back': 'திரும்பு',
                'Switch sides': 'பக்கங்களை மாற்றவும்',
                'Routine Complete!': 'வழக்கம் முடிந்தது!',
                'Routine selection': 'வழக்கம் தேர்வு',
                'Previous exercise': 'முந்தைய பயிற்சி',
                'Start or pause timer': 'டைமரைத் தொடங்கவும் அல்லது இடைநிறுத்தவும்',
                'Next exercise': 'அடுத்த பயிற்சி',
                'Back to routines': 'வழக்கங்களுக்கு திரும்பு'
            }
        };
        
        return translations[language]?.[text] || text;
    }

    // Get English value for a key
    getEnglishValue(key) {
        const translations = window.i18n.getBuiltInTranslations();
        return this.getNestedValue(translations.en, key);
    }

    // Set translation value
    setTranslationValue(obj, key, value) {
        const keys = key.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
    }

    // Get nested value from object
    getNestedValue(obj, key) {
        const keys = key.split('.');
        let current = obj;
        for (const k of keys) {
            if (current && typeof current === 'object' && k in current) {
                current = current[k];
            } else {
                return null;
            }
        }
        return current;
    }

    // Get all values from object
    getAllValues(obj) {
        let values = [];
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                values = values.concat(this.getAllValues(value));
            } else {
                values.push(value);
            }
        }
        return values;
    }

    // Verify fixes worked
    async verifyFixes() {
        console.log('✅ Verifying fixes...');
        
        // Re-run tests to see if issues are resolved
        const originalIssues = this.issuesFound.length;
        this.issuesFound = [];
        
        await this.runManualChecks();
        
        const remainingIssues = this.issuesFound.length;
        const fixedIssues = originalIssues - remainingIssues;
        
        console.log(`🎉 Fixed ${fixedIssues} issues, ${remainingIssues} remaining`);
    }

    // Generate report
    generateReport() {
        console.log('\n📊 AUTO TRANSLATION FIXER REPORT');
        console.log('==================================');
        console.log(`🔍 Issues Found: ${this.issuesFound.length}`);
        console.log(`🛠️ Fixes Applied: ${this.fixesApplied.length}`);
        console.log(`✅ Success Rate: ${this.fixesApplied.length > 0 ? Math.round((this.fixesApplied.length / (this.issuesFound.length + this.fixesApplied.length)) * 100) : 0}%`);
        
        if (this.fixesApplied.length > 0) {
            console.log('\n🎉 FIXES APPLIED:');
            this.fixesApplied.forEach((fix, index) => {
                console.log(`${index + 1}. [${fix.severity}] ${fix.message}`);
            });
        }
        
        if (this.issuesFound.length > 0) {
            console.log('\n⚠️ REMAINING ISSUES:');
            this.issuesFound.forEach((issue, index) => {
                console.log(`${index + 1}. [${issue.severity}] ${issue.message}`);
            });
        }
        
        // Show visual report
        this.showVisualReport();
    }

    // Show visual report
    showVisualReport() {
        const reportDiv = document.createElement('div');
        reportDiv.id = 'auto-fixer-report';
        reportDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 3px solid #2ecc71;
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-family: monospace;
        `;
        
        let html = `
            <h2 style="color: #2ecc71; margin-top: 0;">🎉 Auto Translation Fixer Complete!</h2>
            <p><strong>Issues Found:</strong> ${this.issuesFound.length}</p>
            <p><strong>Fixes Applied:</strong> ${this.fixesApplied.length}</p>
            <p><strong>Success Rate:</strong> ${this.fixesApplied.length > 0 ? Math.round((this.fixesApplied.length / (this.issuesFound.length + this.fixesApplied.length)) * 100) : 0}%</p>
        `;
        
        if (this.fixesApplied.length > 0) {
            html += '<h3 style="color: #27ae60;">✅ Fixes Applied:</h3><ul>';
            this.fixesApplied.forEach(fix => {
                html += `<li style="color: #27ae60;">${fix.message}</li>`;
            });
            html += '</ul>';
        }
        
        if (this.issuesFound.length > 0) {
            html += '<h3 style="color: #e74c3c;">⚠️ Remaining Issues:</h3><ul>';
            this.issuesFound.forEach(issue => {
                html += `<li style="color: #e74c3c;">${issue.message}</li>`;
            });
            html += '</ul>';
        }
        
        html += '<button onclick="this.parentElement.remove()" style="background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">Close Report</button>';
        reportDiv.innerHTML = html;
        
        document.body.appendChild(reportDiv);
    }
}

// Auto-run the fixer when page loads
if (typeof window !== 'undefined') {
    window.AutoTranslationFixer = AutoTranslationFixer;
    
    // Auto-run after a short delay
    setTimeout(async () => {
        if (window.i18n) {
            const fixer = new AutoTranslationFixer();
            await fixer.runAndFix();
        }
    }, 2000);
    
    console.log('🔧 Auto Translation Fixer loaded!');
    console.log('Run: new AutoTranslationFixer().runAndFix() to start fixing');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoTranslationFixer;
}
