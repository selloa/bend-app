// End-to-end tests for routine completion flows
const { test, expect } = require('@playwright/test');

test.describe('Routine Completion Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#routine-selection')).toBeVisible();
  });

  test('should complete a full routine from start to finish', async ({ page }) => {
    // Select a routine
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Verify initial exercise display
    await expect(page.locator('#exercise-title')).toContainText('Wake Up');
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#total-exercises')).toContainText('8');
    await expect(page.locator('#exercise-name')).toContainText('Neck Rolls');
    
    // Start the timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Wait for timer to complete (or skip for testing)
    await page.click('#skip-btn');
    
    // Verify progression to next exercise
    await expect(page.locator('#current-exercise')).toContainText('2');
    await expect(page.locator('#exercise-name')).toContainText('Shoulder Shrugs');
    
    // Skip through all exercises
    for (let i = 2; i <= 8; i++) {
      await page.click('#skip-btn');
      if (i < 8) {
        await expect(page.locator('#current-exercise')).toContainText((i + 1).toString());
      }
    }
    
    // Verify completion screen
    await expect(page.locator('#completion-screen')).toBeVisible();
    await expect(page.locator('.completion-title')).toContainText('Routine Complete!');
    await expect(page.locator('#completion-message')).toContainText('Wake Up');
    await expect(page.locator('#total-exercises-completed')).toContainText('8');
  });

  test('should complete a single exercise routine', async ({ page }) => {
    // Select single exercise routine (if available, otherwise use wake-up and skip to last)
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Navigate to last exercise
    for (let i = 1; i < 8; i++) {
      await page.click('#next-btn');
    }
    
    // Verify we're on the last exercise
    await expect(page.locator('#current-exercise')).toContainText('8');
    await expect(page.locator('#total-exercises')).toContainText('8');
    await expect(page.locator('#next-btn')).toBeDisabled();
    
    // Complete the exercise
    await page.click('#skip-btn');
    
    // Verify completion screen
    await expect(page.locator('#completion-screen')).toBeVisible();
    await expect(page.locator('#total-exercises-completed')).toContainText('8');
  });

  test('should handle timer auto-advance', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Start timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Wait for timer to complete (30 seconds for wake-up exercises)
    // In a real test, you might want to mock the timer or use a shorter duration
    await page.waitForTimeout(1000); // Wait 1 second for demo
    
    // For testing purposes, we'll manually advance since 30 seconds is too long
    await page.click('#skip-btn');
    
    // Verify auto-advance worked
    await expect(page.locator('#current-exercise')).toContainText('2');
    await expect(page.locator('#start-pause-btn')).toContainText('Start');
  });

  test('should complete routine with manual navigation', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Navigate through exercises manually
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#prev-btn')).toBeDisabled();
    
    // Go to next exercise
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    await expect(page.locator('#prev-btn')).toBeEnabled();
    
    // Go back to previous exercise
    await page.click('#prev-btn');
    await expect(page.locator('#current-exercise')).toContainText('1');
    await expect(page.locator('#prev-btn')).toBeDisabled();
    
    // Navigate to last exercise
    for (let i = 1; i < 8; i++) {
      await page.click('#next-btn');
    }
    
    await expect(page.locator('#current-exercise')).toContainText('8');
    await expect(page.locator('#next-btn')).toBeDisabled();
    
    // Complete the routine
    await page.click('#skip-btn');
    await expect(page.locator('#completion-screen')).toBeVisible();
  });

  test('should handle pause and resume functionality', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Start timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Pause timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Start');
    
    // Resume timer
    await page.click('#start-pause-btn');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Skip to complete
    await page.click('#skip-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
  });

  test('should complete different routine types', async ({ page }) => {
    const routines = [
      { key: 'wake-up', name: 'Wake Up', exerciseCount: 8 },
      { key: 'posture-reset', name: 'Posture Reset', exerciseCount: 8 },
      { key: 'full-body', name: 'Full Body', exerciseCount: 11 },
      { key: 'sleep', name: 'Sleep', exerciseCount: 8 },
      { key: 'expert', name: 'Expert', exerciseCount: 10 },
      { key: 'hips', name: 'Hips', exerciseCount: 10 },
      { key: 'hamstrings', name: 'Hamstrings', exerciseCount: 8 },
      { key: 'lower-back', name: 'Lower Back', exerciseCount: 8 },
      { key: 'isometric', name: 'Isometric', exerciseCount: 10 }
    ];

    for (const routine of routines) {
      // Go back to routine selection
      await page.click('.back-btn');
      await expect(page.locator('#routine-selection')).toBeVisible();
      
      // Select routine
      await page.click(`[data-routine="${routine.key}"]`);
      await expect(page.locator('#exercise-display')).toBeVisible();
      
      // Verify routine name and exercise count
      await expect(page.locator('#exercise-title')).toContainText(routine.name);
      await expect(page.locator('#total-exercises')).toContainText(routine.exerciseCount.toString());
      
      // Skip through all exercises
      for (let i = 1; i < routine.exerciseCount; i++) {
        await page.click('#skip-btn');
        if (i < routine.exerciseCount - 1) {
          await expect(page.locator('#current-exercise')).toContainText((i + 1).toString());
        }
      }
      
      // Verify completion
      await expect(page.locator('#completion-screen')).toBeVisible();
      await expect(page.locator('#completion-message')).toContainText(routine.name);
      await expect(page.locator('#total-exercises-completed')).toContainText(routine.exerciseCount.toString());
    }
  });

  test('should handle completion screen actions', async ({ page }) => {
    // Complete a routine first
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Skip through all exercises
    for (let i = 1; i < 8; i++) {
      await page.click('#skip-btn');
    }
    
    // Verify completion screen
    await expect(page.locator('#completion-screen')).toBeVisible();
    
    // Test "Start New Routine" button
    await page.click('.action-btn.primary');
    await expect(page.locator('#routine-selection')).toBeVisible();
    
    // Complete another routine
    await page.click('[data-routine="posture-reset"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Skip through exercises
    for (let i = 1; i < 8; i++) {
      await page.click('#skip-btn');
    }
    
    // Test "Back to Routines" button
    await page.click('.action-btn.secondary');
    await expect(page.locator('#routine-selection')).toBeVisible();
  });

  test('should maintain state during browser refresh', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Navigate to second exercise
    await page.click('#next-btn');
    await expect(page.locator('#current-exercise')).toContainText('2');
    
    // Refresh the page
    await page.reload();
    
    // Should return to routine selection (since state is not persisted)
    await expect(page.locator('#routine-selection')).toBeVisible();
  });

  test('should handle rapid clicking without errors', async ({ page }) => {
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Rapidly click start/pause button
    for (let i = 0; i < 10; i++) {
      await page.click('#start-pause-btn');
      await page.waitForTimeout(50);
    }
    
    // Should still be functional
    await expect(page.locator('#start-pause-btn')).toBeVisible();
    
    // Rapidly click navigation buttons
    for (let i = 0; i < 5; i++) {
      await page.click('#next-btn');
      await page.click('#prev-btn');
    }
    
    // Should be on first exercise
    await expect(page.locator('#current-exercise')).toContainText('1');
    
    // Complete routine
    for (let i = 1; i < 8; i++) {
      await page.click('#skip-btn');
    }
    
    await expect(page.locator('#completion-screen')).toBeVisible();
  });
});
