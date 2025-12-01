// Integration tests for state management
import { testRoutines } from '../fixtures/test-data.js';

describe('State Management Integration Tests', () => {
  beforeEach(() => {
    // Reset global state
    global.currentRoutine = '';
    global.currentExerciseIndex = 0;
    global.currentExercises = [];
    global.timer = null;
    global.timeRemaining = 0;
    global.isTimerRunning = false;
    global.routineStartTime = null;
    global.totalRoutineTime = 0;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Routine State Transitions', () => {
    test('should transition from selection to exercise state', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      // Initial state
      expect(global.currentRoutine).toBe('');
      expect(global.currentExercises.length).toBe(0);
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.routineStartTime).toBe(null);

      // Select routine
      selectRoutine('test-routine');

      // Verify state transition
      expect(global.currentRoutine).toBe('test-routine');
      expect(global.currentExercises.length).toBe(2);
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.routineStartTime).toBeDefined();
      expect(global.routineStartTime).toBeGreaterThan(0);
    });

    test('should maintain state consistency during exercise progression', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
        }
      };

      const getStateSnapshot = () => ({
        routine: global.currentRoutine,
        exerciseIndex: global.currentExerciseIndex,
        totalExercises: global.currentExercises.length,
        startTime: global.routineStartTime,
        currentExercise: global.currentExercises[global.currentExerciseIndex]
      });

      // Initialize
      selectRoutine('test-routine');
      const initialState = getStateSnapshot();

      // Progress through exercises
      nextExercise();
      const secondState = getStateSnapshot();

      // Verify state consistency
      expect(secondState.routine).toBe(initialState.routine);
      expect(secondState.totalExercises).toBe(initialState.totalExercises);
      expect(secondState.startTime).toBe(initialState.startTime);
      expect(secondState.exerciseIndex).toBe(1);
      expect(secondState.currentExercise.name).toBe('Test Exercise 2');
    });

    test('should handle state reset when returning to selection', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      const showRoutineSelection = () => {
        global.currentRoutine = '';
        global.currentExercises = [];
        global.currentExerciseIndex = 0;
        global.routineStartTime = null;
        global.timer = null;
        global.isTimerRunning = false;
      };

      // Start routine
      selectRoutine('test-routine');
      expect(global.currentRoutine).toBe('test-routine');

      // Return to selection
      showRoutineSelection();

      // Verify state reset
      expect(global.currentRoutine).toBe('');
      expect(global.currentExercises.length).toBe(0);
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.routineStartTime).toBe(null);
      expect(global.timer).toBe(null);
      expect(global.isTimerRunning).toBe(false);
    });
  });

  describe('Timer State Management', () => {
    test('should manage timer state transitions correctly', () => {
      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
        }, 1000);
      };

      const pauseTimer = () => {
        global.isTimerRunning = false;
        if (global.timer) {
          clearInterval(global.timer);
          global.timer = null;
        }
      };

      const skipExercise = () => {
        if (global.timer) {
          clearInterval(global.timer);
          global.timer = null;
        }
        global.isTimerRunning = false;
      };

      // Initial timer state
      expect(global.isTimerRunning).toBe(false);
      expect(global.timer).toBe(null);

      // Start timer
      startTimer();
      expect(global.isTimerRunning).toBe(true);
      expect(global.timer).toBeDefined();

      // Pause timer
      pauseTimer();
      expect(global.isTimerRunning).toBe(false);
      expect(global.timer).toBe(null);

      // Start again
      startTimer();
      expect(global.isTimerRunning).toBe(true);

      // Skip exercise
      skipExercise();
      expect(global.isTimerRunning).toBe(false);
      expect(global.timer).toBe(null);
    });

    test('should handle timer state with exercise transitions', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.timeRemaining = testRoutines[routine].exercises[0].duration;
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
          global.timeRemaining = global.currentExercises[global.currentExerciseIndex].duration;
        }
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            nextExercise();
          }
        }, 1000);
      };

      // Initialize
      selectRoutine('test-routine');
      expect(global.timeRemaining).toBe(30);
      expect(global.currentExerciseIndex).toBe(0);

      // Start timer
      startTimer();
      expect(global.isTimerRunning).toBe(true);

      // Simulate timer completion
      global.timeRemaining = 0;
      global.timer = null;
      global.isTimerRunning = false;
      nextExercise();

      // Verify state after transition
      expect(global.currentExerciseIndex).toBe(1);
      expect(global.timeRemaining).toBe(30); // Second exercise duration
      expect(global.isTimerRunning).toBe(false);
      expect(global.timer).toBe(null);
    });
  });

  describe('Exercise State Consistency', () => {
    test('should maintain exercise data consistency', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
      };

      const getCurrentExerciseData = () => {
        if (global.currentExercises && global.currentExercises[global.currentExerciseIndex]) {
          return global.currentExercises[global.currentExerciseIndex];
        }
        return null;
      };

      const validateExerciseData = (exercise) => {
        return exercise && 
               exercise.name && 
               exercise.description && 
               exercise.duration && 
               exercise.emoji;
      };

      // Test with valid routine
      selectRoutine('test-routine');
      let exercise = getCurrentExerciseData();
      expect(validateExerciseData(exercise)).toBe(true);
      expect(exercise.name).toBe('Test Exercise 1');

      // Navigate to next exercise
      global.currentExerciseIndex = 1;
      exercise = getCurrentExerciseData();
      expect(validateExerciseData(exercise)).toBe(true);
      expect(exercise.name).toBe('Test Exercise 2');

      // Test with single exercise routine
      selectRoutine('single-exercise');
      exercise = getCurrentExerciseData();
      expect(validateExerciseData(exercise)).toBe(true);
      expect(exercise.name).toBe('Single Test Exercise');
    });

    test('should handle exercise state edge cases', () => {
      const getCurrentExerciseData = () => {
        if (global.currentExercises && global.currentExercises[global.currentExerciseIndex]) {
          return global.currentExercises[global.currentExerciseIndex];
        }
        return null;
      };

      // Test with empty exercise list
      global.currentExercises = [];
      global.currentExerciseIndex = 0;
      expect(getCurrentExerciseData()).toBe(null);

      // Test with invalid index
      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 999;
      expect(getCurrentExerciseData()).toBe(null);

      // Test with negative index
      global.currentExerciseIndex = -1;
      expect(getCurrentExerciseData()).toBe(null);
    });
  });

  describe('Completion State Management', () => {
    test('should calculate completion statistics correctly', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      const showCompletionScreen = () => {
        global.totalRoutineTime = Math.floor((Date.now() - global.routineStartTime) / 1000 / 60);
      };

      const getCompletionStats = () => ({
        totalTime: global.totalRoutineTime,
        totalExercises: global.currentExercises.length,
        routineName: testRoutines[global.currentRoutine].name
      });

      // Start routine
      selectRoutine('test-routine');
      
      // Simulate completion
      global.routineStartTime = Date.now() - 120000; // 2 minutes ago
      showCompletionScreen();
      
      const stats = getCompletionStats();
      expect(stats.totalExercises).toBe(2);
      expect(stats.routineName).toBe('Test Routine');
      expect(stats.totalTime).toBeGreaterThanOrEqual(1);
    });

    test('should handle completion state for different routine types', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      const getCompletionStats = () => ({
        totalExercises: global.currentExercises.length,
        routineName: testRoutines[global.currentRoutine].name
      });

      // Test single exercise routine
      selectRoutine('single-exercise');
      let stats = getCompletionStats();
      expect(stats.totalExercises).toBe(1);
      expect(stats.routineName).toBe('Single Exercise Routine');

      // Test multi-exercise routine
      selectRoutine('test-routine');
      stats = getCompletionStats();
      expect(stats.totalExercises).toBe(2);
      expect(stats.routineName).toBe('Test Routine');

      // Test long routine
      selectRoutine('long-routine');
      stats = getCompletionStats();
      expect(stats.totalExercises).toBe(10);
      expect(stats.routineName).toBe('Long Test Routine');
    });
  });

  describe('State Persistence and Recovery', () => {
    test('should maintain state during rapid operations', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
        }
      };

      const previousExercise = () => {
        if (global.currentExerciseIndex > 0) {
          global.currentExerciseIndex--;
        }
      };

      // Initialize
      selectRoutine('test-routine');
      expect(global.currentExerciseIndex).toBe(0);

      // Rapid navigation
      nextExercise();
      nextExercise();
      previousExercise();
      nextExercise();
      previousExercise();

      // Verify final state
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.currentRoutine).toBe('test-routine');
      expect(global.currentExercises.length).toBe(2);
    });

    test('should handle state consistency during timer operations', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.timeRemaining = testRoutines[routine].exercises[0].duration;
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
        }, 1000);
      };

      const pauseTimer = () => {
        global.isTimerRunning = false;
        if (global.timer) {
          clearInterval(global.timer);
          global.timer = null;
        }
      };

      // Initialize
      selectRoutine('test-routine');
      expect(global.timeRemaining).toBe(30);

      // Rapid timer operations
      startTimer();
      pauseTimer();
      startTimer();
      pauseTimer();

      // Verify state consistency
      expect(global.isTimerRunning).toBe(false);
      expect(global.timer).toBe(null);
      expect(global.timeRemaining).toBe(30);
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.currentRoutine).toBe('test-routine');
    });
  });

  describe('State Validation', () => {
    test('should validate state integrity', () => {
      const validateState = () => {
        const errors = [];

        // Validate routine state
        if (global.currentRoutine && !testRoutines[global.currentRoutine]) {
          errors.push('Invalid current routine');
        }

        // Validate exercise index
        if (global.currentExercises.length > 0) {
          if (global.currentExerciseIndex < 0 || global.currentExerciseIndex >= global.currentExercises.length) {
            errors.push('Invalid exercise index');
          }
        }

        // Validate timer state
        if (global.isTimerRunning && !global.timer) {
          errors.push('Timer running but no timer ID');
        }

        if (!global.isTimerRunning && global.timer) {
          errors.push('Timer ID exists but timer not running');
        }

        // Validate time remaining
        if (global.timeRemaining < 0) {
          errors.push('Negative time remaining');
        }

        return errors;
      };

      // Test valid state
      global.currentRoutine = 'test-routine';
      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0;
      global.timeRemaining = 30;
      global.isTimerRunning = false;
      global.timer = null;

      let errors = validateState();
      expect(errors).toHaveLength(0);

      // Test invalid states
      global.currentRoutine = 'invalid-routine';
      errors = validateState();
      expect(errors).toContain('Invalid current routine');

      global.currentRoutine = 'test-routine';
      global.currentExerciseIndex = 999;
      errors = validateState();
      expect(errors).toContain('Invalid exercise index');

      global.isTimerRunning = true;
      global.timer = null;
      errors = validateState();
      expect(errors).toContain('Timer running but no timer ID');
    });
  });
});
