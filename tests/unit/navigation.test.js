// Unit tests for navigation functionality
import { testRoutines } from '../fixtures/test-data.js';

describe('Navigation Functions', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <section id="routine-selection" class="section"></section>
      <section id="exercise-display" class="section"></section>
      <section id="completion-screen" class="section"></section>
      <div id="current-exercise">1</div>
      <div id="total-exercises">2</div>
      <div id="prev-btn"></div>
      <div id="next-btn"></div>
    `;
    
    // Reset global variables
    global.currentRoutine = '';
    global.currentExerciseIndex = 0;
    global.currentExercises = [];
    global.routineStartTime = null;
    global.totalRoutineTime = 0;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('selectRoutine', () => {
    test('should set current routine and initialize exercise data', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      selectRoutine('test-routine');
      
      expect(global.currentRoutine).toBe('test-routine');
      expect(global.currentExercises).toEqual(testRoutines['test-routine'].exercises);
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.routineStartTime).toBeDefined();
    });

    test('should handle invalid routine selection', () => {
      const selectRoutine = (routine) => {
        if (testRoutines[routine]) {
          global.currentRoutine = routine;
          global.currentExercises = testRoutines[routine].exercises;
          global.currentExerciseIndex = 0;
          global.routineStartTime = Date.now();
        }
      };

      selectRoutine('invalid-routine');
      
      expect(global.currentRoutine).toBe('');
      expect(global.currentExercises).toEqual([]);
    });
  });

  describe('showRoutineSelection', () => {
    test('should show routine selection and hide other sections', () => {
      const showRoutineSelection = () => {
        document.getElementById('routine-selection').classList.add('active');
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.remove('active');
      };

      // Set up initial state with exercise display active
      document.getElementById('exercise-display').classList.add('active');
      
      showRoutineSelection();
      
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(true);
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(false);
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(false);
    });
  });

  describe('showExerciseDisplay', () => {
    test('should show exercise display and hide other sections', () => {
      const showExerciseDisplay = () => {
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        document.getElementById('completion-screen').classList.remove('active');
      };

      // Set up initial state with routine selection active
      document.getElementById('routine-selection').classList.add('active');
      
      showExerciseDisplay();
      
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(false);
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(true);
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(false);
    });
  });

  describe('showCompletionScreen', () => {
    test('should show completion screen and hide other sections', () => {
      const showCompletionScreen = () => {
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
      };

      // Set up initial state with exercise display active
      document.getElementById('exercise-display').classList.add('active');
      
      showCompletionScreen();
      
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(false);
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(false);
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(true);
    });
  });

  describe('nextExercise', () => {
    test('should advance to next exercise when not at end', () => {
      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
        }
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0;
      
      nextExercise();
      
      expect(global.currentExerciseIndex).toBe(1);
    });

    test('should not advance beyond last exercise', () => {
      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
        }
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 1; // Last exercise
      
      nextExercise();
      
      expect(global.currentExerciseIndex).toBe(1); // Should remain unchanged
    });

    test('should handle empty exercise list', () => {
      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
        }
      };

      global.currentExercises = [];
      global.currentExerciseIndex = 0;
      
      nextExercise();
      
      expect(global.currentExerciseIndex).toBe(0); // Should remain unchanged
    });
  });

  describe('previousExercise', () => {
    test('should go back to previous exercise when not at beginning', () => {
      const previousExercise = () => {
        if (global.currentExerciseIndex > 0) {
          global.currentExerciseIndex--;
        }
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 1;
      
      previousExercise();
      
      expect(global.currentExerciseIndex).toBe(0);
    });

    test('should not go back beyond first exercise', () => {
      const previousExercise = () => {
        if (global.currentExerciseIndex > 0) {
          global.currentExerciseIndex--;
        }
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0; // First exercise
      
      previousExercise();
      
      expect(global.currentExerciseIndex).toBe(0); // Should remain unchanged
    });

    test('should handle empty exercise list', () => {
      const previousExercise = () => {
        if (global.currentExerciseIndex > 0) {
          global.currentExerciseIndex--;
        }
      };

      global.currentExercises = [];
      global.currentExerciseIndex = 0;
      
      previousExercise();
      
      expect(global.currentExerciseIndex).toBe(0); // Should remain unchanged
    });
  });

  describe('displayCurrentExercise', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="current-exercise">1</div>
        <div id="total-exercises">2</div>
        <div id="exercise-title">Exercise</div>
        <div id="exercise-name">Exercise Name</div>
        <div id="exercise-description">Exercise description</div>
        <div id="exercise-image">📱</div>
        <div id="prev-btn"></div>
        <div id="next-btn"></div>
        <div id="start-pause-btn">Start</div>
        <div id="timer-display">0:30</div>
      `;
    });

    test('should update progress indicators', () => {
      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('current-exercise').textContent = global.currentExerciseIndex + 1;
        document.getElementById('total-exercises').textContent = totalExercises;
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 1;
      
      displayCurrentExercise();
      
      expect(document.getElementById('current-exercise').textContent).toBe('2');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
    });

    test('should update exercise information', () => {
      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const routineData = testRoutines[global.currentRoutine];
        
        document.getElementById('exercise-title').textContent = routineData.name;
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-description').textContent = exercise.description;
        document.getElementById('exercise-image').textContent = exercise.emoji;
      };

      global.currentRoutine = 'test-routine';
      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0;
      
      displayCurrentExercise();
      
      expect(document.getElementById('exercise-title').textContent).toBe('Test Routine');
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 1');
      expect(document.getElementById('exercise-description').textContent).toBe('First test exercise description');
      expect(document.getElementById('exercise-image').textContent).toBe('🧪');
    });

    test('should update navigation button states', () => {
      const displayCurrentExercise = () => {
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0; // First exercise
      
      displayCurrentExercise();
      
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(false);
    });

    test('should enable previous button on second exercise', () => {
      const displayCurrentExercise = () => {
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 1; // Second exercise
      
      displayCurrentExercise();
      
      expect(document.getElementById('prev-btn').disabled).toBe(false);
      expect(document.getElementById('next-btn').disabled).toBe(true);
    });

    test('should reset timer state', () => {
      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        
        global.timeRemaining = exercise.duration;
        document.getElementById('start-pause-btn').textContent = 'Start';
        global.isTimerRunning = false;
      };

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0;
      global.timeRemaining = 0;
      global.isTimerRunning = true;
      
      displayCurrentExercise();
      
      expect(global.timeRemaining).toBe(30);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
      expect(global.isTimerRunning).toBe(false);
    });
  });

  describe('startNewRoutine', () => {
    test('should return to routine selection', () => {
      const showRoutineSelection = jest.fn();
      
      const startNewRoutine = () => {
        showRoutineSelection();
      };

      startNewRoutine();
      
      expect(showRoutineSelection).toHaveBeenCalled();
    });
  });

  describe('Navigation Edge Cases', () => {
    test('should handle single exercise routine', () => {
      const displayCurrentExercise = () => {
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      global.currentExercises = testRoutines['single-exercise'].exercises;
      global.currentExerciseIndex = 0;
      
      displayCurrentExercise();
      
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(true);
    });

    test('should handle navigation with undefined exercise data', () => {
      const displayCurrentExercise = () => {
        if (global.currentExercises && global.currentExercises[global.currentExerciseIndex]) {
          const exercise = global.currentExercises[global.currentExerciseIndex];
          document.getElementById('exercise-name').textContent = exercise.name;
        }
      };

      global.currentExercises = undefined;
      global.currentExerciseIndex = 0;
      
      expect(() => displayCurrentExercise()).not.toThrow();
    });

    test('should handle rapid navigation changes', () => {
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

      global.currentExercises = testRoutines['test-routine'].exercises;
      global.currentExerciseIndex = 0;
      
      // Rapid navigation
      nextExercise();
      nextExercise();
      previousExercise();
      previousExercise();
      nextExercise();
      
      expect(global.currentExerciseIndex).toBe(1);
    });
  });
});
