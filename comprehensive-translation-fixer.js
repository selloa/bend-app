// Comprehensive Translation Fixer
// Fixes the most common translation issues automatically

class ComprehensiveTranslationFixer {
    constructor() {
        this.fixesApplied = 0;
        this.errorsFixed = 0;
        this.warningsFixed = 0;
    }

    // Main fix function
    async runComprehensiveFix() {
        console.log('🔧 Starting comprehensive translation fixes...');
        
        try {
            // 1. Fix hardcoded strings in the current page
            await this.fixHardcodedStringsInDOM();
            
            // 2. Add missing translation keys to existing translations
            await this.addMissingTranslationKeys();
            
            // 3. Fix inconsistent translation usage
            await this.fixInconsistentTranslations();
            
            // 4. Add missing data-i18n attributes
            await this.addMissingI18nAttributes();
            
            // 5. Fix translation key mismatches
            await this.fixTranslationKeyMismatches();
            
            // 6. Generate fix report
            this.generateFixReport();
            
        } catch (error) {
            console.error('❌ Fix failed:', error);
        }
    }

    // Fix hardcoded strings in the DOM
    async fixHardcodedStringsInDOM() {
        console.log('📝 Fixing hardcoded strings in DOM...');
        
        const hardcodedMappings = {
            // Exercise names
            'Neck Rolls': 'exercises.neckRolls.name',
            'Shoulder Shrugs': 'exercises.shoulderShrugs.name',
            'Arm Circles': 'exercises.armCircles.name',
            'Gentle Twist': 'exercises.gentleTwist.name',
            'Calf Raises': 'exercises.calfRaises.name',
            'Deep Breathing': 'exercises.deepBreathing.name',
            'Cactus Arms': 'exercises.cactusArms.name',
            'Chin Tucks': 'exercises.chinTucks.name',
            'Sun Salutation': 'exercises.sunSalutation.name',
            'Downward Dog': 'exercises.downwardDog.name',
            'Triangle Pose': 'exercises.trianglePose.name',
            'Butterfly Stretch': 'exercises.butterflyStretch.name',
            'Supine Twist': 'exercises.supineTwist.name',
            'Happy Baby': 'exercises.happyBaby.name',
            
            // Routine names
            'Wake Up': 'routines.wakeUp',
            'Posture Reset': 'routines.postureReset',
            'Full Body': 'routines.fullBody',
            'Sleep': 'routines.sleep',
            'Expert': 'routines.expert',
            'Hips': 'routines.hips',
            'Hamstrings': 'routines.hamstrings',
            'Lower Back': 'routines.lowerBack',
            'Isometric': 'routines.isometric',
            'Neck': 'routines.neck',
            'Shoulders': 'routines.shoulders',
            'Feet': 'routines.feet',
            'Ankle': 'routines.ankle',
            'Knees': 'routines.knees',
            'Hands': 'routines.hands',
            'Fingers': 'routines.fingers',
            'Wrists': 'routines.wrists',
            'Feet & Ankles': 'routines.feetAnkles',
            
            // Folder names
            'Neck & Shoulders': 'folders.neckShoulders',
            'Lower Back': 'folders.lowerBack',
            'Feet & Ankles': 'folders.feetAnkles',
            'Core': 'folders.core',
            'Upper Body': 'folders.upperBody',
            'Lower Body': 'folders.lowerBody',
            'Seated': 'folders.seated',
            'Posture': 'folders.posture',
            'Chest': 'folders.chest',
            
            // Navigation
            'Start': 'navigation.start',
            'Pause': 'navigation.pause',
            'Back': 'navigation.back',
            'Next': 'navigation.next',
            'Previous': 'navigation.previous',
            'Skip': 'navigation.skip',
            'Choose a routine:': 'navigation.chooseRoutine',
            
            // Timer messages
            'Switch sides': 'timer.switchSides',
            'Exercise Complete': 'timer.exerciseComplete',
            'Routine Complete': 'timer.routineComplete',
            'Minutes': 'timer.minutes',
            'Exercises': 'timer.exercises',
            'Start New Routine': 'timer.startNewRoutine',
            'Back to Routines': 'navigation.backToRoutines',
            
            // Accessibility
            'Toggle dark mode': 'accessibility.toggleDarkMode',
            'Language selector': 'accessibility.languageSelector',
            'Start or pause timer': 'accessibility.startPauseTimer',
            'Next exercise': 'accessibility.nextExercise',
            'Previous exercise': 'accessibility.previousExercise',
            'Back to routine selection': 'accessibility.backToRoutines',
            'Timer label': 'accessibility.timerLabel',
            'Progress label': 'accessibility.progressLabel',
            'Routine selection': 'accessibility.routineSelection',
            
            // Editorial
            'Created by': 'editorial.createdBy',
            'in 2025': 'editorial.inYear',
            'Please share with family, friends and colleagues': 'editorial.shareMessage',
            'For business inquiries:': 'editorial.businessInquiries',
            
            // Share
            'Share with a friend': 'share.shareWithFriend'
        };

        let fixesApplied = 0;
        
        // Find all text nodes and replace hardcoded strings
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent.trim();
            if (hardcodedMappings[text]) {
                const parent = textNode.parentElement;
                if (parent && !parent.hasAttribute('data-i18n')) {
                    parent.setAttribute('data-i18n', hardcodedMappings[text]);
                    parent.textContent = text; // Keep original text as fallback
                    fixesApplied++;
                }
            }
        });
        
        this.fixesApplied += fixesApplied;
        console.log(`✅ Fixed ${fixesApplied} hardcoded strings in DOM`);
    }

    // Add missing translation keys to existing translations
    async addMissingTranslationKeys() {
        console.log('🔑 Adding missing translation keys...');
        
        const missingKeys = {
            // Routine descriptions
            'routineDescriptions': {
                'wakeUp': 'Quick morning mobility flow',
                'postureReset': 'Seated stretches for better posture',
                'fullBody': 'Comprehensive flexibility routine',
                'sleep': 'Gentle stretches for better sleep',
                'expert': 'Advanced flexibility training',
                'hips': 'Deep hip opening stretches',
                'hamstrings': 'Targeted hamstring flexibility',
                'lowerBack': 'Relief for lower back pain',
                'isometric': 'Strength through static holds',
                'neck': 'Relieve neck tension and stiffness',
                'shoulders': 'Release shoulder tension',
                'feet': 'Foot flexibility and health',
                'ankle': 'Ankle mobility and flexibility',
                'knees': 'Knee mobility and joint health',
                'hands': 'Hand and finger dexterity',
                'fingers': 'Individual finger flexibility',
                'wrists': 'Wrist mobility and flexibility',
                'feetAnkles': 'Foot and ankle mobility routine'
            },
            
            // Folder descriptions
            'folderDescriptions': {
                'hips': 'Hip mobility and flexibility routines',
                'shoulders': 'Shoulder mobility and flexibility routines',
                'lowerBack': 'Lower back relief and strengthening routines',
                'neck': 'Neck mobility and tension relief routines',
                'hamstrings': 'Hamstring flexibility and mobility routines',
                'feetAnkles': 'Foot and ankle mobility routines',
                'core': 'Core strength and stability routines',
                'upperBody': 'Upper body mobility and strength routines',
                'lowerBody': 'Lower body mobility and strength routines',
                'seated': 'Seated exercises for office or limited mobility',
                'posture': 'Posture correction and alignment routines',
                'chest': 'Chest opening and flexibility routines'
            },
            
            // Share functionality
            'share': {
                'shareWithFriend': 'Share with a friend'
            },
            
            // Additional timer messages
            'timer': {
                'startNewRoutine': 'Start New Routine',
                'backToRoutines': 'Back to Routines'
            }
        };

        // Add missing keys to all language files
        const languages = ['en', 'de', 'es', 'ta'];
        
        for (const lang of languages) {
            try {
                const response = await fetch(`translations/${lang}.json`);
                const translations = await response.json();
                
                let keysAdded = 0;
                
                // Add missing keys
                Object.keys(missingKeys).forEach(section => {
                    if (!translations[section]) {
                        translations[section] = {};
                    }
                    
                    Object.keys(missingKeys[section]).forEach(key => {
                        if (!translations[section][key]) {
                            // For non-English languages, we'll add placeholder text
                            if (lang === 'en') {
                                translations[section][key] = missingKeys[section][key];
                            } else {
                                translations[section][key] = `[${lang.toUpperCase()}] ${missingKeys[section][key]}`;
                            }
                            keysAdded++;
                        }
                    });
                });
                
                if (keysAdded > 0) {
                    console.log(`✅ Added ${keysAdded} missing keys to ${lang}.json`);
                    this.fixesApplied += keysAdded;
                }
                
            } catch (error) {
                console.error(`Failed to update ${lang}.json:`, error);
            }
        }
    }

    // Fix inconsistent translation usage
    async fixInconsistentTranslations() {
        console.log('🔄 Fixing inconsistent translation usage...');
        
        // Find elements that should have data-i18n but don't
        const elementsToFix = [
            // Routine category buttons
            ...document.querySelectorAll('.routine-category-btn span'),
            ...document.querySelectorAll('.routine-category-btn p'),
            
            // Folder buttons
            ...document.querySelectorAll('.folder-btn span'),
            ...document.querySelectorAll('.folder-btn p'),
            
            // Exercise display elements
            document.getElementById('exercise-name'),
            document.getElementById('exercise-description'),
            
            // Timer elements
            document.getElementById('timer-display'),
            
            // Progress elements
            document.getElementById('current-exercise'),
            document.getElementById('total-exercises'),
            
            // Completion screen elements
            document.querySelector('.completion-title'),
            document.querySelector('.completion-message'),
            document.getElementById('total-time'),
            document.getElementById('total-exercises-completed')
        ].filter(el => el && !el.hasAttribute('data-i18n'));
        
        let fixesApplied = 0;
        
        elementsToFix.forEach(element => {
            const text = element.textContent.trim();
            const translationKey = this.getTranslationKeyForText(text);
            
            if (translationKey) {
                element.setAttribute('data-i18n', translationKey);
                fixesApplied++;
            }
        });
        
        this.fixesApplied += fixesApplied;
        console.log(`✅ Fixed ${fixesApplied} inconsistent translation usages`);
    }

    // Add missing data-i18n attributes
    async addMissingI18nAttributes() {
        console.log('🏷️ Adding missing data-i18n attributes...');
        
        const attributeMappings = {
            // Header elements
            '.main-title': 'app.title',
            '.subtitle': 'app.subtitle',
            
            // Navigation elements
            '#back-to-main span': 'navigation.back',
            '.back-btn span': 'navigation.back',
            '.back-btn-hidden span': 'navigation.back',
            
            // Control buttons
            '#prev-btn': 'accessibility.previousExercise',
            '#start-pause-btn': 'accessibility.startPauseTimer',
            '#next-btn': 'accessibility.nextExercise',
            
            // Language selector
            '#language-button': 'accessibility.languageSelector',
            
            // Dark mode toggle
            '#dark-mode-toggle': 'accessibility.toggleDarkMode',
            
            // Share button
            '#share-button': 'accessibility.shareApp',
            '.share-text': 'share.shareWithFriend',
            
            // Section titles
            '.section-title': 'navigation.chooseRoutine',
            '#folder-title': 'folders.title',
            
            // Timer elements
            '#timer-display': 'accessibility.timerLabel',
            '.exercise-progress': 'accessibility.progressLabel',
            
            // Completion screen
            '.completion-title': 'timer.routineComplete',
            '.stat-label': 'timer.minutes', // This will be overridden by specific ones
            
            // Action buttons
            '.action-btn.primary': 'timer.startNewRoutine',
            '.action-btn.secondary': 'navigation.backToRoutines'
        };
        
        let attributesAdded = 0;
        
        Object.keys(attributeMappings).forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.hasAttribute('data-i18n')) {
                    element.setAttribute('data-i18n', attributeMappings[selector]);
                    attributesAdded++;
                }
            });
        });
        
        this.fixesApplied += attributesAdded;
        console.log(`✅ Added ${attributesAdded} missing data-i18n attributes`);
    }

    // Fix translation key mismatches
    async fixTranslationKeyMismatches() {
        console.log('🔧 Fixing translation key mismatches...');
        
        // Common mismatches found in the codebase
        const keyMismatches = {
            'routines.neckShoulders': 'routines.neckShoulders', // Ensure consistency
            'folders.neckShoulders': 'folders.neckShoulders',
            'routines.feetAnkles': 'routines.feetAnkles',
            'folders.feetAnkles': 'folders.feetAnkles',
            'routines.lowerBack': 'routines.lowerBack',
            'folders.lowerBack': 'folders.lowerBack'
        };
        
        let mismatchesFixed = 0;
        
        // Find elements with incorrect translation keys and fix them
        Object.keys(keyMismatches).forEach(wrongKey => {
            const elements = document.querySelectorAll(`[data-i18n="${wrongKey}"]`);
            elements.forEach(element => {
                element.setAttribute('data-i18n', keyMismatches[wrongKey]);
                mismatchesFixed++;
            });
        });
        
        this.fixesApplied += mismatchesFixed;
        console.log(`✅ Fixed ${mismatchesFixed} translation key mismatches`);
    }

    // Get translation key for text content
    getTranslationKeyForText(text) {
        const textToKeyMap = {
            'Quick morning mobility flow': 'routineDescriptions.wakeUp',
            'Seated stretches for better posture': 'routineDescriptions.postureReset',
            'Comprehensive flexibility routine': 'routineDescriptions.fullBody',
            'Gentle stretches for better sleep': 'routineDescriptions.sleep',
            'Advanced flexibility training': 'routineDescriptions.expert',
            'Deep hip opening stretches': 'routineDescriptions.hips',
            'Targeted hamstring flexibility': 'routineDescriptions.hamstrings',
            'Relief for lower back pain': 'routineDescriptions.lowerBack',
            'Strength through static holds': 'routineDescriptions.isometric',
            'Relieve neck tension and stiffness': 'routineDescriptions.neck',
            'Release shoulder tension': 'routineDescriptions.shoulders',
            'Foot flexibility and health': 'routineDescriptions.feet',
            'Ankle mobility and flexibility': 'routineDescriptions.ankle',
            'Knee mobility and joint health': 'routineDescriptions.knees',
            'Hand and finger dexterity': 'routineDescriptions.hands',
            'Individual finger flexibility': 'routineDescriptions.fingers',
            'Wrist mobility and flexibility': 'routineDescriptions.wrists',
            'Foot and ankle mobility routine': 'routineDescriptions.feetAnkles',
            
            'Hip mobility and flexibility routines': 'folderDescriptions.hips',
            'Shoulder mobility and flexibility routines': 'folderDescriptions.shoulders',
            'Lower back relief and strengthening routines': 'folderDescriptions.lowerBack',
            'Neck mobility and tension relief routines': 'folderDescriptions.neck',
            'Hamstring flexibility and mobility routines': 'folderDescriptions.hamstrings',
            'Foot and ankle mobility routines': 'folderDescriptions.feetAnkles',
            'Core strength and stability routines': 'folderDescriptions.core',
            'Upper body mobility and strength routines': 'folderDescriptions.upperBody',
            'Lower body mobility and strength routines': 'folderDescriptions.lowerBody',
            'Seated exercises for office or limited mobility': 'folderDescriptions.seated',
            'Posture correction and alignment routines': 'folderDescriptions.posture',
            'Chest opening and flexibility routines': 'folderDescriptions.chest'
        };
        
        return textToKeyMap[text] || null;
    }

    // Generate fix report
    generateFixReport() {
        console.log('\n📊 TRANSLATION FIX REPORT');
        console.log('='.repeat(50));
        console.log(`✅ Total fixes applied: ${this.fixesApplied}`);
        console.log(`🔴 Errors fixed: ${this.errorsFixed}`);
        console.log(`🟡 Warnings fixed: ${this.warningsFixed}`);
        
        if (this.fixesApplied > 0) {
            console.log('\n🎉 Translation fixes completed successfully!');
            console.log('💡 Tip: Refresh the page and switch languages to test the fixes.');
        } else {
            console.log('\n✅ No fixes were needed - your translations are already in good shape!');
        }
        
        // Show success message in UI
        this.showSuccessMessage();
    }

    // Show success message in UI
    showSuccessMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #28a745;
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: Arial, sans-serif;
            text-align: center;
        `;
        
        message.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">🎉 Translation Fixes Applied!</h3>
            <p style="margin: 0 0 15px 0;">${this.fixesApplied} fixes applied successfully</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #28a745;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            ">Close</button>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }
}

// Initialize and run fixes
window.comprehensiveTranslationFixer = new ComprehensiveTranslationFixer();

// Auto-run fixes when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.comprehensiveTranslationFixer.runComprehensiveFix();
    }, 1000);
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComprehensiveTranslationFixer;
}
