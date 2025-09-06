// Translation Monitor - Continuous Bug Detection
// Runs in background to catch translation issues as they occur

class TranslationMonitor {
    constructor() {
        this.isMonitoring = false;
        this.issues = [];
        this.languageHistory = [];
        this.lastLanguage = null;
        this.monitoringInterval = null;
    }

    // Start continuous monitoring
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        console.log('🔍 Starting translation monitoring...');
        
        // Monitor language changes
        this.monitorLanguageChanges();
        
        // Monitor DOM changes
        this.monitorDOMChanges();
        
        // Periodic checks
        this.monitoringInterval = setInterval(() => {
            this.performPeriodicChecks();
        }, 5000); // Check every 5 seconds
        
        // Listen for custom events
        this.setupEventListeners();
    }

    // Stop monitoring
    stopMonitoring() {
        this.isMonitoring = false;
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
        console.log('🛑 Translation monitoring stopped');
    }

    // Monitor language changes
    monitorLanguageChanges() {
        if (!window.i18n) return;
        
        const originalChangeLanguage = window.i18n.changeLanguage.bind(window.i18n);
        window.i18n.changeLanguage = (lang) => {
            const result = originalChangeLanguage(lang);
            
            // Track language changes
            this.languageHistory.push({
                from: this.lastLanguage,
                to: lang,
                timestamp: Date.now()
            });
            this.lastLanguage = lang;
            
            // Check for issues after language change
            setTimeout(() => {
                this.checkLanguageChangeIssues(lang);
            }, 100);
            
            return result;
        };
    }

    // Monitor DOM changes for translation issues
    monitorDOMChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.checkElementForTranslationIssues(node);
                        }
                    });
                } else if (mutation.type === 'characterData') {
                    this.checkTextForTranslationIssues(mutation.target);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    // Check for issues after language change
    checkLanguageChangeIssues(newLang) {
        // Check if translations are actually applied
        const i18nElements = document.querySelectorAll('[data-i18n]');
        let untranslatedCount = 0;
        
        i18nElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const expectedTranslation = window.i18n.t(key, {}, element.textContent);
            
            if (expectedTranslation === element.textContent && newLang !== 'en') {
                untranslatedCount++;
            }
        });
        
        if (untranslatedCount > 0) {
            this.reportIssue('WARNING', `Language change to ${newLang}: ${untranslatedCount} elements not translated`);
        }
    }

    // Check element for translation issues
    checkElementForTranslationIssues(element) {
        // Check for data-i18n attributes
        if (element.hasAttribute('data-i18n')) {
            const key = element.getAttribute('data-i18n');
            const translation = window.i18n.t(key, {}, element.textContent);
            
            // Check for missing translations
            if (translation === key) {
                this.reportIssue('ERROR', `Missing translation for key: ${key}`);
            }
            
            // Check for empty translations
            if (translation === '' || translation === null) {
                this.reportIssue('ERROR', `Empty translation for key: ${key}`);
            }
        }
        
        // Check child elements
        const childElements = element.querySelectorAll('[data-i18n]');
        childElements.forEach(child => this.checkElementForTranslationIssues(child));
    }

    // Check text for translation issues
    checkTextForTranslationIssues(textNode) {
        const text = textNode.textContent;
        
        // Check for placeholder text
        if (text.includes('{{') || text.includes('undefined')) {
            this.reportIssue('ERROR', `Placeholder text found: ${text}`);
        }
        
        // Check for Unicode issues (especially Tamil)
        if (text.includes('?') || text.includes('') || text.includes('□')) {
            this.reportIssue('ERROR', `Unicode rendering issue: ${text}`);
        }
    }

    // Perform periodic checks
    performPeriodicChecks() {
        // Check for stuck translations
        this.checkForStuckTranslations();
        
        // Check for missing elements
        this.checkForMissingElements();
        
        // Check for inconsistent state
        this.checkForInconsistentState();
    }

    // Check for stuck translations
    checkForStuckTranslations() {
        const currentLang = window.i18n.currentLang;
        const i18nElements = document.querySelectorAll('[data-i18n]');
        
        let stuckCount = 0;
        i18nElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = window.i18n.t(key, {}, element.textContent);
            
            if (translation !== element.textContent && currentLang !== 'en') {
                stuckCount++;
            }
        });
        
        if (stuckCount > 0) {
            this.reportIssue('WARNING', `${stuckCount} elements have stuck translations in ${currentLang}`);
        }
    }

    // Check for missing elements
    checkForMissingElements() {
        const requiredElements = [
            '[data-i18n="app.title"]',
            '[data-i18n="navigation.chooseRoutine"]',
            '#language-selector'
        ];
        
        requiredElements.forEach(selector => {
            if (!document.querySelector(selector)) {
                this.reportIssue('ERROR', `Missing required element: ${selector}`);
            }
        });
    }

    // Check for inconsistent state
    checkForInconsistentState() {
        // Check if language selector matches current language
        const languageCode = document.getElementById('current-language');
        const currentLang = window.i18n.currentLang;
        
        if (languageCode && languageCode.textContent !== currentLang.toUpperCase()) {
            this.reportIssue('WARNING', `Language selector mismatch: ${languageCode.textContent} vs ${currentLang}`);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Listen for language change events
        document.addEventListener('languageChanged', (event) => {
            this.reportIssue('INFO', `Language changed to: ${event.detail.language}`);
        });
        
        // Listen for routine selection
        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-routine]')) {
                setTimeout(() => {
                    this.checkRoutineTranslation();
                }, 200);
            }
        });
    }

    // Check routine translation
    checkRoutineTranslation() {
        const exerciseName = document.getElementById('exercise-name');
        const exerciseDesc = document.getElementById('exercise-description');
        
        if (exerciseName && exerciseDesc) {
            const currentLang = window.i18n.currentLang;
            
            // Check if exercise is translated
            if (exerciseName.textContent === 'Neck Rolls' && currentLang !== 'en') {
                this.reportIssue('WARNING', `Exercise not translated in ${currentLang}: ${exerciseName.textContent}`);
            }
        }
    }

    // Report an issue
    reportIssue(severity, message) {
        const issue = {
            severity,
            message,
            timestamp: Date.now(),
            language: window.i18n.currentLang,
            url: window.location.href
        };
        
        this.issues.push(issue);
        
        // Log to console
        const emoji = severity === 'ERROR' ? '❌' : severity === 'WARNING' ? '⚠️' : 'ℹ️';
        console.log(`${emoji} [${severity}] ${message}`);
        
        // Show notification for critical issues
        if (severity === 'ERROR') {
            this.showNotification(message, 'error');
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#ff4444' : type === 'warning' ? '#ffaa00' : '#4444ff'};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10001;
            font-family: monospace;
            font-size: 12px;
            max-width: 80%;
            text-align: center;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Get monitoring report
    getReport() {
        return {
            isMonitoring: this.isMonitoring,
            totalIssues: this.issues.length,
            issuesBySeverity: this.issues.reduce((acc, issue) => {
                acc[issue.severity] = (acc[issue.severity] || 0) + 1;
                return acc;
            }, {}),
            recentIssues: this.issues.slice(-10),
            languageHistory: this.languageHistory.slice(-10)
        };
    }

    // Clear issues
    clearIssues() {
        this.issues = [];
        console.log('🧹 Translation issues cleared');
    }
}

// Auto-start monitoring when page loads (DISABLED to prevent background activity)
if (typeof window !== 'undefined') {
    window.translationMonitor = new TranslationMonitor();
    
    // Don't auto-start monitoring to prevent background activity
    // Uncomment the lines below if you want to enable monitoring
    // setTimeout(() => {
    //     if (window.i18n) {
    //         window.translationMonitor.startMonitoring();
    //     }
    // }, 1000);
    
    console.log('🔍 Translation Monitor loaded (not auto-started)!');
    console.log('Use: window.translationMonitor.startMonitoring() to start');
    console.log('Use: window.translationMonitor.getReport() to see issues');
    console.log('Use: window.translationMonitor.stopMonitoring() to stop');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationMonitor;
}
