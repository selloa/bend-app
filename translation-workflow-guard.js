// Translation Workflow Guard
// Prevents future translation errors by enforcing best practices

class TranslationWorkflowGuard {
    constructor() {
        this.isActive = false;
        this.violations = [];
        this.bestPractices = {
            // Required patterns
            requiredPatterns: [
                {
                    name: 'data-i18n attributes',
                    pattern: /data-i18n="[^"]+"/,
                    message: 'All user-facing text must have data-i18n attributes',
                    severity: 'error'
                },
                {
                    name: 'translation keys format',
                    pattern: /data-i18n="[a-z]+\.[a-z]+(\.[a-z]+)*"/,
                    message: 'Translation keys must follow dot notation (e.g., "navigation.back")',
                    severity: 'error'
                }
            ],
            
            // Forbidden patterns
            forbiddenPatterns: [
                {
                    name: 'hardcoded English text',
                    pattern: /"[A-Z][a-z]+ [A-Z][a-z]+"/,
                    message: 'Avoid hardcoded English text - use translation keys instead',
                    severity: 'warning'
                },
                {
                    name: 'inline text content',
                    pattern: /textContent\s*=\s*"[^"]*"/,
                    message: 'Avoid setting textContent directly - use translation system',
                    severity: 'warning'
                },
                {
                    name: 'innerHTML with text',
                    pattern: /innerHTML\s*=\s*"[^"]*[A-Za-z]+[^"]*"/,
                    message: 'Avoid setting innerHTML with text - use translation system',
                    severity: 'warning'
                }
            ],
            
            // Best practice patterns
            bestPracticePatterns: [
                {
                    name: 'proper translation key structure',
                    pattern: /data-i18n="(app|navigation|timer|routines|folders|exercises|accessibility|editorial|share)\.[a-z]+(\.[a-z]+)*"/,
                    message: 'Good: Using proper translation key structure',
                    severity: 'info'
                }
            ]
        };
    }

    // Activate the workflow guard
    activate() {
        this.isActive = true;
        console.log('🛡️ Translation Workflow Guard activated');
        
        // Set up monitoring
        this.setupDOMMonitoring();
        this.setupConsoleMonitoring();
        this.setupFileMonitoring();
        
        // Show activation message
        this.showActivationMessage();
    }

    // Deactivate the workflow guard
    deactivate() {
        this.isActive = false;
        console.log('🛡️ Translation Workflow Guard deactivated');
        this.hideActivationMessage();
    }

    // Set up DOM monitoring for new elements
    setupDOMMonitoring() {
        const observer = new MutationObserver((mutations) => {
            if (!this.isActive) return;
            
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.checkElement(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Set up console monitoring for translation-related operations
    setupConsoleMonitoring() {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = (...args) => {
            this.checkConsoleMessage(args.join(' '), 'log');
            originalLog.apply(console, args);
        };
        
        console.warn = (...args) => {
            this.checkConsoleMessage(args.join(' '), 'warn');
            originalWarn.apply(console, args);
        };
        
        console.error = (...args) => {
            this.checkConsoleMessage(args.join(' '), 'error');
            originalError.apply(console, args);
        };
    }

    // Set up file monitoring (placeholder for future implementation)
    setupFileMonitoring() {
        // This would require server-side implementation
        // For now, we'll provide guidance
        console.log('📁 File monitoring would require server-side implementation');
    }

    // Check an element for translation violations
    checkElement(element) {
        if (!this.isActive) return;
        
        // Check for required patterns
        this.bestPractices.requiredPatterns.forEach(pattern => {
            if (!pattern.pattern.test(element.outerHTML)) {
                // Check if element contains user-facing text
                if (this.containsUserFacingText(element)) {
                    this.recordViolation({
                        type: 'missing_required',
                        element: element,
                        pattern: pattern.name,
                        message: pattern.message,
                        severity: pattern.severity
                    });
                }
            }
        });
        
        // Check for forbidden patterns
        this.bestPractices.forbiddenPatterns.forEach(pattern => {
            if (pattern.pattern.test(element.outerHTML)) {
                this.recordViolation({
                    type: 'forbidden_pattern',
                    element: element,
                    pattern: pattern.name,
                    message: pattern.message,
                    severity: pattern.severity
                });
            }
        });
        
        // Check for best practices
        this.bestPractices.bestPracticePatterns.forEach(pattern => {
            if (pattern.pattern.test(element.outerHTML)) {
                this.recordViolation({
                    type: 'best_practice',
                    element: element,
                    pattern: pattern.name,
                    message: pattern.message,
                    severity: pattern.severity
                });
            }
        });
    }

    // Check if element contains user-facing text
    containsUserFacingText(element) {
        const text = element.textContent?.trim();
        if (!text) return false;
        
        // Skip script, style, and other non-content elements
        if (['SCRIPT', 'STYLE', 'META', 'LINK'].includes(element.tagName)) {
            return false;
        }
        
        // Check if text looks like user-facing content
        return text.length > 0 && /[A-Za-z]/.test(text) && text.length < 100;
    }

    // Check console messages for translation-related issues
    checkConsoleMessage(message, level) {
        if (!this.isActive) return;
        
        const translationKeywords = [
            'translation', 'i18n', 'localization', 'language',
            'hardcoded', 'english', 'text', 'string'
        ];
        
        if (translationKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
            this.recordViolation({
                type: 'console_message',
                message: message,
                level: level,
                severity: 'info'
            });
        }
    }

    // Record a violation
    recordViolation(violation) {
        violation.timestamp = new Date().toISOString();
        violation.id = Math.random().toString(36).substr(2, 9);
        
        this.violations.push(violation);
        
        // Show real-time feedback
        this.showViolationFeedback(violation);
        
        // Log to console
        const logMethod = violation.severity === 'error' ? console.error :
                         violation.severity === 'warning' ? console.warn : console.log;
        
        logMethod(`🛡️ Translation Guard: ${violation.message}`, violation);
    }

    // Show real-time violation feedback
    showViolationFeedback(violation) {
        const feedback = document.createElement('div');
        feedback.className = 'translation-guard-feedback';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: ${violation.severity === 'error' ? '#dc3545' : 
                        violation.severity === 'warning' ? '#ffc107' : '#17a2b8'};
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        feedback.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>🛡️ ${violation.message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    margin-left: 10px;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(feedback);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (feedback.parentElement) {
                feedback.remove();
            }
        }, 5000);
    }

    // Show activation message
    showActivationMessage() {
        const message = document.createElement('div');
        message.id = 'translation-guard-status';
        message.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #28a745;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-weight: bold;
        `;
        
        message.textContent = '🛡️ Translation Guard Active';
        document.body.appendChild(message);
    }

    // Hide activation message
    hideActivationMessage() {
        const message = document.getElementById('translation-guard-status');
        if (message) {
            message.remove();
        }
    }

    // Get violation report
    getViolationReport() {
        const report = {
            total: this.violations.length,
            bySeverity: {
                error: this.violations.filter(v => v.severity === 'error').length,
                warning: this.violations.filter(v => v.severity === 'warning').length,
                info: this.violations.filter(v => v.severity === 'info').length
            },
            byType: {},
            violations: this.violations
        };
        
        // Group by type
        this.violations.forEach(violation => {
            if (!report.byType[violation.type]) {
                report.byType[violation.type] = 0;
            }
            report.byType[violation.type]++;
        });
        
        return report;
    }

    // Show violation report
    showViolationReport() {
        const report = this.getViolationReport();
        
        console.log('\n🛡️ TRANSLATION WORKFLOW GUARD REPORT');
        console.log('='.repeat(50));
        console.log(`Total violations: ${report.total}`);
        console.log(`Errors: ${report.bySeverity.error}`);
        console.log(`Warnings: ${report.bySeverity.warning}`);
        console.log(`Info: ${report.bySeverity.info}`);
        
        if (report.total > 0) {
            console.log('\nViolations by type:');
            Object.keys(report.byType).forEach(type => {
                console.log(`  ${type}: ${report.byType[type]}`);
            });
            
            console.log('\nRecent violations:');
            report.violations.slice(-10).forEach(violation => {
                console.log(`  [${violation.severity.toUpperCase()}] ${violation.message}`);
            });
        } else {
            console.log('\n✅ No violations detected! Great job following translation best practices.');
        }
    }

    // Clear violations
    clearViolations() {
        this.violations = [];
        console.log('🛡️ Violations cleared');
    }

    // Get best practices guide
    getBestPracticesGuide() {
        return {
            title: 'Translation Best Practices Guide',
            rules: [
                {
                    rule: 'Always use data-i18n attributes',
                    description: 'Every user-facing text element must have a data-i18n attribute',
                    example: '<span data-i18n="navigation.back">Back</span>',
                    severity: 'error'
                },
                {
                    rule: 'Use proper translation key structure',
                    description: 'Translation keys should follow dot notation with meaningful sections',
                    example: 'navigation.back, routines.wakeUp, exercises.neckRolls.name',
                    severity: 'error'
                },
                {
                    rule: 'Avoid hardcoded English text',
                    description: 'Never hardcode English text in HTML or JavaScript',
                    example: '❌ <span>Start Exercise</span> ✅ <span data-i18n="navigation.start">Start</span>',
                    severity: 'warning'
                },
                {
                    rule: 'Use translation system for dynamic content',
                    description: 'Use the translation system even for dynamically generated content',
                    example: 'element.setAttribute("data-i18n", "exercises." + exerciseId + ".name")',
                    severity: 'warning'
                },
                {
                    rule: 'Test all languages',
                    description: 'Always test your changes in all supported languages',
                    example: 'Switch between English, German, Spanish, and Tamil',
                    severity: 'info'
                }
            ]
        };
    }

    // Show best practices guide
    showBestPracticesGuide() {
        const guide = this.getBestPracticesGuide();
        
        console.log(`\n📚 ${guide.title}`);
        console.log('='.repeat(50));
        
        guide.rules.forEach((rule, index) => {
            console.log(`\n${index + 1}. ${rule.rule} [${rule.severity.toUpperCase()}]`);
            console.log(`   ${rule.description}`);
            console.log(`   Example: ${rule.example}`);
        });
    }
}

// Initialize the workflow guard
window.translationWorkflowGuard = new TranslationWorkflowGuard();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .translation-guard-feedback {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationWorkflowGuard;
}
