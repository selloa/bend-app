// Comprehensive Translation Audit Tool
// Detects and fixes translation issues automatically

class TranslationAuditTool {
    constructor() {
        this.issues = [];
        this.fixes = [];
        this.hardcodedStrings = [];
        this.missingTranslations = [];
        this.englishPatterns = [
            // Common English patterns that should be translated
            /"[A-Z][a-z]+ [A-Z][a-z]+"/g,  // "Wake Up", "Neck Rolls"
            /"[A-Z][a-z]+"/g,              // "Start", "Pause", "Back"
            /name:\s*"[^"]*"/g,            // name: "Exercise Name"
            /description:\s*"[^"]*"/g,     // description: "Exercise description"
            /"[A-Z][a-z]+ & [A-Z][a-z]+"/g, // "Neck & Shoulders"
            /"[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+"/g, // "Full Body Stretch"
        ];
    }

    // Main audit function
    async runFullAudit() {
        // Only show debug messages if debug mode is enabled
        if (window.debugManager && window.debugManager.isDebugMode) {
            console.log('🔍 Starting comprehensive translation audit...');
        }
        
        try {
            // 1. Check for hardcoded English strings in script.js
            await this.auditHardcodedStrings();
            
            // 2. Check for missing translation keys
            await this.auditMissingTranslations();
            
            // 3. Check for inconsistent translation usage
            await this.auditTranslationConsistency();
            
            // 4. Check for untranslated content in HTML
            await this.auditHTMLContent();
            
            // 5. Generate comprehensive report
            this.generateReport();
            
            // 6. Offer automatic fixes
            await this.offerFixes();
            
        } catch (error) {
            console.error('❌ Audit failed:', error);
        }
    }

    // Check for hardcoded English strings in script.js
    async auditHardcodedStrings() {
        console.log('📝 Checking for hardcoded English strings...');
        
        try {
            const response = await fetch('script.js');
            const content = await response.text();
            
            this.englishPatterns.forEach(pattern => {
                const matches = content.match(pattern);
                if (matches) {
                    matches.forEach(match => {
                        this.hardcodedStrings.push({
                            type: 'hardcoded_string',
                            file: 'script.js',
                            text: match,
                            pattern: pattern.toString(),
                            severity: 'high',
                            suggestion: this.getTranslationSuggestion(match)
                        });
                    });
                }
            });
            
            console.log(`Found ${this.hardcodedStrings.length} hardcoded English strings`);
            
        } catch (error) {
            console.error('Failed to audit script.js:', error);
        }
    }

    // Check for missing translation keys
    async auditMissingTranslations() {
        console.log('🔑 Checking for missing translation keys...');
        
        const languages = ['en', 'de', 'es', 'ta'];
        const translationFiles = languages.map(lang => `translations/${lang}.json`);
        
        for (const file of translationFiles) {
            try {
                const response = await fetch(file);
                const translations = await response.json();
                const lang = file.split('/')[1].split('.')[0];
                
                // Check for missing keys by comparing with English
                if (lang !== 'en') {
                    const englishResponse = await fetch('translations/en.json');
                    const englishTranslations = await englishResponse.json();
                    
                    this.compareTranslations(englishTranslations, translations, lang);
                }
                
            } catch (error) {
                console.error(`Failed to audit ${file}:`, error);
            }
        }
    }

    // Compare translation objects to find missing keys
    compareTranslations(english, other, lang) {
        const findMissingKeys = (obj1, obj2, path = '') => {
            for (const key in obj1) {
                const currentPath = path ? `${path}.${key}` : key;
                
                if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                    if (!obj2[key] || typeof obj2[key] !== 'object') {
                        this.missingTranslations.push({
                            type: 'missing_key',
                            file: `translations/${lang}.json`,
                            key: currentPath,
                            severity: 'high',
                            suggestion: `Add missing key: ${currentPath}`
                        });
                    } else {
                        findMissingKeys(obj1[key], obj2[key], currentPath);
                    }
                } else if (!(key in obj2)) {
                    this.missingTranslations.push({
                        type: 'missing_key',
                        file: `translations/${lang}.json`,
                        key: currentPath,
                        severity: 'high',
                        suggestion: `Add missing key: ${currentPath}`
                    });
                }
            }
        };
        
        findMissingKeys(english, other);
    }

    // Check for inconsistent translation usage
    async auditTranslationConsistency() {
        console.log('🔄 Checking translation consistency...');
        
        // Check if HTML elements have proper data-i18n attributes
        const elementsWithoutI18n = document.querySelectorAll('*:not([data-i18n]):not(script):not(style)');
        const textElements = Array.from(elementsWithoutI18n).filter(el => {
            const text = el.textContent?.trim();
            return text && text.length > 0 && /[A-Za-z]/.test(text);
        });
        
        textElements.forEach(el => {
            const text = el.textContent.trim();
            if (this.looksLikeEnglish(text)) {
                this.issues.push({
                    type: 'missing_i18n_attribute',
                    element: el.tagName,
                    text: text,
                    severity: 'medium',
                    suggestion: `Add data-i18n attribute to element`
                });
            }
        });
    }

    // Check HTML content for untranslated text
    async auditHTMLContent() {
        console.log('🌐 Checking HTML content...');
        
        const htmlContent = document.documentElement.outerHTML;
        const englishMatches = htmlContent.match(/"[A-Z][a-z]+ [A-Z][a-z]+"/g) || [];
        
        englishMatches.forEach(match => {
            if (!match.includes('data-i18n')) {
                this.issues.push({
                    type: 'untranslated_html',
                    text: match,
                    severity: 'medium',
                    suggestion: 'Replace with translation key'
                });
            }
        });
    }

    // Helper function to check if text looks like English
    looksLikeEnglish(text) {
        const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
        const words = text.toLowerCase().split(/\s+/);
        return words.some(word => englishWords.includes(word)) && /[A-Z]/.test(text);
    }

    // Get translation suggestion for hardcoded string
    getTranslationSuggestion(text) {
        const cleanText = text.replace(/"/g, '');
        
        // Map common patterns to translation keys
        const suggestions = {
            'Wake Up': 'routines.wakeUp',
            'Neck Rolls': 'exercises.neckRolls.name',
            'Shoulder Shrugs': 'exercises.shoulderShrugs.name',
            'Arm Circles': 'exercises.armCircles.name',
            'Gentle Twist': 'exercises.gentleTwist.name',
            'Calf Raises': 'exercises.calfRaises.name',
            'Deep Breathing': 'exercises.deepBreathing.name',
            'Posture Reset': 'routines.postureReset',
            'Cactus Arms': 'exercises.cactusArms.name',
            'Chin Tucks': 'exercises.chinTucks.name',
            'Full Body': 'routines.fullBody',
            'Sun Salutation': 'exercises.sunSalutation.name',
            'Downward Dog': 'exercises.downwardDog.name',
            'Triangle Pose': 'exercises.trianglePose.name',
            'Butterfly Stretch': 'exercises.butterflyStretch.name',
            'Supine Twist': 'exercises.supineTwist.name',
            'Happy Baby': 'exercises.happyBaby.name',
            'Neck & Shoulders': 'folders.neckShoulders',
            'Start': 'navigation.start',
            'Pause': 'navigation.pause',
            'Back': 'navigation.back',
            'Next': 'navigation.next',
            'Previous': 'navigation.previous',
            'Skip': 'navigation.skip'
        };
        
        return suggestions[cleanText] || `Add to translations: ${cleanText.toLowerCase().replace(/\s+/g, '.')}`;
    }

    // Generate comprehensive report
    generateReport() {
        // Only show detailed reports if debug mode is enabled
        if (window.debugManager && window.debugManager.isDebugMode) {
            console.log('\n📊 TRANSLATION AUDIT REPORT');
            console.log('='.repeat(50));
            
            console.log(`\n🔴 HIGH SEVERITY ISSUES (${this.hardcodedStrings.length + this.missingTranslations.length}):`);
            
            if (this.hardcodedStrings.length > 0) {
                console.log('\n📝 Hardcoded English Strings:');
                this.hardcodedStrings.forEach((issue, index) => {
                    console.log(`  ${index + 1}. ${issue.text}`);
                    console.log(`     File: ${issue.file}`);
                    console.log(`     Fix: ${issue.suggestion}`);
                });
            }
            
            if (this.missingTranslations.length > 0) {
                console.log('\n🔑 Missing Translation Keys:');
                this.missingTranslations.forEach((issue, index) => {
                    console.log(`  ${index + 1}. Key: ${issue.key}`);
                    console.log(`     File: ${issue.file}`);
                    console.log(`     Fix: ${issue.suggestion}`);
                });
            }
            
            console.log(`\n🟡 MEDIUM SEVERITY ISSUES (${this.issues.length}):`);
            this.issues.forEach((issue, index) => {
                console.log(`  ${index + 1}. ${issue.type}: ${issue.text || issue.element}`);
                console.log(`     Fix: ${issue.suggestion}`);
            });
            
            const totalIssues = this.hardcodedStrings.length + this.missingTranslations.length + this.issues.length;
            console.log(`\n📈 SUMMARY:`);
            console.log(`  Total Issues Found: ${totalIssues}`);
            console.log(`  High Severity: ${this.hardcodedStrings.length + this.missingTranslations.length}`);
            console.log(`  Medium Severity: ${this.issues.length}`);
            
            if (totalIssues === 0) {
                console.log('\n✅ No translation issues found! Your app is fully internationalized.');
            } else {
                console.log('\n⚠️  Translation issues detected. Use the fix suggestions above.');
            }
        } else {
            // Show a clean summary
            const totalIssues = this.hardcodedStrings.length + this.missingTranslations.length + this.issues.length;
            if (totalIssues === 0) {
                console.log('✅ Translation audit complete - no issues found');
            } else {
                console.log(`⚠️ Translation audit complete - ${totalIssues} issues found (press Ctrl+Shift+D for details)`);
            }
        }
    }

    // Offer automatic fixes
    async offerFixes() {
        if (this.hardcodedStrings.length === 0 && this.missingTranslations.length === 0) {
            return;
        }
        
        console.log('\n🔧 AUTOMATIC FIXES AVAILABLE:');
        console.log('Run the following commands to fix issues:');
        
        if (this.hardcodedStrings.length > 0) {
            console.log('\n1. Fix hardcoded strings:');
            console.log('   await window.translationAuditTool.fixHardcodedStrings();');
        }
        
        if (this.missingTranslations.length > 0) {
            console.log('\n2. Add missing translation keys:');
            console.log('   await window.translationAuditTool.addMissingTranslations();');
        }
        
        // Create fix buttons in the UI
        this.createFixButtons();
    }

    // Create fix buttons in the UI
    createFixButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'translation-fix-buttons';
        buttonContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff;
            border: 2px solid #4A90E2;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        
        const title = document.createElement('h3');
        title.textContent = '🔧 Translation Fixes';
        title.style.margin = '0 0 10px 0';
        title.style.color = '#4A90E2';
        buttonContainer.appendChild(title);
        
        if (this.hardcodedStrings.length > 0) {
            const fixHardcodedBtn = document.createElement('button');
            fixHardcodedBtn.textContent = `Fix ${this.hardcodedStrings.length} Hardcoded Strings`;
            fixHardcodedBtn.style.cssText = `
                display: block;
                width: 100%;
                margin: 5px 0;
                padding: 8px 12px;
                background: #4A90E2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;
            fixHardcodedBtn.onclick = () => this.fixHardcodedStrings();
            buttonContainer.appendChild(fixHardcodedBtn);
        }
        
        if (this.missingTranslations.length > 0) {
            const fixMissingBtn = document.createElement('button');
            fixMissingBtn.textContent = `Add ${this.missingTranslations.length} Missing Keys`;
            fixMissingBtn.style.cssText = `
                display: block;
                width: 100%;
                margin: 5px 0;
                padding: 8px 12px;
                background: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;
            fixMissingBtn.onclick = () => this.addMissingTranslations();
            buttonContainer.appendChild(fixMissingBtn);
        }
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.cssText = `
            display: block;
            width: 100%;
            margin: 5px 0 0 0;
            padding: 8px 12px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
        closeBtn.onclick = () => buttonContainer.remove();
        buttonContainer.appendChild(closeBtn);
        
        document.body.appendChild(buttonContainer);
    }

    // Fix hardcoded strings (placeholder - would need server-side implementation)
    async fixHardcodedStrings() {
        console.log('🔧 Fixing hardcoded strings...');
        console.log('Note: This would require server-side implementation to modify files.');
        console.log('Manual fixes needed:');
        
        this.hardcodedStrings.forEach((issue, index) => {
            console.log(`${index + 1}. Replace: ${issue.text}`);
            console.log(`   With: data-i18n="${issue.suggestion}"`);
        });
        
        alert('Hardcoded string fixes logged to console. Manual implementation required.');
    }

    // Add missing translations (placeholder - would need server-side implementation)
    async addMissingTranslations() {
        console.log('🔧 Adding missing translation keys...');
        console.log('Note: This would require server-side implementation to modify files.');
        console.log('Manual fixes needed:');
        
        this.missingTranslations.forEach((issue, index) => {
            console.log(`${index + 1}. Add to ${issue.file}:`);
            console.log(`   Key: ${issue.key}`);
        });
        
        alert('Missing translation fixes logged to console. Manual implementation required.');
    }
}

// Initialize and run audit
window.translationAuditTool = new TranslationAuditTool();

// Auto-run audit when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.translationAuditTool.runFullAudit();
    }, 2000);
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationAuditTool;
}
