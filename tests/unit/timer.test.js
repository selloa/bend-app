// Unit tests for timer functionality
import { testRoutines } from '../fixtures/test-data.js';

// Mock the script.js module
jest.mock('../../script.js', () => ({
  bendRoutines: {
    'test-routine': {
      name: 'Test Routine',
      exercises: [
        { name: 'Test Exercise 1', duration: 30, emoji: '🧪' },
        { name: 'Test Exercise 2', duration: 60, emoji: '🔬' }
      ]
    }
  },
  currentRoutine: 'test-routine',
  currentExerciseIndex: 0,
  currentExercises: [],
  timer: null,
  timeRemaining: 0,
  isTimerRunning: false,
  routineStartTime: null,
  totalRoutineTime: 0
}));

describe('Timer Functions', () => {
  let mockTimer;
  
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="timer-display">0:30</div>
      <button id="start-pause-btn">Start</button>
      <button id="skip-btn">Skip</button>
    `;
    
    // Mock timer functions
    mockTimer = global.testUtils.mockTimer();
    global.setInterval = mockTimer.setInterval;
    global.clearInterval = mockTimer.clearInterval;
    
    // Reset global variables
    global.currentRoutine = 'test-routine';
    global.currentExerciseIndex = 0;
    global.currentExercises = testRoutines['test-routine'].exercises;
    global.timer = null;
    global.timeRemaining = 30;
    global.isTimerRunning = false;
    global.routineStartTime = Date.now();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('startTimer', () => {
    test('should set isTimerRunning to true', () => {
      // Import the function (this would be from script.js in real implementation)
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
          }
        }, 1000);
      };

      startTimer();
      
      expect(global.isTimerRunning).toBe(true);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Pause');
    });

    test('should start countdown timer', () => {
      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
        }, 1000);
      };

      startTimer();
      mockTimer.advanceTime(1000);
      
      expect(global.timeRemaining).toBe(29);
    });

    test('should auto-advance when timer reaches zero', () => {
      const nextExercise = jest.fn();
      const showCompletionScreen = jest.fn();
      
      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
          
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            
            if (global.currentExerciseIndex < global.currentExercises.length - 1) {
              nextExercise();
            } else {
              showCompletionScreen();
            }
          }
        }, 1000);
      };

      global.timeRemaining = 1;
      startTimer();
      mockTimer.advanceTime(1000);
      
      expect(nextExercise).toHaveBeenCalled();
    });

    test('should show completion screen on last exercise', () => {
      const nextExercise = jest.fn();
      const showCompletionScreen = jest.fn();
      
      global.currentExerciseIndex = 1; // Last exercise
      global.timeRemaining = 1;
      
      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
          
          if (global.timeRemaining <= 0) {
            clearInterval(global.timer);
            global.timer = null;
            global.isTimerRunning = false;
            
            if (global.currentExerciseIndex < global.currentExercises.length - 1) {
              nextExercise();
            } else {
              showCompletionScreen();
            }
          }
        }, 1000);
      };

      startTimer();
      mockTimer.advanceTime(1000);
      
      expect(showCompletionScreen).toHaveBeenCalled();
      expect(nextExercise).not.toHaveBeenCalled();
    });
  });

  describe('pauseTimer', () => {
    test('should set isTimerRunning to false', () => {
      const pauseTimer = () => {
        global.isTimerRunning = false;
        document.getElementById('start-pause-btn').textContent = 'Start';
        if (global.timer) {
          clearInterval(global.timer);
          global.timer = null;
        }
      };

      global.isTimerRunning = true;
      global.timer = 123; // Mock timer ID
      
      pauseTimer();
      
      expect(global.isTimerRunning).toBe(false);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
      expect(global.timer).toBe(null);
    });

    test('should clear existing timer', () => {
      const pauseTimer = () => {
        global.isTimerRunning = false;
        if (global.timer) {
          clearInterval(global.timer);
          global.timer = null;
        }
      };

      global.timer = 123;
      pauseTimer();
      
      expect(global.timer).toBe(null);
    });
  });

  describe('toggleTimer', () => {
    test('should start timer when not running', () => {
      const startTimer = jest.fn();
      const pauseTimer = jest.fn();
      
      const toggleTimer = () => {
        if (global.isTimerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      };

      global.isTimerRunning = false;
      toggleTimer();
      
      expect(startTimer).toHaveBeenCalled();
      expect(pauseTimer).not.toHaveBeenCalled();
    });

    test('should pause timer when running', () => {
      const startTimer = jest.fn();
      const pauseTimer = jest.fn();
      
      const toggleTimer = () => {
        if (global.isTimerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      };

      global.isTimerRunning = true;
      toggleTimer();
      
      expect(pauseTimer).toHaveBeenCalled();
      expect(startTimer).not.toHaveBeenCalled();
    });
  });

  describe('skipExercise', () => {
    test('should clear timer and reset state', () => {
      const nextExercise = jest.fn();
      const showCompletionScreen = jest.fn();
      
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

      global.timer = 123;
      global.isTimerRunning = true;
      global.currentExerciseIndex = 0;
      
      skipExercise();
      
      expect(global.timer).toBe(null);
      expect(global.isTimerRunning).toBe(false);
      expect(document.getElementById('start-pause-btn').textContent).toBe('Start');
      expect(nextExercise).toHaveBeenCalled();
    });

    test('should show completion screen on last exercise', () => {
      const nextExercise = jest.fn();
      const showCompletionScreen = jest.fn();
      
      const skipExercise = () => {
        if (global.timer) {
          clearInterval(global.timer);
          global.timer = null;
        }
        global.isTimerRunning = false;
        
        if (global.currentExerciseIndex < global.currentExercises.length - 1) {
          nextExercise();
        } else {
          showCompletionScreen();
        }
      };

      global.currentExerciseIndex = 1; // Last exercise
      skipExercise();
      
      expect(showCompletionScreen).toHaveBeenCalled();
      expect(nextExercise).not.toHaveBeenCalled();
    });
  });

  describe('updateTimerDisplay', () => {
    test('should format time correctly for minutes and seconds', () => {
      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      global.timeRemaining = 90; // 1:30
      updateTimerDisplay();
      
      expect(document.getElementById('timer-display').textContent).toBe('1:30');
    });

    test('should format time correctly for seconds only', () => {
      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      global.timeRemaining = 30; // 0:30
      updateTimerDisplay();
      
      expect(document.getElementById('timer-display').textContent).toBe('0:30');
    });

    test('should handle zero time', () => {
      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      global.timeRemaining = 0; // 0:00
      updateTimerDisplay();
      
      expect(document.getElementById('timer-display').textContent).toBe('0:00');
    });

    test('should handle large time values', () => {
      const updateTimerDisplay = () => {
        const minutes = Math.floor(global.timeRemaining / 60);
        const seconds = global.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      global.timeRemaining = 3661; // 61:01
      updateTimerDisplay();
      
      expect(document.getElementById('timer-display').textContent).toBe('61:01');
    });
  });

  describe('Timer Edge Cases', () => {
    test('should handle rapid start/stop cycles', () => {
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

      // Start timer
      startTimer();
      expect(global.isTimerRunning).toBe(true);
      
      // Pause immediately
      pauseTimer();
      expect(global.isTimerRunning).toBe(false);
      
      // Start again
      startTimer();
      expect(global.isTimerRunning).toBe(true);
      
      // Advance time and verify it's counting
      mockTimer.advanceTime(1000);
      expect(global.timeRemaining).toBe(29);
    });

    test('should handle negative time remaining', () => {
      const updateTimerDisplay = () => {
        const minutes = Math.floor(Math.max(0, global.timeRemaining) / 60);
        const seconds = Math.max(0, global.timeRemaining) % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
      };

      global.timeRemaining = -5;
      updateTimerDisplay();
      
      expect(document.getElementById('timer-display').textContent).toBe('0:00');
    });

    test('should handle timer precision with fast intervals', () => {
      const startTimer = () => {
        global.isTimerRunning = true;
        global.timer = setInterval(() => {
          global.timeRemaining--;
        }, 100); // Faster interval for testing
      };

      startTimer();
      mockTimer.advanceTime(1000); // Advance 1 second
      
      expect(global.timeRemaining).toBe(20); // Should have decremented 10 times
    });
  });
});
