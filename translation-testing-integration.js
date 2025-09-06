// Translation Testing Integration - Adds testing tools to main app
// This script adds testing capabilities to the main Bend app

(function() {
    'use strict';

    // Add testing tools to the main app
    function addTestingTools() {
        // Create testing panel
        const testingPanel = document.createElement('div');
        testingPanel.id = 'translation-testing-panel';
        testingPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
            display: none;
        `;

        testingPanel.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #ffd700;">🧪 Translation Testing</h4>
            <div style="margin-bottom: 10px;">
                <button onclick="runQuickTranslationTest()" style="background: #2ecc71; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin: 2px;">Quick Test</button>
                <button onclick="toggleTranslationMonitoring()" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin: 2px;">Toggle Monitor</button>
            </div>
            <div style="margin-bottom: 10px;">
                <button onclick="showTranslationReport()" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin: 2px;">Show Report</button>
                <button onclick="clearTranslationIssues()" style="background: #f39c12; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin: 2px;">Clear Issues</button>
            </div>
            <div id="testing-status" style="font-size: 10px; color: #95a5a6;"></div>
        `;

        document.body.appendChild(testingPanel);

        // Add toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'translation-testing-toggle';
        toggleButton.innerHTML = '🧪';
        toggleButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 10001;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;

        toggleButton.addEventListener('click', () => {
            const panel = document.getElementById('translation-testing-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        document.body.appendChild(toggleButton);
    }

    // Quick translation test function
    window.runQuickTranslationTest = async function() {
        const statusDiv = document.getElementById('testing-status');
        statusDiv.textContent = 'Running quick test...';
        
        try {
            // Check if testing tools are available
            if (typeof TranslationValidator === 'undefined') {
                statusDiv.textContent = 'Testing tools not loaded';
                return;
            }

            // Run validation
            const validationResults = await TranslationValidator.quickValidate();
            
            // Run testing suite
            const testResults = await TranslationTestingSuite.quickTest();
            
            // Update status
            const totalIssues = validationResults.invalid + testResults.failed;
            const totalWarnings = validationResults.warnings + testResults.warnings;
            
            if (totalIssues > 0) {
                statusDiv.textContent = `❌ ${totalIssues} issues, ${totalWarnings} warnings`;
                statusDiv.style.color = '#e74c3c';
            } else if (totalWarnings > 0) {
                statusDiv.textContent = `⚠️ ${totalWarnings} warnings`;
                statusDiv.style.color = '#f39c12';
            } else {
                statusDiv.textContent = '✅ All tests passed';
                statusDiv.style.color = '#2ecc71';
            }
            
        } catch (error) {
            statusDiv.textContent = `Error: ${error.message}`;
            statusDiv.style.color = '#e74c3c';
        }
    };

    // Toggle translation monitoring
    window.toggleTranslationMonitoring = function() {
        if (typeof window.translationMonitor === 'undefined') {
            document.getElementById('testing-status').textContent = 'Monitor not available';
            return;
        }

        if (window.translationMonitor.isMonitoring) {
            window.translationMonitor.stopMonitoring();
            document.getElementById('testing-status').textContent = 'Monitoring stopped';
        } else {
            window.translationMonitor.startMonitoring();
            document.getElementById('testing-status').textContent = 'Monitoring started';
        }
    };

    // Show translation report
    window.showTranslationReport = function() {
        if (typeof window.translationMonitor === 'undefined') {
            document.getElementById('testing-status').textContent = 'Monitor not available';
            return;
        }

        const report = window.translationMonitor.getReport();
        const statusDiv = document.getElementById('testing-status');
        
        statusDiv.innerHTML = `
            <div style="margin-bottom: 5px;">
                <strong>Monitoring:</strong> ${report.isMonitoring ? 'Active' : 'Inactive'}
            </div>
            <div style="margin-bottom: 5px;">
                <strong>Total Issues:</strong> ${report.totalIssues}
            </div>
            <div style="font-size: 9px;">
                ${Object.entries(report.issuesBySeverity).map(([severity, count]) => 
                    `${severity}: ${count}`
                ).join(', ')}
            </div>
        `;
    };

    // Clear translation issues
    window.clearTranslationIssues = function() {
        if (typeof window.translationMonitor === 'undefined') {
            document.getElementById('testing-status').textContent = 'Monitor not available';
            return;
        }

        window.translationMonitor.clearIssues();
        document.getElementById('testing-status').textContent = 'Issues cleared';
    };

    // Add keyboard shortcut for testing
    document.addEventListener('keydown', function(event) {
        // Ctrl+Shift+T for testing panel
        if (event.ctrlKey && event.shiftKey && event.key === 'T') {
            event.preventDefault();
            const panel = document.getElementById('translation-testing-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
        
        // Ctrl+Shift+R for quick test
        if (event.ctrlKey && event.shiftKey && event.key === 'R') {
            event.preventDefault();
            runQuickTranslationTest();
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addTestingTools);
    } else {
        addTestingTools();
    }

    // Add console commands for easy testing
    console.log('🧪 Translation Testing Tools loaded!');
    console.log('Available commands:');
    console.log('  - runQuickTranslationTest()');
    console.log('  - toggleTranslationMonitoring()');
    console.log('  - showTranslationReport()');
    console.log('  - clearTranslationIssues()');
    console.log('Keyboard shortcuts:');
    console.log('  - Ctrl+Shift+T: Toggle testing panel');
    console.log('  - Ctrl+Shift+R: Run quick test');

})();
