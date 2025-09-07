// Script Translation Fix - Patches script.js to use translations instead of hardcoded strings
// This fixes the main cause of English text appearing in other languages

class ScriptTranslationFix {
    constructor() {
        this.fixesApplied = 0;
        this.originalBendRoutines = null;
    }

    // Main fix function
    applyFixes() {
        // Only show debug messages if debug mode is enabled
        if (window.debugManager && window.debugManager.isDebugMode) {
            console.log('🔧 Applying script.js translation fixes...');
        }
        
        try {
            // 1. Backup original data
            this.backupOriginalData();
            
            // 2. Fix exercise display functions
            this.fixExerciseDisplayFunctions();
            
            // 3. Fix routine data access
            this.fixRoutineDataAccess();
            
            // 4. Fix dynamic content generation
            this.fixDynamicContentGeneration();
            
            // 5. Report results
            this.reportResults();
            
        } catch (error) {
            console.error('❌ Script translation fix failed:', error);
        }
    }

    // Backup original data
    backupOriginalData() {
        if (typeof bendRoutines !== 'undefined') {
            this.originalBendRoutines = JSON.parse(JSON.stringify(bendRoutines));
            console.log('✅ Original data backed up');
        }
    }

    // Fix exercise display functions
    fixExerciseDisplayFunctions() {
        console.log('🔧 Fixing exercise display functions...');
        
        // Override the displayExercise function if it exists
        if (typeof displayExercise === 'function') {
            const originalDisplayExercise = displayExercise;
            window.displayExercise = (exercise) => {
                // Use translations instead of hardcoded strings
                const exerciseName = this.getTranslatedExerciseName(exercise);
                const exerciseDescription = this.getTranslatedExerciseDescription(exercise);
                
                const nameElement = document.getElementById('exercise-name');
                const descElement = document.getElementById('exercise-description');
                
                if (nameElement) {
                    nameElement.textContent = exerciseName;
                    nameElement.setAttribute('data-i18n', `exercises.${exercise.id || exercise.name.toLowerCase().replace(/\s+/g, '')}.name`);
                }
                
                if (descElement) {
                    descElement.textContent = exerciseDescription;
                    descElement.setAttribute('data-i18n', `exercises.${exercise.id || exercise.name.toLowerCase().replace(/\s+/g, '')}.description`);
                }
                
                this.fixesApplied++;
            };
            console.log('✅ Exercise display function fixed');
        }
    }

    // Fix routine data access
    fixRoutineDataAccess() {
        console.log('🔧 Fixing routine data access...');
        
        // Override bendRoutines to use translations
        if (typeof bendRoutines !== 'undefined') {
            const originalBendRoutines = bendRoutines;
            
            // Create a proxy that returns translated data
            window.bendRoutines = new Proxy(originalBendRoutines, {
                get(target, prop) {
                    const routine = target[prop];
                    if (routine && typeof routine === 'object') {
                        return {
                            ...routine,
                            name: window.scriptTranslationFix.getTranslatedRoutineName(prop),
                            description: window.scriptTranslationFix.getTranslatedRoutineDescription(prop),
                            exercises: routine.exercises ? routine.exercises.map(exercise => ({
                                ...exercise,
                                name: window.scriptTranslationFix.getTranslatedExerciseName(exercise),
                                description: window.scriptTranslationFix.getTranslatedExerciseDescription(exercise)
                            })) : routine.exercises
                        };
                    }
                    return routine;
                }
            });
            
            console.log('✅ Routine data access fixed');
            this.fixesApplied++;
        }
    }

    // Fix dynamic content generation
    fixDynamicContentGeneration() {
        console.log('🔧 Fixing dynamic content generation...');
        
        // Override functions that generate routine buttons
        if (typeof generateRoutineButtons === 'function') {
            const originalGenerateRoutineButtons = generateRoutineButtons;
            window.generateRoutineButtons = () => {
                const result = originalGenerateRoutineButtons();
                
                // Add translation attributes to generated buttons
                document.querySelectorAll('.routine-category-btn').forEach(btn => {
                    const routineId = btn.getAttribute('data-routine');
                    if (routineId) {
                        const span = btn.querySelector('span');
                        const p = btn.querySelector('p');
                        
                        if (span && !span.hasAttribute('data-i18n')) {
                            span.setAttribute('data-i18n', `routines.${routineId}`);
                        }
                        
                        if (p && !p.hasAttribute('data-i18n')) {
                            p.setAttribute('data-i18n', `routineDescriptions.${routineId}`);
                        }
                    }
                });
                
                this.fixesApplied++;
                return result;
            };
        }
    }

    // Get translated exercise name
    getTranslatedExerciseName(exercise) {
        if (!exercise) return '';
        
        const exerciseId = exercise.id || exercise.name.toLowerCase().replace(/\s+/g, '');
        const translationKey = `exercises.${exerciseId}.name`;
        
        // Try to get translation
        if (window.i18n && window.i18n.t) {
            const translated = window.i18n.t(translationKey);
            if (translated !== translationKey) {
                return translated;
            }
        }
        
        // Fallback to original name
        return exercise.name || '';
    }

    // Get translated exercise description
    getTranslatedExerciseDescription(exercise) {
        if (!exercise) return '';
        
        const exerciseId = exercise.id || exercise.name.toLowerCase().replace(/\s+/g, '');
        const translationKey = `exercises.${exerciseId}.description`;
        
        // Try to get translation
        if (window.i18n && window.i18n.t) {
            const translated = window.i18n.t(translationKey);
            if (translated !== translationKey) {
                return translated;
            }
        }
        
        // Fallback to original description
        return exercise.description || '';
    }

    // Get translated routine name
    getTranslatedRoutineName(routineId) {
        if (!routineId) return '';
        
        const translationKey = `routines.${routineId}`;
        
        // Try to get translation
        if (window.i18n && window.i18n.t) {
            const translated = window.i18n.t(translationKey);
            if (translated !== translationKey) {
                return translated;
            }
        }
        
        // Fallback to original name
        const routine = this.originalBendRoutines?.[routineId];
        return routine?.name || '';
    }

    // Get translated routine description
    getTranslatedRoutineDescription(routineId) {
        if (!routineId) return '';
        
        const translationKey = `routineDescriptions.${routineId}`;
        
        // Try to get translation
        if (window.i18n && window.i18n.t) {
            const translated = window.i18n.t(translationKey);
            if (translated !== translationKey) {
                return translated;
            }
        }
        
        // Fallback to original description
        const routine = this.originalBendRoutines?.[routineId];
        return routine?.description || '';
    }

    // Report results
    reportResults() {
        // Only show detailed reports if debug mode is enabled
        if (window.debugManager && window.debugManager.isDebugMode) {
            console.log('\n📊 SCRIPT TRANSLATION FIX REPORT');
            console.log('='.repeat(50));
            console.log(`✅ Fixes applied: ${this.fixesApplied}`);
            
            if (this.fixesApplied > 0) {
                console.log('\n🎉 Script translation fixes applied successfully!');
                console.log('💡 The app will now use translations instead of hardcoded English strings.');
                console.log('🔄 Refresh the page and test language switching to see the results.');
            } else {
                console.log('\n⚠️  No fixes were applied. The script may already be using translations or the functions may not exist yet.');
            }
        } else if (this.fixesApplied > 0) {
            // Show a clean success message
            console.log('✅ Script translation fixes applied successfully');
        }
        
        // Show success message in UI only if debug mode is enabled
        if (window.debugManager && window.debugManager.isDebugMode) {
            this.showSuccessMessage();
        }
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
            max-width: 400px;
        `;
        
        message.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">🎉 Script Translation Fix Applied!</h3>
            <p style="margin: 0 0 15px 0;">${this.fixesApplied} fixes applied to use translations instead of hardcoded strings</p>
            <p style="margin: 0 0 15px 0; font-size: 14px;">The app will now properly translate exercise names and descriptions.</p>
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
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 8000);
    }

    // Restore original data (for testing)
    restoreOriginalData() {
        if (this.originalBendRoutines && typeof bendRoutines !== 'undefined') {
            window.bendRoutines = this.originalBendRoutines;
            console.log('✅ Original data restored');
        }
    }
}

// Initialize and apply fixes
window.scriptTranslationFix = new ScriptTranslationFix();

// Auto-apply fixes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for i18n system to be ready
    setTimeout(() => {
        if (window.i18n) {
            window.scriptTranslationFix.applyFixes();
        } else {
            console.warn('⚠️ i18n system not ready, retrying in 1 second...');
            setTimeout(() => {
                if (window.i18n) {
                    window.scriptTranslationFix.applyFixes();
                } else {
                    console.error('❌ i18n system not available, cannot apply script fixes');
                }
            }, 1000);
        }
    }, 500);
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScriptTranslationFix;
}
