// New Data Integration - Demonstrates the new scalable data structure
// This file shows how the new system works and can be easily extended

class NewDataIntegration {
    constructor() {
        this.isNewSystemActive = false;
        this.demoExercises = [];
        this.demoRoutines = [];
    }

    // Initialize the new data system
    async initialize() {
        console.log('🚀 Initializing new scalable data system...');
        
        try {
            // Load some sample exercises using the new data manager
            await this.loadSampleExercises();
            await this.loadSampleRoutines();
            
            // Add new UI elements to demonstrate the difference
            this.addNewSystemUI();
            
            console.log('✅ New data system initialized successfully!');
            console.log(`Loaded ${this.demoExercises.length} exercises and ${this.demoRoutines.length} routines`);
            
        } catch (error) {
            console.error('❌ Failed to initialize new data system:', error);
            // Fallback to old system
            this.isNewSystemActive = false;
        }
    }

    // Load sample exercises using the new data manager
    async loadSampleExercises() {
        if (!window.dataManager) {
            console.warn('Data manager not available, using fallback');
            return;
        }

        try {
            // Load exercises from the new JSON files
            const exerciseIds = ['neck-rolls', 'shoulder-shrugs', 'side-neck-stretch'];
            
            for (const exerciseId of exerciseIds) {
                try {
                    const exercise = await window.dataManager.loadExercise(exerciseId);
                    this.demoExercises.push(exercise);
                    console.log(`✅ Loaded exercise: ${exercise.name}`);
                } catch (error) {
                    console.warn(`⚠️ Could not load exercise ${exerciseId}:`, error.message);
                }
            }
            
        } catch (error) {
            console.error('Error loading sample exercises:', error);
        }
    }

    // Load sample routines using the new data manager
    async loadSampleRoutines() {
        if (!window.dataManager) {
            console.warn('Data manager not available, using fallback');
            return;
        }

        try {
            // Load routines from the new JSON files
            const routineIds = ['wake-up'];
            
            for (const routineId of routineIds) {
                try {
                    const routine = await window.dataManager.loadRoutine(routineId);
                    this.demoRoutines.push(routine);
                    console.log(`✅ Loaded routine: ${routine.name}`);
                } catch (error) {
                    console.warn(`⚠️ Could not load routine ${routineId}:`, error.message);
                }
            }
            
        } catch (error) {
            console.error('Error loading sample routines:', error);
        }
    }

    // Add new UI elements to show the difference
    addNewSystemUI() {
        // Add a toggle button to switch between old and new systems
        const header = document.querySelector('.header-content');
        if (!header) return;

        const toggleButton = document.createElement('button');
        toggleButton.id = 'data-system-toggle';
        toggleButton.className = 'data-system-toggle';
        toggleButton.innerHTML = `
            <span class="toggle-icon">🔄</span>
            <span class="toggle-text">New Data System</span>
        `;
        toggleButton.title = 'Toggle between old and new data systems';
        
        // Style the button
        toggleButton.style.cssText = `
            background: var(--accent-primary);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-left: 10px;
            transition: all 0.2s ease;
        `;

        toggleButton.addEventListener('click', () => {
            this.toggleDataSystem();
        });

        // Add to header controls
        const headerControls = header.querySelector('.header-controls') || header;
        headerControls.appendChild(toggleButton);

        // Add a status indicator
        this.addStatusIndicator();
    }

    // Add status indicator
    addStatusIndicator() {
        const statusDiv = document.createElement('div');
        statusDiv.id = 'data-system-status';
        statusDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 1000;
            display: none;
        `;
        statusDiv.textContent = 'New Data System Active';
        document.body.appendChild(statusDiv);
    }

    // Toggle between old and new data systems
    toggleDataSystem() {
        this.isNewSystemActive = !this.isNewSystemActive;
        
        const toggleButton = document.getElementById('data-system-toggle');
        const statusDiv = document.getElementById('data-system-status');
        
        if (this.isNewSystemActive) {
            // Activate new system
            toggleButton.style.background = 'var(--accent-secondary)';
            toggleButton.querySelector('.toggle-text').textContent = 'New System ON';
            statusDiv.style.display = 'block';
            
            // Show new system capabilities
            this.demonstrateNewSystem();
            
        } else {
            // Deactivate new system
            toggleButton.style.background = 'var(--accent-primary)';
            toggleButton.querySelector('.toggle-text').textContent = 'New Data System';
            statusDiv.style.display = 'none';
            
            // Hide new system features
            this.hideNewSystemFeatures();
        }
    }

    // Demonstrate new system capabilities
    demonstrateNewSystem() {
        console.log('🎯 Demonstrating new data system capabilities...');
        
        // Show exercise search functionality
        this.showExerciseSearch();
        
        // Show translation capabilities
        this.showTranslationDemo();
        
        // Show data structure benefits
        this.showDataStructureInfo();
    }

    // Show exercise search functionality
    showExerciseSearch() {
        // Add search interface
        const routineSelection = document.getElementById('routine-selection');
        if (!routineSelection) return;

        const searchDiv = document.createElement('div');
        searchDiv.id = 'exercise-search-demo';
        searchDiv.style.cssText = `
            background: var(--bg-secondary);
            border: 2px solid var(--accent-primary);
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        `;
        
        searchDiv.innerHTML = `
            <h3 style="color: var(--accent-primary); margin-bottom: 10px;">🔍 New System: Exercise Search</h3>
            <p style="margin-bottom: 10px;">Search exercises by name, category, or difficulty:</p>
            <input type="text" id="exercise-search-input" placeholder="Search exercises..." 
                   style="padding: 8px; border-radius: 5px; border: 1px solid var(--border-primary); width: 200px; margin-right: 10px;">
            <button id="search-exercises-btn" style="padding: 8px 15px; background: var(--accent-primary); color: white; border: none; border-radius: 5px; cursor: pointer;">Search</button>
            <div id="search-results" style="margin-top: 10px; text-align: left;"></div>
        `;

        routineSelection.appendChild(searchDiv);

        // Add search functionality
        document.getElementById('search-exercises-btn').addEventListener('click', () => {
            this.performExerciseSearch();
        });

        document.getElementById('exercise-search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performExerciseSearch();
            }
        });
    }

    // Perform exercise search
    performExerciseSearch() {
        const query = document.getElementById('exercise-search-input').value;
        const resultsDiv = document.getElementById('search-results');
        
        if (!window.dataManager) {
            resultsDiv.innerHTML = '<p style="color: red;">Data manager not available</p>';
            return;
        }

        const results = window.dataManager.searchExercises(query);
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No exercises found matching your search.</p>';
            return;
        }

        resultsDiv.innerHTML = `
            <h4>Found ${results.length} exercises:</h4>
            <ul style="list-style: none; padding: 0;">
                ${results.map(exercise => `
                    <li style="background: var(--bg-tertiary); margin: 5px 0; padding: 10px; border-radius: 5px; border-left: 4px solid var(--accent-primary);">
                        <strong>${exercise.name}</strong> (${exercise.category})<br>
                        <small>${exercise.description}</small><br>
                        <span style="color: var(--accent-secondary);">Tags: ${exercise.tags ? exercise.tags.join(', ') : 'none'}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // Show translation demo
    showTranslationDemo() {
        const searchDiv = document.getElementById('exercise-search-demo');
        if (!searchDiv) return;

        const translationDiv = document.createElement('div');
        translationDiv.style.cssText = `
            margin-top: 15px;
            padding: 10px;
            background: var(--bg-tertiary);
            border-radius: 5px;
        `;
        
        translationDiv.innerHTML = `
            <h4 style="color: var(--accent-primary); margin-bottom: 10px;">🌍 Translation Demo</h4>
            <p>Exercise names in different languages:</p>
            <div id="translation-examples"></div>
        `;

        searchDiv.appendChild(translationDiv);

        // Show translation examples
        this.showTranslationExamples();
    }

    // Show translation examples
    showTranslationExamples() {
        const examplesDiv = document.getElementById('translation-examples');
        
        if (this.demoExercises.length === 0) {
            examplesDiv.innerHTML = '<p>No exercises loaded to demonstrate translations.</p>';
            return;
        }

        const exercise = this.demoExercises[0];
        const languages = ['en', 'de', 'es'];
        
        examplesDiv.innerHTML = languages.map(lang => {
            const translated = window.dataManager.getTranslatedExercise(exercise.id, lang);
            const langNames = { en: 'English', de: 'Deutsch', es: 'Español' };
            
            return `
                <div style="margin: 5px 0; padding: 5px; background: white; border-radius: 3px;">
                    <strong>${langNames[lang]}:</strong> ${translated.name}
                </div>
            `;
        }).join('');
    }

    // Show data structure information
    showDataStructureInfo() {
        const searchDiv = document.getElementById('exercise-search-demo');
        if (!searchDiv) return;

        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            margin-top: 15px;
            padding: 10px;
            background: var(--accent-primary);
            color: white;
            border-radius: 5px;
        `;
        
        infoDiv.innerHTML = `
            <h4 style="margin-bottom: 10px;">📊 New Data Structure Benefits</h4>
            <ul style="margin: 0; padding-left: 20px;">
                <li>✅ Modular JSON files (easy to add/remove exercises)</li>
                <li>✅ Full internationalization support</li>
                <li>✅ Advanced search and filtering</li>
                <li>✅ Caching and performance optimization</li>
                <li>✅ User-created custom routines</li>
                <li>✅ Version control friendly</li>
            </ul>
        `;

        searchDiv.appendChild(infoDiv);
    }

    // Hide new system features
    hideNewSystemFeatures() {
        const searchDiv = document.getElementById('exercise-search-demo');
        if (searchDiv) {
            searchDiv.remove();
        }
    }

    // Get system status
    getStatus() {
        return {
            isActive: this.isNewSystemActive,
            exercisesLoaded: this.demoExercises.length,
            routinesLoaded: this.demoRoutines.length,
            dataManagerAvailable: !!window.dataManager
        };
    }
}

// Initialize the new data integration
window.newDataIntegration = new NewDataIntegration();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other systems to load
    setTimeout(() => {
        window.newDataIntegration.initialize();
    }, 1000);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewDataIntegration;
}
