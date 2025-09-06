// Bend App - Data Migration Tool
// Migrates from current hardcoded structure to new modular JSON files

class DataMigrationTool {
    constructor() {
        this.exercises = new Map();
        this.routines = new Map();
        this.folders = new Map();
        this.exerciseCounter = 0;
    }

    // Main migration method
    async migrateFromCurrentStructure() {
        console.log('Starting migration from current structure...');
        
        try {
            // Extract exercises from current bendRoutines
            await this.extractExercisesFromRoutines();
            
            // Extract exercises from bodyAreaFolders
            await this.extractExercisesFromFolders();
            
            // Generate exercise files
            await this.generateExerciseFiles();
            
            // Generate routine files
            await this.generateRoutineFiles();
            
            // Generate folder files
            await this.generateFolderFiles();
            
            console.log('Migration completed successfully!');
            console.log(`Generated ${this.exercises.size} exercises, ${this.routines.size} routines, ${this.folders.size} folders`);
            
        } catch (error) {
            console.error('Migration failed:', error);
            throw error;
        }
    }

    // Extract exercises from bendRoutines
    async extractExercisesFromRoutines() {
        console.log('Extracting exercises from bendRoutines...');
        
        for (const [routineId, routine] of Object.entries(bendRoutines)) {
            const routineData = {
                id: routineId,
                name: routine.name,
                description: routine.description,
                category: this.determineRoutineCategory(routineId),
                difficulty: this.determineDifficulty(routine),
                targetDuration: this.parseDuration(routine.duration),
                exercises: [],
                translations: {
                    en: {
                        name: routine.name,
                        description: routine.description
                    }
                }
            };

            // Process each exercise in the routine
            routine.exercises.forEach((exercise, index) => {
                const exerciseId = this.generateExerciseId(exercise.name, routineId);
                
                // Store exercise data
                this.exercises.set(exerciseId, {
                    id: exerciseId,
                    name: exercise.name,
                    description: exercise.description,
                    duration: exercise.duration,
                    emoji: exercise.emoji,
                    needsSideSwitch: exercise.needsSideSwitch || false,
                    category: this.determineExerciseCategory(exercise.name, routineId),
                    difficulty: 'beginner', // Default for now
                    position: this.determinePosition(exercise.description),
                    equipment: 'none', // Default for now
                    muscleGroups: this.determineMuscleGroups(exercise.name, exercise.description),
                    defaultDuration: exercise.duration,
                    tags: this.generateTags(exercise.name, exercise.description),
                    translations: {
                        en: {
                            name: exercise.name,
                            description: exercise.description,
                            instructions: this.generateInstructions(exercise.description)
                        }
                    }
                });

                // Add to routine
                routineData.exercises.push({
                    exerciseId: exerciseId,
                    duration: exercise.duration,
                    order: index + 1,
                    needsSideSwitch: exercise.needsSideSwitch || false
                });
            });

            this.routines.set(routineId, routineData);
        }
    }

    // Extract exercises from bodyAreaFolders
    async extractExercisesFromFolders() {
        console.log('Extracting exercises from bodyAreaFolders...');
        
        for (const [folderId, folder] of Object.entries(bodyAreaFolders)) {
            const folderData = {
                id: folderId,
                name: folder.name,
                icon: folder.icon,
                description: folder.description,
                routines: {},
                translations: {
                    en: {
                        name: folder.name,
                        description: folder.description
                    }
                }
            };

            // Process each routine in the folder
            for (const [routineId, routine] of Object.entries(folder.routines)) {
                const routineData = {
                    id: routineId,
                    name: routine.name,
                    description: routine.description,
                    category: folderId,
                    difficulty: this.determineDifficulty(routine),
                    targetDuration: this.parseDuration(routine.duration),
                    exercises: [],
                    translations: {
                        en: {
                            name: routine.name,
                            description: routine.description
                        }
                    }
                };

                // Process each exercise in the routine
                routine.exercises.forEach((exercise, index) => {
                    const exerciseId = this.generateExerciseId(exercise.name, routineId);
                    
                    // Store exercise data if not already exists
                    if (!this.exercises.has(exerciseId)) {
                        this.exercises.set(exerciseId, {
                            id: exerciseId,
                            name: exercise.name,
                            description: exercise.description,
                            duration: exercise.duration,
                            emoji: exercise.emoji,
                            needsSideSwitch: exercise.needsSideSwitch || false,
                            category: folderId,
                            difficulty: 'beginner',
                            position: this.determinePosition(exercise.description),
                            equipment: 'none',
                            muscleGroups: this.determineMuscleGroups(exercise.name, exercise.description),
                            defaultDuration: exercise.duration,
                            tags: this.generateTags(exercise.name, exercise.description),
                            translations: {
                                en: {
                                    name: exercise.name,
                                    description: exercise.description,
                                    instructions: this.generateInstructions(exercise.description)
                                }
                            }
                        });
                    }

                    // Add to routine
                    routineData.exercises.push({
                        exerciseId: exerciseId,
                        duration: exercise.duration,
                        order: index + 1,
                        needsSideSwitch: exercise.needsSideSwitch || false
                    });
                });

                folderData.routines[routineId] = routineData;
                this.routines.set(routineId, routineData);
            }

            this.folders.set(folderId, folderData);
        }
    }

    // Generate exercise files
    async generateExerciseFiles() {
        console.log('Generating exercise files...');
        
        // Group exercises by category
        const exercisesByCategory = new Map();
        for (const exercise of this.exercises.values()) {
            if (!exercisesByCategory.has(exercise.category)) {
                exercisesByCategory.set(exercise.category, []);
            }
            exercisesByCategory.get(exercise.category).push(exercise);
        }

        // Generate files for each category
        for (const [category, exercises] of exercisesByCategory) {
            console.log(`Generating ${exercises.length} exercises for category: ${category}`);
            
            // In a real implementation, you would write these to actual files
            // For now, we'll log the structure
            exercises.forEach(exercise => {
                console.log(`Exercise: ${exercise.id} -> data/exercises/${category}/${exercise.id}.json`);
            });
        }
    }

    // Generate routine files
    async generateRoutineFiles() {
        console.log('Generating routine files...');
        
        for (const routine of this.routines.values()) {
            console.log(`Routine: ${routine.id} -> data/routines/${routine.id}.json`);
        }
    }

    // Generate folder files
    async generateFolderFiles() {
        console.log('Generating folder files...');
        
        for (const folder of this.folders.values()) {
            console.log(`Folder: ${folder.id} -> data/folders/${folder.id}.json`);
        }
    }

    // Helper methods
    generateExerciseId(name, routineId) {
        const cleanName = name.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        return `${cleanName}-${++this.exerciseCounter}`;
    }

    determineRoutineCategory(routineId) {
        const categoryMap = {
            'wake-up': 'morning',
            'bed-time': 'evening',
            'posture-reset': 'seated',
            'full-body': 'full-body',
            'quick-stretch': 'quick'
        };
        return categoryMap[routineId] || 'general';
    }

    determineExerciseCategory(name, routineId) {
        const nameLower = name.toLowerCase();
        
        if (nameLower.includes('neck') || nameLower.includes('shoulder')) {
            return 'neck-shoulders';
        }
        if (nameLower.includes('back') || nameLower.includes('spine')) {
            return 'back-spine';
        }
        if (nameLower.includes('hip')) {
            return 'hips';
        }
        if (nameLower.includes('arm') || nameLower.includes('wrist')) {
            return 'arms-wrists';
        }
        if (nameLower.includes('leg') || nameLower.includes('calf') || nameLower.includes('quad')) {
            return 'legs-hips';
        }
        if (nameLower.includes('foot') || nameLower.includes('ankle')) {
            return 'feet-ankles';
        }
        if (nameLower.includes('core') || nameLower.includes('ab')) {
            return 'core';
        }
        
        return 'general';
    }

    determineDifficulty(routine) {
        const nameLower = routine.name.toLowerCase();
        if (nameLower.includes('expert') || nameLower.includes('advanced')) {
            return 'advanced';
        }
        if (nameLower.includes('intermediate')) {
            return 'intermediate';
        }
        return 'beginner';
    }

    determinePosition(description) {
        const descLower = description.toLowerCase();
        if (descLower.includes('sit') || descLower.includes('seated')) {
            return 'seated';
        }
        if (descLower.includes('lie') || descLower.includes('lying') || descLower.includes('supine')) {
            return 'lying';
        }
        if (descLower.includes('stand') || descLower.includes('standing')) {
            return 'standing';
        }
        return 'seated'; // Default
    }

    determineMuscleGroups(name, description) {
        const text = (name + ' ' + description).toLowerCase();
        const groups = [];
        
        if (text.includes('neck')) groups.push('neck');
        if (text.includes('shoulder')) groups.push('shoulders');
        if (text.includes('back')) groups.push('back');
        if (text.includes('hip')) groups.push('hips');
        if (text.includes('leg') || text.includes('thigh')) groups.push('legs');
        if (text.includes('arm')) groups.push('arms');
        if (text.includes('wrist')) groups.push('wrists');
        if (text.includes('foot') || text.includes('ankle')) groups.push('feet');
        if (text.includes('core') || text.includes('ab')) groups.push('core');
        
        return groups.length > 0 ? groups : ['general'];
    }

    generateTags(name, description) {
        const text = (name + ' ' + description).toLowerCase();
        const tags = [];
        
        if (text.includes('stretch')) tags.push('stretching');
        if (text.includes('mobility') || text.includes('range')) tags.push('mobility');
        if (text.includes('tension') || text.includes('relief')) tags.push('tension-relief');
        if (text.includes('strength') || text.includes('strengthen')) tags.push('strength');
        if (text.includes('balance')) tags.push('balance');
        if (text.includes('breath')) tags.push('breathing');
        
        return tags.length > 0 ? tags : ['general'];
    }

    generateInstructions(description) {
        // Extract key instruction from description
        const sentences = description.split('.');
        return sentences[0] + '.'; // First sentence as instruction
    }

    parseDuration(durationStr) {
        const match = durationStr.match(/(\d+)/);
        return match ? parseInt(match[1]) * 60 : 300; // Convert minutes to seconds
    }

    // Export data for manual file creation
    exportData() {
        return {
            exercises: Object.fromEntries(this.exercises),
            routines: Object.fromEntries(this.routines),
            folders: Object.fromEntries(this.folders)
        };
    }
}

// Usage example:
// const migrator = new DataMigrationTool();
// migrator.migrateFromCurrentStructure().then(() => {
//     console.log('Migration complete!');
//     const data = migrator.exportData();
//     console.log('Exported data:', data);
// });

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataMigrationTool;
}
