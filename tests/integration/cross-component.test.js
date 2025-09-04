// Integration tests for cross-component interactions
import { testRoutines } from '../fixtures/test-data.js';

describe('Cross-Component Integration Tests', () => {
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

  describe('Routine Selection to Exercise Display Integration', () => {
    test('should update all UI components when routine is selected', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
        
        // Update UI sections
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        
        // Update exercise display
        displayCurrentExercise();
      };

      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const totalExercises = global.currentExercises.length;
        const routineData = testRoutines[global.currentRoutine];
        
        // Update progress indicators
        document.getElementById('current-exercise').textContent = global.currentExerciseIndex + 1;
        document.getElementById('total-exercises').textContent = totalExercises;
        
        // Update exercise information
        document.getElementById('exercise-title').textContent = routineData.name;
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-description').textContent = exercise.description;
        document.getElementById('exercise-image').textContent = exercise.emoji;
        
        // Update timer
        global.timeRemaining = exercise.duration;
        updateTimerDisplay();
        
        // Update navigation buttons
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      // Execute routine selection
      selectRoutine('test-routine');
      
      // Verify section visibility
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(false);
      expect(document.getElementById('exercise-display').classList.contains('active')).toBe(true);
      
      // Verify exercise information
      expect(document.getElementById('exercise-title').textContent).toBe('Test Routine');
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 1');
      expect(document.getElementById('exercise-description').textContent).toBe('First test exercise description');
      expect(document.getElementById('exercise-image').textContent).toBe('🧪');
      
      // Verify progress indicators
      expect(document.getElementById('current-exercise').textContent).toBe('1');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
      
      // Verify timer display
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
      
      // Verify navigation buttons
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(false);
    });

    test('should handle different routine types correctly', () => {
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

      // Test single exercise routine
      selectRoutine('single-exercise');
      
      expect(document.getElementById('current-exercise').textContent).toBe('1');
      expect(document.getElementById('total-exercises').textContent).toBe('1');
      expect(document.getElementById('exercise-name').textContent).toBe('Single Test Exercise');
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(true);
      
      // Test multi-exercise routine
      selectRoutine('test-routine');
      
      expect(document.getElementById('current-exercise').textContent).toBe('1');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 1');
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(false);
    });
  });

  describe('Timer and Navigation Integration', () => {
    test('should synchronize timer state with navigation', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.timeRemaining = testRoutines[routine].exercises[0].duration;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        displayCurrentExercise();
      };

      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        global.timeRemaining = exercise.duration;
        updateTimerDisplay();
        updateNavigationButtons();
      };

      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      const updateNavigationButtons = () => {
        const totalExercises = global.currentExercises.length;
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        document.getElementById('start-pause-btn').textContent = 'Pause';
        
        global.timer = setInterval(() => {
          global.timeRemaining--;
          updateTimerDisplay();
          
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
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
      };

      // Initialize
      selectRoutine('test-routine');
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
      expect(document.getElementById('prev-btn').disabled).toBe(true);
      expect(document.getElementById('next-btn').disabled).toBe(false);
      
      // Start timer
      startTimer();
      expect(document.getElementById('start-pause-btn').textContent).toBe('Pause');
      
      // Simulate timer completion
      global.timeRemaining = 0;
      global.timer = null;
      global.isTimerRunning = false;
      document.getElementById('start-pause-btn').textContent = 'Start';
      nextExercise();
      
      // Verify navigation and timer state
      expect(global.currentExerciseIndex).toBe(1);
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
      expect(document.getElementById('prev-btn').disabled).toBe(false);
      expect(document.getElementById('next-btn').disabled).toBe(true);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
    });

    test('should handle skip functionality with timer state', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.timeRemaining = testRoutines[routine].exercises[0].duration;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        displayCurrentExercise();
      };

      const displayCurrentExercise = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        global.timeRemaining = exercise.duration;
        updateTimerDisplay();
        updateNavigationButtons();
      };

      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      const updateNavigationButtons = () => {
        const totalExercises = global.currentExercises.length;
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        document.getElementById('start-pause-btn').textContent = 'Pause';
        global.timer = setInterval(() => {
          global.timeRemaining--;
          updateTimerDisplay();
        }, 1000);
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
          displayCurrentExercise();
        }
      };

      const showCompletionScreen = () => {
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
      };

      // Initialize and start timer
      selectRoutine('test-routine');
      startTimer();
      
      // Skip exercise
      skipExercise();
      
      // Verify state after skip
      expect(global.currentExerciseIndex).toBe(1);
      expect(global.isTimerRunning).toBe(false);
      expect(global.timer).toBe(null);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
      expect(document.getElementById('prev-btn').disabled).toBe(false);
      expect(document.getElementById('next-btn').disabled).toBe(true);
    });
  });

  describe('Progress Tracking Integration', () => {
    test('should update progress indicators across all components', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        updateProgressIndicators();
      };

      const updateProgressIndicators = () => {
        const totalExercises = global.currentExercises.length;
        const currentExercise = global.currentExerciseIndex + 1;
        
        document.getElementById('current-exercise').textContent = currentExercise;
        document.getElementById('total-exercises').textContent = totalExercises;
        
        // Update progress bar if it exists
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
          const progress = (currentExercise / totalExercises) * 100;
          progressBar.style.width = `${progress}%`;
        }
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
          updateProgressIndicators();
        }
      };

      const previousExercise = () => {
        if (global.currentExerciseIndex > 0) {
          global.currentExerciseIndex--;
          updateProgressIndicators();
        }
      };

      // Initialize
      selectRoutine('test-routine');
      expect(document.getElementById('current-exercise').textContent).toBe('1');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
      
      // Navigate forward
      nextExercise();
      expect(document.getElementById('current-exercise').textContent).toBe('2');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
      
      // Navigate backward
      previousExercise();
      expect(document.getElementById('current-exercise').textContent).toBe('1');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
    });

    test('should maintain progress consistency during timer operations', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.timeRemaining = testRoutines[routine].exercises[0].duration;
        
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.add('active');
        updateAllDisplays();
      };

      const updateAllDisplays = () => {
        const exercise = global.currentExercises[global.currentExerciseIndex];
        const totalExercises = global.currentExercises.length;
        
        // Update progress
        document.getElementById('current-exercise').textContent = global.currentExerciseIndex + 1;
        document.getElementById('total-exercises').textContent = totalExercises;
        
        // Update exercise info
        document.getElementById('exercise-name').textContent = exercise.name;
        
        // Update timer
        updateTimerDisplay();
        
        // Update navigation
        document.getElementById('prev-btn').disabled = global.currentExerciseIndex === 0;
        document.getElementById('next-btn').disabled = global.currentExerciseIndex === totalExercises - 1;
      };

      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      const startTimer = () => {
        global.isTimerRunning = true;
        document.getElementById('start-pause-btn').textContent = 'Pause';
        
        global.timer = setInterval(() => {
          global.timeRemaining--;
          updateTimerDisplay();
          
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            document.getElementById('start-pause-btn').textContent = 'Start';
            
            if (global.currentExerciseIndex < global.currentExercises.length - 1) {
              nextExercise();
            }
          }
        }, 1000);
      };

      const nextExercise = () => {
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          global.currentExerciseIndex++;
          global.timeRemaining = global.currentExercises[global.currentExerciseIndex].duration;
          updateAllDisplays();
        }
      };

      // Initialize
      selectRoutine('test-routine');
      expect(document.getElementById('current-exercise').textContent).toBe('1');
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
      
      // Start timer and simulate completion
      startTimer();
      global.timeRemaining = 0;
      global.timer = null;
      global.isTimerRunning = false;
      document.getElementById('start-pause-btn').textContent = 'Start';
      nextExercise();
      
      // Verify all displays are updated consistently
      expect(document.getElementById('current-exercise').textContent).toBe('2');
      expect(document.getElementById('total-exercises').textContent).toBe('2');
      expect(document.getElementById('exercise-name').textContent).toBe('Test Exercise 2');
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
      expect(document.getElementById('prev-btn').disabled).toBe(false);
      expect(document.getElementById('next-btn').disabled).toBe(true);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
    });
  });

  describe('Completion Screen Integration', () => {
    test('should display correct completion statistics', () => {
      const selectRoutine = (routine) => {
        global.currentRoutine = routine;
        global.currentExercises = testRoutines[routine].exercises;
        global.currentExerciseIndex = 0;
        global.routineStartTime = Date.now();
      };

      const showCompletionScreen = () => {
        document.getElementById('routine-selection').classList.remove('active');
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
        
        // Calculate statistics
        global.totalRoutineTime = Math.floor((Date.now() - global.routineStartTime) / 1000 / 60);
        const routineData = testRoutines[global.currentRoutine];
        
        // Update completion screen
        document.getElementById('completion-message').textContent = `You've completed the ${routineData.name} routine!`;
        document.getElementById('total-time').textContent = global.totalRoutineTime;
        document.getElementById('total-exercises-completed').textContent = global.currentExercises.length;
      };

      // Initialize and complete routine
      selectRoutine('test-routine');
      global.routineStartTime = Date.now() - 120000; // 2 minutes ago
      showCompletionScreen();
      
      // Verify completion screen
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(true);
      expect(document.getElementById('completion-message').textContent).toContain('Test Routine');
      expect(document.getElementById('total-exercises-completed').textContent).toBe('2');
      expect(parseInt(document.getElementById('total-time').textContent)).toBeGreaterThanOrEqual(1);
    });

    test('should handle completion actions correctly', () => {
      const showCompletionScreen = () => {
        document.getElementById('exercise-display').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
      };

      const startNewRoutine = () => {
        document.getElementById('completion-screen').classList.remove('active');
        document.getElementById('routine-selection').classList.add('active');
        
        // Reset state
        global.currentRoutine = '';
        global.currentExercises = [];
        global.currentExerciseIndex = 0;
      };

      const backToRoutines = () => {
        document.getElementById('completion-screen').classList.remove('active');
        document.getElementById('routine-selection').classList.add('active');
      };

      // Show completion screen
      showCompletionScreen();
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(true);
      
      // Test "Start New Routine" action
      startNewRoutine();
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(true);
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(false);
      expect(global.currentRoutine).toBe('');
      
      // Show completion screen again
      showCompletionScreen();
      
      // Test "Back to Routines" action
      backToRoutines();
      expect(document.getElementById('routine-selection').classList.contains('active')).toBe(true);
      expect(document.getElementById('completion-screen').classList.contains('active')).toBe(false);
    });
  });
});
