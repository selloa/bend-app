// Debug Manager - Controls visibility of debug messages
// Hides all debug messages from UI and redirects them to browser console only

class DebugManager {
    constructor() {
        this.isDebugMode = false;
        this.originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info
        };
        this.setupConsoleOverride();
        this.hideAllDebugMessages();
    }

    // Setup console override to hide debug messages by default
    setupConsoleOverride() {
        const self = this;
        
        // Override console.log to filter debug messages
        console.log = function(...args) {
            const message = args.join(' ');
            
            // Always show errors and warnings
            if (message.includes('❌') || message.includes('⚠️')) {
                self.originalConsole.log.apply(console, args);
                return;
            }
            
            // Only show debug messages if debug mode is enabled
            if (self.isDebugMode || !self.isDebugMessage(message)) {
                self.originalConsole.log.apply(console, args);
            }
        };

        // Override console.warn
        console.warn = function(...args) {
            self.originalConsole.warn.apply(console, args);
        };

        // Override console.error
        console.error = function(...args) {
            self.originalConsole.error.apply(console, args);
        };

        // Override console.info
        console.info = function(...args) {
            const message = args.join(' ');
            if (self.isDebugMode || !self.isDebugMessage(message)) {
                self.originalConsole.info.apply(console, args);
            }
        };
    }

    // Check if a message is a debug message that should be hidden
    isDebugMessage(message) {
        const debugPatterns = [
            '🔍 Starting comprehensive translation audit',
            '🔧 Applying script.js translation fixes',
            '🔧 Fixing exercise display functions',
            '🔧 Fixing routine data access',
            '🔧 Fixing dynamic content generation',
            '🛡️ Translation Workflow Guard activated',
            '🛡️ Translation Workflow Guard deactivated',
            '🎉 Script translation fixes applied successfully',
            '🎉 Comprehensive translations ready',
            '✅ All translations loaded successfully',
            '📊 Loaded translations for:',
            '🌍 Loading comprehensive translations',
            '🧪 Translation Testing Tools loaded',
            '🛡️ Translation Error Prevention Demo loaded',
            '📊 TRANSLATION AUDIT REPORT',
            '📊 SCRIPT TRANSLATION FIX REPORT',
            '🛡️ TRANSLATION WORKFLOW GUARD REPORT',
            '🔧 AUTOMATIC FIXES AVAILABLE',
            'Available commands',
            'Keyboard shortcuts',
            'To enable debug mode',
            'Translation fixes logged to console',
            'Missing translation fixes logged to console'
        ];

        return debugPatterns.some(pattern => message.includes(pattern));
    }

    // Hide all existing debug messages from the UI
    hideAllDebugMessages() {
        // Remove any existing debug message elements
        const debugElements = document.querySelectorAll('[style*="position: fixed"][style*="z-index"]');
        debugElements.forEach(element => {
            if (this.isDebugElement(element)) {
                element.remove();
            }
        });

        // Remove any existing translation fix buttons
        const fixButtons = document.getElementById('translation-fix-buttons');
        if (fixButtons) {
            fixButtons.remove();
        }

        // Remove any existing translation guard status
        const guardStatus = document.getElementById('translation-guard-status');
        if (guardStatus) {
            guardStatus.remove();
        }

        // Remove any existing success messages
        const successMessages = document.querySelectorAll('[style*="background: #28a745"]');
        successMessages.forEach(message => {
            if (message.innerHTML.includes('Translation') || message.innerHTML.includes('Fix')) {
                message.remove();
            }
        });
    }

    // Check if an element is a debug element
    isDebugElement(element) {
        const debugTexts = [
            'Translation Fix',
            'Translation Guard',
            'Translation Audit',
            'Comprehensive Translation',
            'Script Translation',
            'Workflow Guard',
            'Fix Applied',
            'Fixes Applied'
        ];

        return debugTexts.some(text => element.innerHTML.includes(text));
    }

    // Enable debug mode (show all messages)
    enableDebugMode() {
        this.isDebugMode = true;
        console.log('🔧 Debug mode enabled - all messages will be shown');
    }

    // Disable debug mode (hide debug messages)
    disableDebugMode() {
        this.isDebugMode = false;
        console.log('🔧 Debug mode disabled - debug messages hidden');
    }

    // Toggle debug mode
    toggleDebugMode() {
        if (this.isDebugMode) {
            this.disableDebugMode();
        } else {
            this.enableDebugMode();
        }
    }

    // Show a clean success message (only in console)
    showCleanSuccessMessage(message, details = '') {
        if (this.isDebugMode) {
            console.log(`✅ ${message}`);
            if (details) {
                console.log(`   ${details}`);
            }
        }
    }

    // Show a clean info message (only in console)
    showCleanInfoMessage(message, details = '') {
        if (this.isDebugMode) {
            console.log(`ℹ️ ${message}`);
            if (details) {
                console.log(`   ${details}`);
            }
        }
    }

    // Override the showSuccessMessage methods in other tools
    overrideSuccessMessages() {
        // Override script translation fix success message
        if (window.scriptTranslationFix) {
            const originalShowSuccessMessage = window.scriptTranslationFix.showSuccessMessage;
            window.scriptTranslationFix.showSuccessMessage = () => {
                this.showCleanSuccessMessage('Script translation fixes applied successfully', 'The app will now use translations instead of hardcoded strings');
            };
        }

        // Override comprehensive translation fixer success message
        if (window.comprehensiveTranslationFixer) {
            const originalShowSuccessMessage = window.comprehensiveTranslationFixer.showSuccessMessage;
            window.comprehensiveTranslationFixer.showSuccessMessage = () => {
                this.showCleanSuccessMessage('Translation fixes applied successfully', 'Check console for detailed report');
            };
        }
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+Shift+D to toggle debug mode
            if (event.ctrlKey && event.shiftKey && event.key === 'D') {
                event.preventDefault();
                this.toggleDebugMode();
            }
        });
    }

    // Initialize the debug manager
    initialize() {
        this.hideAllDebugMessages();
        this.overrideSuccessMessages();
        this.setupKeyboardShortcuts();
        
        // Show a clean startup message
        console.log('🚀 Bend App loaded successfully');
        console.log('💡 Press Ctrl+Shift+D to toggle debug mode');
        
        // Hide any future debug messages
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && this.isDebugElement(node)) {
                        if (!this.isDebugMode) {
                            node.remove();
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Initialize debug manager
window.debugManager = new DebugManager();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.debugManager.initialize();
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DebugManager;
}
