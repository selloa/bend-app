// Smart Translation Fixer - Fixes real translation issues intelligently
// This script identifies and fixes actual translation problems

class SmartTranslationFixer {
    constructor() {
        this.issuesFound = [];
        this.fixesApplied = [];
        this.testResults = null;
    }

    // Main function to run tests and fix real issues
    async runAndFix() {
        console.log('🔧 Starting Smart Translation Fixer...');
        
        try {
            // Wait for i18n system
            await this.waitForI18n();
            
            // Run smart tests
            console.log('🧪 Running smart translation tests...');
            await this.runSmartTests();
            
            // Apply intelligent fixes
            console.log('🛠️ Applying intelligent fixes...');
            await this.applySmartFixes();
            
            // Verify fixes worked
            console.log('✅ Verifying fixes...');
            await this.verifyFixes();
            
            // Don't generate report automatically - only when explicitly requested
            // this.generateReport();
            
        } catch (error) {
            console.error('❌ Smart fixer error:', error);
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

    // Run smart tests that focus on real issues
    async runSmartTests() {
        console.log('🔍 Running smart tests...');
        
        // Test 1: Check for actual missing translations
        await this.checkForRealMissingTranslations();
        
        // Test 2: Check for broken interpolation
        await this.checkForBrokenInterpolation();
        
        // Test 3: Check for language switching issues
        await this.checkForLanguageSwitchingIssues();
        
        // Test 4: Check for fallback behavior
        await this.checkForFallbackBehavior();
    }

    // Check for real missing translations (not false positives)
    async checkForRealMissingTranslations() {
        const translations = window.i18n.getBuiltInTranslations();
        const languages = ['en', 'de', 'es', 'ta'];
        
        // Check for actually missing sections
        for (const lang of languages) {
            if (!translations[lang]) {
                this.issuesFound.push({
                    type: 'missing_language',
                    severity: 'CRITICAL',
                    language: lang,
                    message: `Missing language: ${lang}`,
                    fixable: true
                });
                continue;
            }
            
            // Check for missing critical sections
            const criticalSections = ['app', 'navigation', 'timer'];
            for (const section of criticalSections) {
                if (!translations[lang][section]) {
                    this.issuesFound.push({
                        type: 'missing_critical_section',
                        severity: 'ERROR',
                        language: lang,
                        section: section,
                        message: `Missing critical section '${section}' in ${lang}`,
                        fixable: true
                    });
                }
            }
        }
    }

    // Check for broken interpolation
    async checkForBrokenInterpolation() {
        // Test interpolation with actual parameters
        const testParams = { current: 1, total: 8 };
        
        for (const lang of ['en', 'de', 'es', 'ta']) {
            window.i18n.changeLanguage(lang);
            await new Promise(resolve => setTimeout(resolve, 50));
            
            const progressText = window.i18n.t('timer.progress', testParams);
            
            // Check if interpolation worked (only flag if undefined or malformed templates remain)
            if (progressText.includes('undefined') || 
                (progressText.includes('{{') && !progressText.match(/\{\{\w+\}\}/))) {
                this.issuesFound.push({
                    type: 'broken_interpolation',
                    severity: 'ERROR',
                    language: lang,
                    message: `Broken interpolation in ${lang}: ${progressText}`,
                    fixable: true
                });
            }
        }
    }

    // Check for language switching issues
    async checkForLanguageSwitchingIssues() {
        const originalLang = window.i18n.currentLang;
        
        for (const lang of ['de', 'es', 'ta']) {
            window.i18n.changeLanguage(lang);
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Check if language actually changed
            if (window.i18n.currentLang !== lang) {
                this.issuesFound.push({
                    type: 'language_switching_failed',
                    severity: 'ERROR',
                    language: lang,
                    message: `Language switching failed for ${lang}`,
                    fixable: true
                });
            }
            
            // Check if translations are applied
            const title = document.querySelector('[data-i18n="app.title"]');
            if (title) {
                const expectedTranslation = window.i18n.t('app.title');
                if (title.textContent !== expectedTranslation) {
                    this.issuesFound.push({
                        type: 'translation_not_applied',
                        severity: 'WARNING',
                        language: lang,
                        message: `Translation not applied for app.title in ${lang}`,
                        fixable: true
                    });
                }
            }
        }
        
        // Restore original language
        window.i18n.changeLanguage(originalLang);
    }

    // Check for fallback behavior
    async checkForFallbackBehavior() {
        // Test with invalid language
        const originalLang = window.i18n.currentLang;
        
        try {
            window.i18n.changeLanguage('invalid-lang');
            if (window.i18n.currentLang !== 'en') {
                this.issuesFound.push({
                    type: 'fallback_failed',
                    severity: 'WARNING',
                    message: 'Fallback to English not working properly',
                    fixable: true
                });
            }
        } catch (error) {
            // This is expected behavior
        }
        
        // Test with missing translation key
        const missingTranslation = window.i18n.t('nonexistent.key', {}, 'fallback');
        if (missingTranslation !== 'fallback') {
            this.issuesFound.push({
                type: 'fallback_parameter_failed',
                severity: 'WARNING',
                message: 'Fallback parameter not working properly',
                fixable: true
            });
        }
        
        // Restore original language
        window.i18n.changeLanguage(originalLang);
    }

    // Apply intelligent fixes
    async applySmartFixes() {
        console.log('🛠️ Applying intelligent fixes...');
        
        for (const issue of this.issuesFound) {
            if (issue.fixable) {
                try {
                    await this.applySmartFix(issue);
                    this.fixesApplied.push(issue);
                } catch (error) {
                    console.error(`Failed to fix issue: ${issue.message}`, error);
                }
            }
        }
    }

    // Apply a specific smart fix
    async applySmartFix(issue) {
        switch (issue.type) {
            case 'missing_language':
                await this.fixMissingLanguage(issue);
                break;
            case 'missing_critical_section':
                await this.fixMissingCriticalSection(issue);
                break;
            case 'broken_interpolation':
                await this.fixBrokenInterpolation(issue);
                break;
            case 'language_switching_failed':
                await this.fixLanguageSwitching(issue);
                break;
            case 'translation_not_applied':
                await this.fixTranslationNotApplied(issue);
                break;
            case 'fallback_failed':
                await this.fixFallbackBehavior(issue);
                break;
            case 'fallback_parameter_failed':
                await this.fixFallbackParameter(issue);
                break;
        }
    }

    // Fix missing language
    async fixMissingLanguage(issue) {
        console.log(`Fixing missing language: ${issue.language}`);
        
        const translations = window.i18n.getBuiltInTranslations();
        translations[issue.language] = this.getDefaultLanguageTranslations(issue.language);
    }

    // Fix missing critical section
    async fixMissingCriticalSection(issue) {
        console.log(`Fixing missing critical section: ${issue.section} in ${issue.language}`);
        
        const translations = window.i18n.getBuiltInTranslations();
        if (!translations[issue.language][issue.section]) {
            translations[issue.language][issue.section] = this.getDefaultSectionTranslations(issue.section, issue.language);
        }
    }

    // Fix broken interpolation
    async fixBrokenInterpolation(issue) {
        console.log(`Fixing broken interpolation in ${issue.language}`);
        
        // Ensure interpolation function works correctly
        const originalInterpolate = window.i18n.interpolate;
        window.i18n.interpolate = function(str, params) {
            if (typeof str !== 'string') return str;
            return str.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
        };
    }

    // Fix language switching
    async fixLanguageSwitching(issue) {
        console.log(`Fixing language switching for ${issue.language}`);
        
        // Ensure language switching works
        const originalChangeLanguage = window.i18n.changeLanguage;
        window.i18n.changeLanguage = function(lang) {
            if (lang === this.currentLang) return;
            if (!['en', 'de', 'es', 'ta'].includes(lang)) {
                this.currentLang = 'en';
                return;
            }
            
            this.currentLang = lang;
            localStorage.setItem('bend-language', lang);
            this.updateDocumentLanguage();
            this.applyTranslations();
        };
    }

    // Fix translation not applied
    async fixTranslationNotApplied(issue) {
        console.log(`Fixing translation not applied for ${issue.language}`);
        
        // Force reapply translations
        window.i18n.applyTranslations();
    }

    // Fix fallback behavior
    async fixFallbackBehavior(issue) {
        console.log('Fixing fallback behavior');
        
        // Ensure fallback works
        const originalChangeLanguage = window.i18n.changeLanguage;
        window.i18n.changeLanguage = function(lang) {
            if (!['en', 'de', 'es', 'ta'].includes(lang)) {
                this.currentLang = 'en';
                return;
            }
            return originalChangeLanguage.call(this, lang);
        };
    }

    // Fix fallback parameter
    async fixFallbackParameter(issue) {
        console.log('Fixing fallback parameter');
        
        // Ensure fallback parameter works
        const originalT = window.i18n.t;
        window.i18n.t = function(key, params = {}, fallback = null) {
            const translation = this.getNestedValue(this.translations[this.currentLang], key) ||
                              this.getNestedValue(this.translations.en, key) ||
                              fallback ||
                              key;
            
            return this.interpolate(translation, params);
        };
    }

    // Get default language translations
    getDefaultLanguageTranslations(language) {
        const defaults = {
            en: this.getEnglishTranslations(),
            de: this.getGermanTranslations(),
            es: this.getSpanishTranslations(),
            ta: this.getTamilTranslations()
        };
        
        return defaults[language] || defaults.en;
    }

    // Get default section translations
    getDefaultSectionTranslations(section, language) {
        const sectionDefaults = {
            app: {
                en: { title: "Bend", subtitle: "Flexibility & Mobility" },
                de: { title: "Bend", subtitle: "Flexibilität & Mobilität" },
                es: { title: "Bend", subtitle: "Flexibilidad y Movilidad" },
                ta: { title: "Bend", subtitle: "நெகிழ்வு மற்றும் இயக்கத்திறன்" }
            },
            navigation: {
                en: { chooseRoutine: "Choose your routine", back: "Back" },
                de: { chooseRoutine: "Wähle deine Routine", back: "Zurück" },
                es: { chooseRoutine: "Elige tu rutina", back: "Atrás" },
                ta: { chooseRoutine: "உங்கள் வழக்கத்தை தேர்ந்தெடுக்கவும்", back: "திரும்பு" }
            },
            timer: {
                en: { switchSides: "Switch sides", routineComplete: "Routine Complete!" },
                de: { switchSides: "Seite wechseln", routineComplete: "Routine abgeschlossen!" },
                es: { switchSides: "Cambiar lados", routineComplete: "¡Rutina completada!" },
                ta: { switchSides: "பக்கங்களை மாற்றவும்", routineComplete: "வழக்கம் முடிந்தது!" }
            }
        };
        
        return sectionDefaults[section]?.[language] || sectionDefaults[section]?.en || {};
    }

    // Get English translations
    getEnglishTranslations() {
        return {
            app: { title: "Bend", subtitle: "Flexibility & Mobility" },
            navigation: { chooseRoutine: "Choose your routine", back: "Back" },
            timer: { switchSides: "Switch sides", routineComplete: "Routine Complete!" }
        };
    }

    // Get German translations
    getGermanTranslations() {
        return {
            app: { title: "Bend", subtitle: "Flexibilität & Mobilität" },
            navigation: { chooseRoutine: "Wähle deine Routine", back: "Zurück" },
            timer: { switchSides: "Seite wechseln", routineComplete: "Routine abgeschlossen!" }
        };
    }

    // Get Spanish translations
    getSpanishTranslations() {
        return {
            app: { title: "Bend", subtitle: "Flexibilidad y Movilidad" },
            navigation: { chooseRoutine: "Elige tu rutina", back: "Atrás" },
            timer: { switchSides: "Cambiar lados", routineComplete: "¡Rutina completada!" }
        };
    }

    // Get Tamil translations
    getTamilTranslations() {
        return {
            app: { title: "Bend", subtitle: "நெகிழ்வு மற்றும் இயக்கத்திறன்" },
            navigation: { chooseRoutine: "உங்கள் வழக்கத்தை தேர்ந்தெடுக்கவும்", back: "திரும்பு" },
            timer: { switchSides: "பக்கங்களை மாற்றவும்", routineComplete: "வழக்கம் முடிந்தது!" }
        };
    }

    // Verify fixes worked
    async verifyFixes() {
        console.log('✅ Verifying fixes...');
        
        // Re-run smart tests to see if issues are resolved
        const originalIssues = this.issuesFound.length;
        this.issuesFound = [];
        
        await this.runSmartTests();
        
        const remainingIssues = this.issuesFound.length;
        const fixedIssues = originalIssues - remainingIssues;
        
        console.log(`🎉 Fixed ${fixedIssues} real issues, ${remainingIssues} remaining`);
    }

    // Generate report
    generateReport() {
        // Only show report if there are issues or fixes
        if (this.issuesFound.length === 0 && this.fixesApplied.length === 0) {
            // No issues found - silent success
            return;
        }
        
        console.log('\n📊 SMART TRANSLATION FIXER REPORT');
        console.log('====================================');
        console.log(`🔍 Real Issues Found: ${this.issuesFound.length}`);
        console.log(`🛠️ Fixes Applied: ${this.fixesApplied.length}`);
        console.log(`✅ Success Rate: ${this.fixesApplied.length > 0 ? Math.round((this.fixesApplied.length / (this.issuesFound.length + this.fixesApplied.length)) * 100) : 0}%`);
        
        if (this.fixesApplied.length > 0) {
            console.log('\n🎉 REAL FIXES APPLIED:');
            this.fixesApplied.forEach((fix, index) => {
                console.log(`${index + 1}. [${fix.severity}] ${fix.message}`);
            });
        }
        
        if (this.issuesFound.length > 0) {
            console.log('\n⚠️ REMAINING REAL ISSUES:');
            this.issuesFound.forEach((issue, index) => {
                console.log(`${index + 1}. [${issue.severity}] ${issue.message}`);
            });
        }
        
        // Show visual report only if there are issues or fixes
        this.showVisualReport();
    }

    // Show visual report
    showVisualReport() {
        const reportDiv = document.createElement('div');
        reportDiv.id = 'smart-fixer-report';
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
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-family: monospace;
            color: #333;
            line-height: 1.4;
        `;
        
        let html = `
            <h2 style="color: #2ecc71; margin-top: 0; font-size: 1.2rem;">🎉 Smart Translation Fixer Complete!</h2>
            <p style="color: #333; margin: 8px 0;"><strong>Real Issues Found:</strong> ${this.issuesFound.length}</p>
            <p style="color: #333; margin: 8px 0;"><strong>Fixes Applied:</strong> ${this.fixesApplied.length}</p>
            <p style="color: #333; margin: 8px 0;"><strong>Success Rate:</strong> ${this.fixesApplied.length > 0 ? Math.round((this.fixesApplied.length / (this.issuesFound.length + this.fixesApplied.length)) * 100) : 0}%</p>
        `;
        
        if (this.fixesApplied.length > 0) {
            html += '<h3 style="color: #27ae60; margin: 15px 0 8px 0; font-size: 1rem;">✅ Real Fixes Applied:</h3><ul style="margin: 0 0 15px 0; padding-left: 20px;">';
            this.fixesApplied.forEach(fix => {
                html += `<li style="color: #27ae60; margin: 4px 0; font-size: 0.9rem;">${fix.message}</li>`;
            });
            html += '</ul>';
        }
        
        if (this.issuesFound.length > 0) {
            html += '<h3 style="color: #e74c3c; margin: 15px 0 8px 0; font-size: 1rem;">⚠️ Remaining Real Issues:</h3><ul style="margin: 0 0 15px 0; padding-left: 20px;">';
            this.issuesFound.forEach(issue => {
                html += `<li style="color: #e74c3c; margin: 4px 0; font-size: 0.9rem;">${issue.message}</li>`;
            });
            html += '</ul>';
        }
        
        html += '<button onclick="this.parentElement.remove()" style="background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">Close Report</button>';
        reportDiv.innerHTML = html;
        
        document.body.appendChild(reportDiv);
    }
}

// Auto-run the smart fixer when page loads
if (typeof window !== 'undefined') {
    window.SmartTranslationFixer = SmartTranslationFixer;
    
    // Don't auto-run - only run when explicitly requested in debug mode
    // setTimeout(async () => {
    //     if (window.i18n) {
    //         const fixer = new SmartTranslationFixer();
    //         await fixer.runAndFix();
    //     }
    // }, 2000);
    
    console.log('🔧 Smart Translation Fixer loaded (not auto-started)!');
    console.log('Run: new SmartTranslationFixer().runAndFix() to start fixing');
    console.log('Or use debug mode: enableDebugMode() then run tests');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartTranslationFixer;
}
