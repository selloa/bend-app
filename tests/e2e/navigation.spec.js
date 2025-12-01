// End-to-end tests for navigation functionality
const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#routine-selection')).toBeVisible();
  });

  test('should navigate between routine selection and exercise display', async ({ page }) => {
    // Start in routine selection
    await expect(page.locator('#routine-selection')).toBeVisible();
    await expect(page.locator('#exercise-display')).not.toBeVisible();
    
    // Select a routine
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#routine-selection')).not.toBeVisible();
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Go back to routine selection
    await page.click('.back-btn');
    await expect(page.locator('#routine-selection')).toBeVisible();
    await expect(page.locator('#exercise-display')).not.toBeVisible();
  });

  test('should navigate between exercises using next/previous buttons', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Verify initial state
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#total-exercises')).toContainText('8');
    await expect(page.locator('#prev-btn')).toBeDisabled();
    await expect(page.locator('#next-btn')).toBeEnabled();
    
    // Navigate to next exercise
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    await expect(page.locator('#prev-btn')).toBeEnabled();
    await expect(page.locator('#next-btn')).toBeEnabled();
    
    // Navigate to next exercise
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('3');
    
    // Navigate back to previous exercise
    await page.click('#prev-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Navigate back to first exercise
    await page.click('#prev-btn');
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#prev-btn')).toBeDisabled();
  });

  test('should handle navigation at exercise boundaries', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Go to first exercise
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#prev-btn')).toBeDisabled();
    
    // Try to go to previous (should not work)
    await page.click('#prev-btn');
    await expect(page.locator('#current-exercise')).toContainText('1');
    
    // Navigate to last exercise
    for (let i = 1; i < 8; i++) {
      await page.click('#next-btn');
    }
    
    await expect(page.locator('#current-exercise')).toContainText('8');
    await expect(page.locator('#next-btn')).toBeDisabled();
    
    // Try to go to next (should not work)
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('8');
  });

  test('should update exercise information during navigation', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Verify first exercise
    await expect(page.locator('#exercise-name')).toContainText('Neck Rolls');
    await expect(page.locator('#exercise-description')).toContainText('Slowly roll your head');
    
    // Navigate to second exercise
    await page.click('#next-btn');
    await expect(page.locator('#exercise-name')).toContainText('Shoulder Shrugs');
    await expect(page.locator('#exercise-description')).toContainText('Lift your shoulders');
    
    // Navigate to third exercise
    await page.click('#next-btn');
    await expect(page.locator('#exercise-name')).toContainText('Side Neck Stretch');
    await expect(page.locator('#exercise-description')).toContainText('Gently tilt your head');
    
    // Go back to first exercise
    await page.click('#prev-btn');
    await page.click('#prev-btn');
    await expect(page.locator('#exercise-name')).toContainText('Neck Rolls');
  });

  test('should update timer display during navigation', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Verify initial timer display
    await expect(page.locator('#timer-display')).toContainText('0:30');
    
    // Navigate to different exercises and verify timer updates
    await page.click('#next-btn');
    await expect(page.locator('#timer-display')).toContainText('0:30');
    
    // Test with a routine that has different durations
    await page.click('.back-btn');
    await page.click('[data-routine="full-body"]');
    
    // Full body exercises are 60 seconds each
    await expect(page.locator('#timer-display')).toContainText('1:00');
    
    await page.click('#next-btn');
    await expect(page.locator('#timer-display')).toContainText('1:00');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test Enter key on buttons
    await page.keyboard.press('Enter');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Test arrow key navigation (if implemented)
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#current-exercise')).toContainText('1');
    
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#current-exercise')).toContainText('2');
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Start in routine selection
    await expect(page.locator('#routine-selection')).toBeVisible();
    
    // Select routine
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Navigate to second exercise
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Use browser back button
    await page.goBack();
    
    // Should return to routine selection (since it's a single page app)
    await expect(page.locator('#routine-selection')).toBeVisible();
    
    // Use browser forward button
    await page.goForward();
    
    // Should return to exercise display
    await expect(page.locator('#exercise-display')).toBeVisible();
  });

  test('should maintain navigation state during timer operations', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Navigate to second exercise
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Start timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Navigate while timer is running
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('3');
    await expect(page.locator('#start-pause-btn')).toContainText('Start'); // Timer should reset
    
    // Navigate back
    await page.click('#prev-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Start timer again
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Pause timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Start');
    
    // Navigate should still work
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('3');
  });

  test('should handle navigation with skip functionality', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Skip first exercise
    await page.click('#skip-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Navigate back to first exercise
    await page.click('#prev-btn');
    await expect(page.locator('#current-exercise')).toContainText('1');
    
    // Skip again
    await page.click('#skip-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Navigate forward
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('3');
    
    // Skip to completion
    for (let i = 3; i < 8; i++) {
      await page.click('#skip-btn');
    }
    
    await expect(page.locator('#completion-screen')).toBeVisible();
  });

  test('should handle navigation in different routine types', async ({ page }) => {
    const routines = [
      { key: 'wake-up', exerciseCount: 8 },
      { key: 'posture-reset', exerciseCount: 8 },
      { key: 'full-body', exerciseCount: 11 },
      { key: 'sleep', exerciseCount: 8 },
      { key: 'expert', exerciseCount: 10 }
    ];

    for (const routine of routines) {
      // Go back to routine selection
      await page.click('.back-btn');
      await expect(page.locator('#routine-selection')).toBeVisible();
      
      // Select routine
      await page.click(`[data-routine="${routine.key}"]`);
      await expect(page.locator('#exercise-display')).toBeVisible();
      
      // Verify initial state
      await expect(page.locator('#current-exercise')).toContainText('1');
      await expect(page.locator('#total-exercises')).toContainText(routine.exerciseCount.toString());
      await expect(page.locator('#prev-btn')).toBeDisabled();
      
      // Navigate to middle exercise
      const middleExercise = Math.floor(routine.exerciseCount / 2);
      for (let i = 1; i < middleExercise; i++) {
        await page.click('#next-btn');
      }
      
      await expect(page.locator('#current-exercise')).toContainText(middleExercise.toString());
      await expect(page.locator('#prev-btn')).toBeEnabled();
      await expect(page.locator('#next-btn')).toBeEnabled();
      
      // Navigate to last exercise
      for (let i = middleExercise; i < routine.exerciseCount; i++) {
        await page.click('#next-btn');
      }
      
      await expect(page.locator('#current-exercise')).toContainText(routine.exerciseCount.toString());
      await expect(page.locator('#next-btn')).toBeDisabled();
      
      // Navigate back to first exercise
      for (let i = routine.exerciseCount; i > 1; i--) {
        await page.click('#prev-btn');
      }
      
      await expect(page.locator('#current-exercise')).toContainText('1');
      await expect(page.locator('#prev-btn')).toBeDisabled();
    }
  });

  test('should handle rapid navigation without errors', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Rapidly click next button
    for (let i = 0; i < 10; i++) {
      await page.click('#next-btn');
      await page.waitForTimeout(10);
    }
    
    // Should be on last exercise
    await expect(page.locator('#current-exercise')).toContainText('8');
    await expect(page.locator('#next-btn')).toBeDisabled();
    
    // Rapidly click previous button
    for (let i = 0; i < 10; i++) {
      await page.click('#prev-btn');
      await page.waitForTimeout(10);
    }
    
    // Should be on first exercise
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#prev-btn')).toBeDisabled();
  });
});
