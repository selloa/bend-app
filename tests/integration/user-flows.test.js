// Integration tests for complete user flows
import { testRoutines, mockDOMStructure } from '../fixtures/test-data.js';

describe('User Flow Integration Tests', () => {
  let mockTimer;
  
  beforeEach(() => {
    // Set up complete DOM structure
    document.body.innerHTML = `
      <div class="container">
        <section id="routine-selection" class="section active">
          <div class="routine-categories">
            <button class="routine-category-btn" data-routine="test-routine">Test Routine</button>
            <button class="routine-category-btn" data-routine="single-exercise">Single Exercise</button>
          </div>
        </section>
        
        <section id="exercise-display" class="section">
          <button class="back-btn">← Back</button>
          <div class="exercise-header">
            <h2 id="exercise-title">Exercise</h2>
            <div class="progress">
              <span id="current-exercise">1</span> of <span id="total-exercises">2</span>
            </div>
          </div>
          <div class="exercise-content">
            <div class="exercise-image">
              <div class="placeholder-image" id="exercise-image">🧪</div>
            </div>
            <div class="exercise-info">
              <h3 id="exercise-name">Test Exercise</h3>
              <p id="exercise-description">Test description</p>
            </div>
            <div class="timer-section">
              <div class="timer-display" id="timer-display">0:30</div>
              <div class="timer-controls">
                <button class="timer-btn" id="start-pause-btn">Start</button>
                <button class="timer-btn" id="skip-btn">Skip</button>
              </div>
            </div>
          </div>
          <div class="exercise-navigation">
            <button class="nav-btn" id="prev-btn">Previous</button>
            <button class="nav-btn" id="next-btn">Next</button>
          </div>
        </section>
        
        <section id="completion-screen" class="section">
          <div class="completion-content">
            <div class="completion-icon">🎉</div>
            <h2 class="completion-title">Routine Complete!</h2>
            <p id="completion-message">Great job!</p>
            <div class="completion-stats">
              <div class="stat">
                <span id="total-time">0</span>
                <span class="stat-label">Minutes</span>
              </div>
              <div class="stat">
                <span id="total-exercises-completed">0</span>
                <span class="stat-label">Exercises</span>
              </div>
            </div>
            <div class="completion-actions">
              <button class="action-btn primary">Start New Routine</button>
              <button class="action-btn secondary">Back to Routines</button>
            </div>
          </div>
        </section>
      </div>
    `;
    
    // Mock timer
    mockTimer = global.testUtils.mockTimer();
    global.setInterval = mockTimer.setInterval;
    global.clearInterval = mockTimer.clearInterval;
    
    // Initialize global state
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

  describe('Complete Routine Flow', () => {
    test('should complete full routine from selection to completion', () => {
      // Mock the app functions
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
        
        // Show exercise display
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        displayCurrentExercise();
      };

      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('current-exercise').textContent = global.currentExerciseIndex + 1;
        document.getElementById('total-exercises').textContent = totalExercises;
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-description').textContent = exercise.description;
        document.getElementById('exercise-image').textContent = exercise.emoji;
        
        global.timeRemaining = exercise.duration;
        document.getElementById('timer-display').textContent = formatTime(global.timeRemaining);
        
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        document.getElementById('start-pause-btn').textContent = 'Pause';
        
        global.timer = setInterval(() => {
          global.timeRemaining--;
          document.getElementById('timer-display').textContent = formatTime(global.timeRemaining);
          
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            document.getElementById('start-pause-btn').textContent = 'Start';
            
            if (global.currentExerciseIndex < global.currentExercises.length - 1) {
              nextExercise();
            } else {
              showCompletionScreen();
            }
          }
        }, 1000);
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
          displayCurrentExercise();
        }
      };

      const showCompletionScreen = () => {
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
        
        global.totalRoutineTime = Math.floor((Date.now() - global.routineStartTime) / 1000 / 60);
        
        const routineData = testRoutines[global.currentRoutine];
        document.getElementById('completion-message').textContent = `You've completed the ${routineData.name} routine!`;
        document.getElementById('total-time').textContent = global.totalRoutineTime;
        document.getElementById('total-exercises-completed').textContent = global.currentExercises.length;
      };

      // Execute the flow
      selectRoutine('test-routine');
      
      // Verify initial state
      expect(global.currentRoutine).toBe('test-routine');
      expect(global.currentExerciseIndex).toBe(0);
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(true);
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 1');
      
      // Start timer for first exercise
      startTimer();
      expect(global.isTimerRunning).toBe(true);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Pause');
      
      // Simulate timer completion
      mockTimer.advanceTime(30000); // 30 seconds
      
      // Verify auto-advance to second exercise
      expect(global.currentExerciseIndex).toBe(1);
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 2');
      expect(document.getElementById('current-exercise').textContent).toBe('2');
      
      // Start timer for second exercise
      startTimer();
      mockTimer.advanceTime(30000); // 30 seconds
      
      // Verify completion screen
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(true);
      expect(document.getElementById('completion-message').textContent).toContain('Test Routine');
      expect(document.getElementById('total-exercises-completed').textContent).toBe('2');
    });

    test('should handle routine with single exercise', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        displayCurrentExercise();
      };

      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('current-exercise').textContent = global.currentExerciseIndex + 1;
        document.getElementById('total-exercises').textContent = totalExercises;
        document.getElementById('exercise-name').textContent = exercise.name;
        
        global.timeRemaining = exercise.duration;
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            showCompletionScreen();
          }
        }, 1000);
      };

      const showCompletionScreen = () => {
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
        document.getElementById('total-exercises-completed').textContent = global.currentExercises.length;
      };

      // Execute single exercise flow
      selectRoutine('single-exercise');
      
      expect(global.currentExercises.length).toBe(1);
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(true);
      
      startTimer();
      mockTimer.advanceTime(60000); // 60 seconds
      
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(true);
      expect(document.getElementById('total-exercises-completed').textContent).toBe('1');
    });
  });

  describe('Navigation Flow', () => {
    test('should handle back navigation from exercise to routine selection', () => {
      const showRoutineSelection = () => {
        document.getElementById('routine-selection').classList.add('active');
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.remove('active');
      };

      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
      };

      // Start in routine selection
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(true);
      
      // Select routine
      selectRoutine('test-routine');
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(true);
      
      // Go back
      showRoutineSelection();
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(true);
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(false);
    });

    test('should handle exercise navigation (previous/next)', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        displayCurrentExercise();
      };

      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const totalExercises = global.currentExercises.length;
        
        document.getElementById('current-exercise').textContent = global.currentExerciseIndex + 1;
        document.getElementById('total-exercises').textContent = totalExercises;
        document.getElementById('exercise-name').textContent = exercise.name;
        
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
          displayCurrentExercise();
        }
      };

      const previousExercise = () => {
        if (global.currentExerciseIndex > 0) {
          global.currentExerciseIndex--;
          displayCurrentExercise();
        }
      };

      // Start routine
      selectRoutine('test-routine');
      
      // Verify initial state
      expect(global.currentExerciseIndex).toBe(0);
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(false);
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 1');
      
      // Go to next exercise
      nextExercise();
      expect(global.currentExerciseIndex).toBe(1);
      expect(document.getElementById('prev-btn').disabled).toBe(false);
      expect(document.getElementById('next-btn').disabled).toBe(true);
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 2');
      
      // Go back to previous exercise
      previousExercise();
      expect(global.currentExerciseIndex).toBe(0);
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(false);
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 1');
    });
  });

  describe('Timer Integration Flow', () => {
    test('should handle start/pause/skip timer flow', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.timeRemaining = testRoutines[routine].exercises[0].duration;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        document.getElementById('start-pause-btn').textContent = 'Pause';
        
        global.timer = setInterval(() => {
          global.timeRemaining--;
          document.getElementById('timer-display').textContent = formatTime(global.timeRemaining);
          
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            document.getElementById('start-pause-btn').textContent = 'Start';
          }
        }, 1000);
      };

      const pauseTimer = () => {
        global.isTimerRunning = false;
        document.getElementById('start-pause-btn').textContent = 'Start';
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
        document.getElementById('start-pause-btn').textContent = 'Start';
        
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          nextExercise();
        } else {
          showCompletionScreen();
        }
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
          global.timeRemaining = global.currentExercises[global.currentExerciseIndex].duration;
        }
      };

      const showCompletionScreen = () => {
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
      };

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      // Start routine
      selectRoutine('test-routine');
      expect(global.timeRemaining).toBe(30);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
      
      // Start timer
      startTimer();
      expect(global.isTimerRunning).toBe(true);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Pause');
      
      // Advance time partially
      mockTimer.advanceTime(10000); // 10 seconds
      expect(global.timeRemaining).toBe(20);
      
      // Pause timer
      pauseTimer();
      expect(global.isTimerRunning).toBe(false);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
      
      // Start again
      startTimer();
      expect(global.isTimerRunning).toBe(true);
      
      // Skip exercise
      skipExercise();
      expect(global.isTimerRunning).toBe(false);
      expect(global.currentExerciseIndex).toBe(1);
      expect(global.timeRemaining).toBe(30); // Second exercise duration
    });
  });

  describe('State Management Flow', () => {
    test('should maintain consistent state throughout routine', () => {
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

      const getCurrentState = () => ({
        routine: global.currentRoutine,
        exerciseIndex: global.currentExerciseIndex,
        totalExercises: global.currentExercises.length,
        currentExercise: global.currentExercises[global.currentExerciseIndex],
        hasStarted: global.routineStartTime !== null
      });

      // Initial state
      selectRoutine('test-routine');
      let state = getCurrentState();
      
      expect(state.routine).toBe('test-routine');
      expect(state.exerciseIndex).toBe(0);
      expect(state.totalExercises).toBe(2);
      expect(state.currentExercise.name).toBe('Test Exercise 1');
      expect(state.hasStarted).toBe(true);
      
      // After navigation
      nextExercise();
      state = getCurrentState();
      
      expect(state.exerciseIndex).toBe(1);
      expect(state.currentExercise.name).toBe('Test Exercise 2');
      expect(state.routine).toBe('test-routine'); // Should remain consistent
      expect(state.totalExercises).toBe(2); // Should remain consistent
    });

    test('should handle state reset between routines', () => {
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
      };

      // Start first routine
      selectRoutine('test-routine');
      expect(global.currentRoutine).toBe('test-routine');
      expect(global.currentExercises.length).toBe(2);
      
      // Return to selection
      showRoutineSelection();
      expect(global.currentRoutine).toBe('');
      expect(global.currentExercises.length).toBe(0);
      expect(global.currentExerciseIndex).toBe(0);
      expect(global.routineStartTime).toBe(null);
      
      // Start different routine
      selectRoutine('single-exercise');
      expect(global.currentRoutine).toBe('single-exercise');
      expect(global.currentExercises.length).toBe(1);
      expect(global.currentExerciseIndex).toBe(0);
    });
  });

  describe('Error Handling Flow', () => {
    test('should handle invalid routine selection gracefully', () => {
      const selectRoutine = (routine) => {
        if (testRoutines[routine]) {
          global.currentRoutine = routine;
          global.currentExercises = testRoutines[routine].exercises;
          global.currentExerciseIndex = 0;
          return true;
        }
        return false;
      };

      const result = selectRoutine('invalid-routine');
      expect(result).toBe(false);
      expect(global.currentRoutine).toBe('');
      expect(global.currentExercises.length).toBe(0);
    });

    test('should handle navigation edge cases', () => {
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

      // Test with empty exercise list
      global.currentExercises = [];
      global.currentExerciseIndex = 0;
      
      nextExercise();
      expect(global.currentExerciseIndex).toBe(0);
      
      previousExercise();
      expect(global.currentExerciseIndex).toBe(0);
      
      // Test with single exercise
      global.currentExercises = testRoutines['single-exercise'].exercises;
      global.currentExerciseIndex = 0;
      
      nextExercise();
      expect(global.currentExerciseIndex).toBe(0); // Should not advance
      
      previousExercise();
      expect(global.currentExerciseIndex).toBe(0); // Should not go back
    });
  });
});
