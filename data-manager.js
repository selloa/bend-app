// Tend App - Data Management System
// Handles loading, caching, and managing exercise and routine data

class ExerciseDataManager {
    constructor() {
        this.exercises = new Map();
        this.routines = new Map();
        this.folders = new Map();
        this.translations = new Map();
        this.currentLanguage = 'en';
        this.loadingPromises = new Map(); // Prevent duplicate loading
    }

    // Load a single exercise by ID
    async loadExercise(exerciseId) {
        if (this.exercises.has(exerciseId)) {
            return this.exercises.get(exerciseId);
        }

        // Check if already loading
        if (this.loadingPromises.has(exerciseId)) {
            return this.loadingPromises.get(exerciseId);
        }

        const loadPromise = this._fetchExercise(exerciseId);
        this.loadingPromises.set(exerciseId, loadPromise);

        try {
            const exercise = await loadPromise;
            this.exercises.set(exerciseId, exercise);
            this.loadingPromises.delete(exerciseId);
            return exercise;
        } catch (error) {
            this.loadingPromises.delete(exerciseId);
            console.error(`Failed to load exercise ${exerciseId}:`, error);
            throw error;
        }
    }

    // Internal method to fetch exercise from file
    async _fetchExercise(exerciseId) {
        // Try to determine category from exercise ID or search all categories
        const categories = ['neck-shoulders', 'back-spine', 'hips', 'arms-wrists', 'legs-hips', 'feet-ankles', 'core', 'full-body'];
        
        for (const category of categories) {
            try {
                const response = await fetch(`./data/exercises/${category}/${exerciseId}.json`);
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                // Continue to next category
                continue;
            }
        }
        
        throw new Error(`Exercise ${exerciseId} not found in any category`);
    }

    // Load a routine by ID
    async loadRoutine(routineId) {
        if (this.routines.has(routineId)) {
            return this.routines.get(routineId);
        }

        if (this.loadingPromises.has(routineId)) {
            return this.loadingPromises.get(routineId);
        }

        const loadPromise = this._fetchRoutine(routineId);
        this.loadingPromises.set(routineId, loadPromise);

        try {
            const routine = await loadPromise;
            
            // Load exercise details for each exercise in the routine
            routine.exercises = await Promise.all(
                routine.exercises.map(async (ex) => {
                    const exerciseData = await this.loadExercise(ex.exerciseId);
                    return {
                        ...exerciseData,
                        duration: ex.duration || exerciseData.defaultDuration,
                        order: ex.order,
                        needsSideSwitch: ex.needsSideSwitch !== undefined ? ex.needsSideSwitch : exerciseData.needsSideSwitch
                    };
                })
            );
            
            this.routines.set(routineId, routine);
            this.loadingPromises.delete(routineId);
            return routine;
        } catch (error) {
            this.loadingPromises.delete(routineId);
            console.error(`Failed to load routine ${routineId}:`, error);
            throw error;
        }
    }

    // Internal method to fetch routine from file
    async _fetchRoutine(routineId) {
        const response = await fetch(`./data/routines/${routineId}.json`);
        if (!response.ok) {
            throw new Error(`Routine ${routineId} not found`);
        }
        return await response.json();
    }

    // Load a folder by ID
    async loadFolder(folderId) {
        if (this.folders.has(folderId)) {
            return this.folders.get(folderId);
        }

        if (this.loadingPromises.has(folderId)) {
            return this.loadingPromises.get(folderId);
        }

        const loadPromise = this._fetchFolder(folderId);
        this.loadingPromises.set(folderId, loadPromise);

        try {
            const folder = await loadPromise;
            
            // Load all routines in the folder
            const routinePromises = Object.keys(folder.routines).map(routineId => 
                this.loadRoutine(routineId)
            );
            
            const routines = await Promise.all(routinePromises);
            folder.loadedRoutines = routines;
            
            this.folders.set(folderId, folder);
            this.loadingPromises.delete(folderId);
            return folder;
        } catch (error) {
            this.loadingPromises.delete(folderId);
            console.error(`Failed to load folder ${folderId}:`, error);
            throw error;
        }
    }

    // Internal method to fetch folder from file
    async _fetchFolder(folderId) {
        const response = await fetch(`./data/folders/${folderId}.json`);
        if (!response.ok) {
            throw new Error(`Folder ${folderId} not found`);
        }
        return await response.json();
    }

    // Get translated exercise
    getTranslatedExercise(exerciseId, language = null) {
        const exercise = this.exercises.get(exerciseId);
        if (!exercise) {
            return null;
        }

        const lang = language || this.currentLanguage;
        const translation = exercise.translations && exercise.translations[lang];
        
        if (!translation) {
            // Fallback to English or original data
            const fallback = exercise.translations && exercise.translations.en;
            if (fallback) {
                return {
                    ...exercise,
                    name: fallback.name,
                    description: fallback.description,
                    instructions: fallback.instructions
                };
            }
            return exercise;
        }

        return {
            ...exercise,
            name: translation.name,
            description: translation.description,
            instructions: translation.instructions
        };
    }

    // Get translated routine
    getTranslatedRoutine(routineId, language = null) {
        const routine = this.routines.get(routineId);
        if (!routine) {
            return null;
        }

        const lang = language || this.currentLanguage;
        const translation = routine.translations && routine.translations[lang];
        
        if (!translation) {
            const fallback = routine.translations && routine.translations.en;
            if (fallback) {
                return {
                    ...routine,
                    name: fallback.name,
                    description: fallback.description
                };
            }
            return routine;
        }

        return {
            ...routine,
            name: translation.name,
            description: translation.description
        };
    }

    // Set current language
    setLanguage(language) {
        this.currentLanguage = language;
    }

    // Search exercises with filters
    searchExercises(query = '', filters = {}) {
        const results = [];
        
        for (const exercise of this.exercises.values()) {
            const translatedExercise = this.getTranslatedExercise(exercise.id);
            
            // Check query match
            const matchesQuery = !query || 
                translatedExercise.name.toLowerCase().includes(query.toLowerCase()) ||
                translatedExercise.description.toLowerCase().includes(query.toLowerCase()) ||
                (exercise.tags && exercise.tags.some(tag => tag.includes(query.toLowerCase())));
            
            // Check filter matches
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (key === 'category') return exercise.category === value;
                if (key === 'difficulty') return exercise.difficulty === value;
                if (key === 'position') return exercise.position === value;
                if (key === 'equipment') return exercise.equipment === value;
                if (key === 'muscleGroups') return exercise.muscleGroups && exercise.muscleGroups.includes(value);
                if (key === 'needsSideSwitch') return exercise.needsSideSwitch === value;
                return true;
            });
            
            if (matchesQuery && matchesFilters) {
                results.push(translatedExercise);
            }
        }
        
        return results;
    }

    // Get exercises by category
    getExercisesByCategory(category) {
        return this.searchExercises('', { category });
    }

    // Get all available categories
    getCategories() {
        const categories = new Set();
        for (const exercise of this.exercises.values()) {
            if (exercise.category) {
                categories.add(exercise.category);
            }
        }
        return Array.from(categories);
    }

    // Get all available difficulties
    getDifficulties() {
        const difficulties = new Set();
        for (const exercise of this.exercises.values()) {
            if (exercise.difficulty) {
                difficulties.add(exercise.difficulty);
            }
        }
        return Array.from(difficulties);
    }

    // Get all available positions
    getPositions() {
        const positions = new Set();
        for (const exercise of this.exercises.values()) {
            if (exercise.position) {
                positions.add(exercise.position);
            }
        }
        return Array.from(positions);
    }

    // Create a custom routine
    createCustomRoutine(name, description, exerciseIds, durations = []) {
        const routine = {
            id: `custom-${Date.now()}`,
            name: name,
            description: description,
            category: 'custom',
            difficulty: 'mixed',
            targetDuration: durations.reduce((sum, dur) => sum + dur, 0),
            exercises: exerciseIds.map((exerciseId, index) => ({
                exerciseId: exerciseId,
                duration: durations[index] || 30,
                order: index + 1
            })),
            isCustom: true,
            created: new Date().toISOString()
        };

        this.routines.set(routine.id, routine);
        return routine;
    }

    // Save custom routine to localStorage
    saveCustomRoutine(routine) {
        const customRoutines = this.getCustomRoutines();
        customRoutines[routine.id] = routine;
        localStorage.setItem('bend-custom-routines', JSON.stringify(customRoutines));
    }

    // Get custom routines from localStorage
    getCustomRoutines() {
        const stored = localStorage.getItem('bend-custom-routines');
        return stored ? JSON.parse(stored) : {};
    }

    // Load all custom routines
    loadCustomRoutines() {
        const customRoutines = this.getCustomRoutines();
        for (const [id, routine] of Object.entries(customRoutines)) {
            this.routines.set(id, routine);
        }
    }

    // Clear cache
    clearCache() {
        this.exercises.clear();
        this.routines.clear();
        this.folders.clear();
        this.translations.clear();
        this.loadingPromises.clear();
    }

    // Get cache statistics
    getCacheStats() {
        return {
            exercises: this.exercises.size,
            routines: this.routines.size,
            folders: this.folders.size,
            loading: this.loadingPromises.size
        };
    }
}

// Initialize global data manager
window.dataManager = new ExerciseDataManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExerciseDataManager;
}
