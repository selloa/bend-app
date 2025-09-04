// Unit tests for data structure and validation
import { testRoutines, invalidRoutineData } from '../fixtures/test-data.js';

// Mock the actual bendRoutines from script.js
const mockBendRoutines = {
  "wake-up": {
    name: "Wake Up",
    description: "A simple, quick, convenient flow designed to maintain mobility and range of motion.",
    duration: "5 minutes",
    exercises: [
      {
        name: "Neck Rolls",
        description: "Slowly roll your head in a circle, first clockwise, then counterclockwise.",
        duration: 30,
        emoji: "🔄"
      },
      {
        name: "Shoulder Shrugs",
        description: "Lift your shoulders up toward your ears, hold for 3 seconds, then relax.",
        duration: 30,
        emoji: "🤷"
      }
    ]
  },
  "posture-reset": {
    name: "Posture Reset",
    description: "Focused on seated stretches that target shoulders, back, and neck.",
    duration: "4 minutes",
    exercises: [
      {
        name: "Cactus Arms",
        description: "Sit tall, bring your arms up to shoulder height, bend your elbows to 90 degrees.",
        duration: 30,
        emoji: "🤲"
      }
    ]
  }
};

describe('Data Structure Validation', () => {
  describe('Routine Data Structure', () => {
    test('should have all required routine properties', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        expect(routine).toHaveProperty('name');
        expect(routine).toHaveProperty('description');
        expect(routine).toHaveProperty('duration');
        expect(routine).toHaveProperty('exercises');
        
        expect(typeof routine.name).toBe('string');
        expect(typeof routine.description).toBe('string');
        expect(typeof routine.duration).toBe('string');
        expect(Array.isArray(routine.exercises)).toBe(true);
      });
    });

    test('should have non-empty routine names', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        expect(routine.name.trim().length).toBeGreaterThan(0);
      });
    });

    test('should have non-empty routine descriptions', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        expect(routine.description.trim().length).toBeGreaterThan(0);
      });
    });

    test('should have valid duration format', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        expect(routine.duration).toMatch(/^\d+\s+minutes?$/);
      });
    });

    test('should have at least one exercise per routine', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        expect(routine.exercises.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Exercise Data Structure', () => {
    test('should have all required exercise properties', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          expect(exercise).toHaveProperty('name');
          expect(exercise).toHaveProperty('description');
          expect(exercise).toHaveProperty('duration');
          expect(exercise).toHaveProperty('emoji');
          
          expect(typeof exercise.name).toBe('string');
          expect(typeof exercise.description).toBe('string');
          expect(typeof exercise.duration).toBe('number');
          expect(typeof exercise.emoji).toBe('string');
        });
      });
    });

    test('should have non-empty exercise names', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          expect(exercise.name.trim().length).toBeGreaterThan(0);
        });
      });
    });

    test('should have non-empty exercise descriptions', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          expect(exercise.description.trim().length).toBeGreaterThan(0);
        });
      });
    });

    test('should have positive duration values', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          expect(exercise.duration).toBeGreaterThan(0);
          expect(Number.isInteger(exercise.duration)).toBe(true);
        });
      });
    });

    test('should have valid emoji characters', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          expect(exercise.emoji.length).toBeGreaterThan(0);
          // Check if it's a valid emoji (basic check)
          expect(exercise.emoji).toMatch(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
        });
      });
    });
  });

  describe('Data Consistency', () => {
    test('should have unique routine keys', () => {
      const routineKeys = Object.keys(mockBendRoutines);
      const uniqueKeys = new Set(routineKeys);
      expect(uniqueKeys.size).toBe(routineKeys.length);
    });

    test('should have consistent exercise naming within routines', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        const exerciseNames = routine.exercises.map(ex => ex.name);
        const uniqueNames = new Set(exerciseNames);
        expect(uniqueNames.size).toBe(exerciseNames.length);
      });
    });

    test('should have reasonable duration ranges', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          expect(exercise.duration).toBeGreaterThanOrEqual(10); // Minimum 10 seconds
          expect(exercise.duration).toBeLessThanOrEqual(300); // Maximum 5 minutes
        });
      });
    });

    test('should have reasonable total routine durations', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        const totalSeconds = routine.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const totalMinutes = Math.ceil(totalSeconds / 60);
        
        expect(totalMinutes).toBeGreaterThanOrEqual(1); // Minimum 1 minute
        expect(totalMinutes).toBeLessThanOrEqual(60); // Maximum 1 hour
      });
    });
  });

  describe('Invalid Data Handling', () => {
    test('should detect missing routine name', () => {
      const invalidRoutine = invalidRoutineData['missing-name'];
      
      expect(invalidRoutine.name).toBeUndefined();
      expect(invalidRoutine.description).toBeDefined();
      expect(invalidRoutine.exercises).toBeDefined();
    });

    test('should detect missing exercises array', () => {
      const invalidRoutine = invalidRoutineData['missing-exercises'];
      
      expect(invalidRoutine.name).toBeDefined();
      expect(invalidRoutine.exercises).toBeUndefined();
    });

    test('should detect invalid exercise data', () => {
      const invalidRoutine = invalidRoutineData['invalid-exercise'];
      
      expect(invalidRoutine.exercises.length).toBe(2);
      expect(invalidRoutine.exercises[0].name).toBeDefined();
      expect(invalidRoutine.exercises[1].name).toBeUndefined();
      expect(invalidRoutine.exercises[1].duration).toBeUndefined();
    });
  });

  describe('Data Validation Functions', () => {
    const validateRoutine = (routine) => {
      const errors = [];
      
      if (!routine.name || typeof routine.name !== 'string' || routine.name.trim().length === 0) {
        errors.push('Invalid or missing routine name');
      }
      
      if (!routine.description || typeof routine.description !== 'string' || routine.description.trim().length === 0) {
        errors.push('Invalid or missing routine description');
      }
      
      if (!routine.duration || typeof routine.duration !== 'string' || !routine.duration.match(/^\d+\s+minutes?$/)) {
        errors.push('Invalid duration format');
      }
      
      if (!Array.isArray(routine.exercises) || routine.exercises.length === 0) {
        errors.push('Invalid or empty exercises array');
      }
      
      return errors;
    };

    const validateExercise = (exercise) => {
      const errors = [];
      
      if (!exercise.name || typeof exercise.name !== 'string' || exercise.name.trim().length === 0) {
        errors.push('Invalid or missing exercise name');
      }
      
      if (!exercise.description || typeof exercise.description !== 'string' || exercise.description.trim().length === 0) {
        errors.push('Invalid or missing exercise description');
      }
      
      if (!Number.isInteger(exercise.duration) || exercise.duration <= 0) {
        errors.push('Invalid duration value');
      }
      
      if (!exercise.emoji || typeof exercise.emoji !== 'string' || exercise.emoji.length === 0) {
        errors.push('Invalid or missing emoji');
      }
      
      return errors;
    };

    test('should validate correct routine data', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        const errors = validateRoutine(routine);
        expect(errors).toHaveLength(0);
      });
    });

    test('should detect invalid routine data', () => {
      Object.values(invalidRoutineData).forEach(routine => {
        const errors = validateRoutine(routine);
        expect(errors.length).toBeGreaterThan(0);
      });
    });

    test('should validate correct exercise data', () => {
      Object.values(mockBendRoutines).forEach(routine => {
        routine.exercises.forEach(exercise => {
          const errors = validateExercise(exercise);
          expect(errors).toHaveLength(0);
        });
      });
    });

    test('should detect invalid exercise data', () => {
      const invalidExercise = invalidRoutineData['invalid-exercise'].exercises[1];
      const errors = validateExercise(invalidExercise);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('Data Access Functions', () => {
    const getRoutineById = (routines, id) => {
      return routines[id] || null;
    };

    const getExerciseByIndex = (routine, index) => {
      if (!routine || !routine.exercises) return null;
      return routine.exercises[index] || null;
    };

    const getTotalRoutineDuration = (routine) => {
      if (!routine || !routine.exercises) return 0;
      return routine.exercises.reduce((total, exercise) => total + exercise.duration, 0);
    };

    test('should retrieve routine by valid ID', () => {
      const routine = getRoutineById(mockBendRoutines, 'wake-up');
      expect(routine).toBeDefined();
      expect(routine.name).toBe('Wake Up');
    });

    test('should return null for invalid routine ID', () => {
      const routine = getRoutineById(mockBendRoutines, 'invalid-id');
      expect(routine).toBeNull();
    });

    test('should retrieve exercise by valid index', () => {
      const routine = getRoutineById(mockBendRoutines, 'wake-up');
      const exercise = getExerciseByIndex(routine, 0);
      expect(exercise).toBeDefined();
      expect(exercise.name).toBe('Neck Rolls');
    });

    test('should return null for invalid exercise index', () => {
      const routine = getRoutineById(mockBendRoutines, 'wake-up');
      const exercise = getExerciseByIndex(routine, 999);
      expect(exercise).toBeNull();
    });

    test('should calculate total routine duration', () => {
      const routine = getRoutineById(mockBendRoutines, 'wake-up');
      const totalDuration = getTotalRoutineDuration(routine);
      expect(totalDuration).toBe(60); // 30 + 30 seconds
    });

    test('should handle null routine in duration calculation', () => {
      const totalDuration = getTotalRoutineDuration(null);
      expect(totalDuration).toBe(0);
    });
  });

  describe('Data Transformation Functions', () => {
    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getRoutineSummary = (routine) => {
      if (!routine) return null;
      
      return {
        name: routine.name,
        exerciseCount: routine.exercises.length,
        totalDuration: routine.exercises.reduce((sum, ex) => sum + ex.duration, 0),
        averageDuration: Math.round(routine.exercises.reduce((sum, ex) => sum + ex.duration, 0) / routine.exercises.length)
      };
    };

    test('should format duration correctly', () => {
      expect(formatDuration(30)).toBe('0:30');
      expect(formatDuration(90)).toBe('1:30');
      expect(formatDuration(3661)).toBe('61:01');
      expect(formatDuration(0)).toBe('0:00');
    });

    test('should generate routine summary', () => {
      const routine = mockBendRoutines['wake-up'];
      const summary = getRoutineSummary(routine);
      
      expect(summary.name).toBe('Wake Up');
      expect(summary.exerciseCount).toBe(2);
      expect(summary.totalDuration).toBe(60);
      expect(summary.averageDuration).toBe(30);
    });

    test('should handle null routine in summary', () => {
      const summary = getRoutineSummary(null);
      expect(summary).toBeNull();
    });
  });
});
