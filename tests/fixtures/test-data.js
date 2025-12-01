// Test data fixtures for Tend app testing

export const testRoutines = {
  "test-routine": {
    name: "Test Routine",
    description: "A test routine for automated testing",
    duration: "2 minutes",
    exercises: [
      {
        name: "Test Exercise 1",
        description: "First test exercise description",
        duration: 30,
        emoji: "🧪"
      },
      {
        name: "Test Exercise 2", 
        description: "Second test exercise description",
        duration: 30,
        emoji: "🔬"
      }
    ]
  },
  "single-exercise": {
    name: "Single Exercise Routine",
    description: "Routine with only one exercise",
    duration: "1 minute",
    exercises: [
      {
        name: "Single Test Exercise",
        description: "Only exercise in this routine",
        duration: 60,
        emoji: "1️⃣"
      }
    ]
  },
  "long-routine": {
    name: "Long Test Routine",
    description: "Routine with many exercises for testing",
    duration: "10 minutes",
    exercises: Array.from({ length: 10 }, (_, i) => ({
      name: `Test Exercise ${i + 1}`,
      description: `Description for test exercise ${i + 1}`,
      duration: 60,
      emoji: `${i + 1}️⃣`
    }))
  }
};

export const invalidRoutineData = {
  "missing-name": {
    description: "Routine missing name",
    duration: "1 minute",
    exercises: []
  },
  "missing-exercises": {
    name: "No Exercises",
    description: "Routine with no exercises",
    duration: "0 minutes"
  },
  "invalid-exercise": {
    name: "Invalid Exercise",
    description: "Routine with invalid exercise data",
    duration: "1 minute",
    exercises: [
      {
        name: "Valid Exercise",
        description: "Valid description",
        duration: 30,
        emoji: "✅"
      },
      {
        // Missing required fields
        description: "Invalid exercise missing name and duration"
      }
    ]
  }
};

export const mockDOMStructure = {
  routineSelection: `
    <section id="routine-selection" class="section active">
      <div class="routine-categories">
        <button class="routine-category-btn" data-routine="test-routine">Test Routine</button>
      </div>
    </section>
  `,
  exerciseDisplay: `
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
  `,
  completionScreen: `
    <section id="completion-screen" class="section">
      <div class="completion-content">
        <div class="completion-icon">🎉</div>
        <h2 class="completion-title">Routine Complete!</h2>
        <p id="completion-message">Great job!</p>
        <div class="completion-stats">
          <div class="stat">
            <span id="total-time">5</span>
            <span class="stat-label">Minutes</span>
          </div>
          <div class="stat">
            <span id="total-exercises-completed">2</span>
            <span class="stat-label">Exercises</span>
          </div>
        </div>
        <div class="completion-actions">
          <button class="action-btn primary">Start New Routine</button>
          <button class="action-btn secondary">Back to Routines</button>
        </div>
      </div>
    </section>
  `
};

export const testUserInteractions = {
  routineSelection: [
    { action: 'click', selector: '[data-routine="test-routine"]' },
    { action: 'click', selector: '[data-routine="single-exercise"]' }
  ],
  timerControls: [
    { action: 'click', selector: '#start-pause-btn' },
    { action: 'click', selector: '#skip-btn' }
  ],
  navigation: [
    { action: 'click', selector: '#prev-btn' },
    { action: 'click', selector: '#next-btn' },
    { action: 'click', selector: '.back-btn' }
  ]
};

export const accessibilityTestCases = {
  colorContrast: {
    valid: [
      { foreground: '#2c3e50', background: '#ffffff', ratio: 12.63 },
      { foreground: '#7f8c8d', background: '#ffffff', ratio: 4.54 }
    ],
    invalid: [
      { foreground: '#cccccc', background: '#ffffff', ratio: 1.6 }
    ]
  },
  touchTargets: {
    valid: [
      { selector: '.routine-category-btn', minSize: 44 },
      { selector: '.timer-btn', minSize: 44 },
      { selector: '.nav-btn', minSize: 44 }
    ]
  },
  keyboardNavigation: [
    { key: 'Tab', expectedFocus: 'routine-category-btn' },
    { key: 'Enter', expectedAction: 'selectRoutine' },
    { key: 'Escape', expectedAction: 'goBack' }
  ]
};

export const performanceTestData = {
  loadTimeThresholds: {
    firstContentfulPaint: 1500, // ms
    largestContentfulPaint: 2500, // ms
    firstInputDelay: 100, // ms
    cumulativeLayoutShift: 0.1
  },
  memoryThresholds: {
    initialMemoryUsage: 50, // MB
    maxMemoryUsage: 100, // MB
    memoryLeakThreshold: 10 // MB increase per hour
  }
};
