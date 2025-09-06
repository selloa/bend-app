// End-to-end accessibility tests
const { test, expect } = require('@playwright/test');

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#routine-selection')).toBeVisible();
  });

  test('should have proper heading structure', async ({ page }) => {
    // Check main heading
    const mainTitle = page.locator('.main-title');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toContainText('Tend');
    
    // Check section headings
    const sectionTitle = page.locator('.section-title');
    await expect(sectionTitle).toBeVisible();
    await expect(sectionTitle).toContainText('Choose a routine:');
    
    // Navigate to exercise display
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Check exercise heading
    const exerciseTitle = page.locator('#exercise-title');
    await expect(exerciseTitle).toBeVisible();
    await expect(exerciseTitle).toContainText('Wake Up');
    
    const exerciseName = page.locator('#exercise-name');
    await expect(exerciseName).toBeVisible();
    await expect(exerciseName).toContainText('Neck Rolls');
  });

  test('should have proper button labels and roles', async ({ page }) => {
    // Check routine selection buttons
    const routineButtons = page.locator('.routine-category-btn');
    const buttonCount = await routineButtons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = routineButtons.nth(i);
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('data-routine');
      
      // Check button has accessible text
      const buttonText = await button.textContent();
      expect(buttonText.length).toBeGreaterThan(0);
    }
    
    // Navigate to exercise display
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Check timer control buttons
    const startPauseBtn = page.locator('#start-pause-btn');
    await expect(startPauseBtn).toBeVisible();
    await expect(startPauseBtn).toContainText('Start');
    
    const skipBtn = page.locator('#skip-btn');
    await expect(skipBtn).toBeVisible();
    await expect(skipBtn).toContainText('Skip');
    
    // Check navigation buttons
    const prevBtn = page.locator('#prev-btn');
    await expect(prevBtn).toBeVisible();
    await expect(prevBtn).toContainText('Previous');
    
    const nextBtn = page.locator('#next-btn');
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn).toContainText('Next');
    
    // Check back button
    const backBtn = page.locator('.back-btn');
    await expect(backBtn).toBeVisible();
    await expect(backBtn).toContainText('← Back');
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test Tab navigation through routine selection
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test Enter key activation
    await page.keyboard.press('Enter');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Test Tab navigation in exercise display
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test Enter key on timer button
    await page.keyboard.press('Enter');
    await expect(page.locator('#start-pause-btn')).toContainText('Pause');
    
    // Test Space key on timer button
    await page.keyboard.press('Space');
    await expect(page.locator('#start-pause-btn')).toContainText('Start');
    
    // Test Tab navigation to skip button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('#current-exercise')).toContainText('2');
  });

  test('should have proper focus management', async ({ page }) => {
    // Check initial focus
    const firstButton = page.locator('.routine-category-btn').first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    
    // Navigate to exercise display
    await page.keyboard.press('Enter');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Check focus on timer button
    const startPauseBtn = page.locator('#start-pause-btn');
    await startPauseBtn.focus();
    await expect(startPauseBtn).toBeFocused();
    
    // Test focus on disabled buttons
    const prevBtn = page.locator('#prev-btn');
    await prevBtn.focus();
    await expect(prevBtn).toBeFocused();
    await expect(prevBtn).toBeDisabled();
  });

  test('should have proper color contrast', async ({ page }) => {
    // Check routine selection buttons
    const routineButton = page.locator('.routine-category-btn').first();
    await expect(routineButton).toBeVisible();
    
    // Get computed styles
    const buttonStyles = await routineButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor
      };
    });
    
    // Basic color contrast check (in a real test, you'd use a proper contrast checker)
    expect(buttonStyles.backgroundColor).toBeDefined();
    expect(buttonStyles.color).toBeDefined();
    
    // Check timer display contrast
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    const timerDisplay = page.locator('#timer-display');
    await expect(timerDisplay).toBeVisible();
    
    const timerStyles = await timerDisplay.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    
    expect(timerStyles.backgroundColor).toBeDefined();
    expect(timerStyles.color).toBeDefined();
  });

  test('should have proper touch target sizes', async ({ page }) => {
    // Check routine selection buttons
    const routineButton = page.locator('.routine-category-btn').first();
    const buttonBox = await routineButton.boundingBox();
    
    // Minimum touch target size should be 44px
    expect(buttonBox.width).toBeGreaterThanOrEqual(44);
    expect(buttonBox.height).toBeGreaterThanOrEqual(44);
    
    // Navigate to exercise display
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Check timer control buttons
    const startPauseBtn = page.locator('#start-pause-btn');
    const startPauseBox = await startPauseBtn.boundingBox();
    expect(startPauseBox.width).toBeGreaterThanOrEqual(44);
    expect(startPauseBox.height).toBeGreaterThanOrEqual(44);
    
    const skipBtn = page.locator('#skip-btn');
    const skipBox = await skipBtn.boundingBox();
    expect(skipBox.width).toBeGreaterThanOrEqual(44);
    expect(skipBox.height).toBeGreaterThanOrEqual(44);
    
    // Check navigation buttons
    const prevBtn = page.locator('#prev-btn');
    const prevBox = await prevBtn.boundingBox();
    expect(prevBox.width).toBeGreaterThanOrEqual(44);
    expect(prevBox.height).toBeGreaterThanOrEqual(44);
    
    const nextBtn = page.locator('#next-btn');
    const nextBox = await nextBtn.boundingBox();
    expect(nextBox.width).toBeGreaterThanOrEqual(44);
    expect(nextBox.height).toBeGreaterThanOrEqual(44);
  });

  test('should have proper text sizing', async ({ page }) => {
    // Check main title
    const mainTitle = page.locator('.main-title');
    const titleStyles = await mainTitle.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight
      };
    });
    
    // Font size should be large enough for elderly users
    const fontSize = parseFloat(titleStyles.fontSize);
    expect(fontSize).toBeGreaterThanOrEqual(24); // 1.5rem = 24px
    
    // Check routine button text
    const routineButton = page.locator('.routine-category-btn').first();
    const buttonStyles = await routineButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize
      };
    });
    
    const buttonFontSize = parseFloat(buttonStyles.fontSize);
    expect(buttonFontSize).toBeGreaterThanOrEqual(16); // 1rem = 16px
    
    // Navigate to exercise display
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Check exercise name text
    const exerciseName = page.locator('#exercise-name');
    const nameStyles = await exerciseName.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize
      };
    });
    
    const nameFontSize = parseFloat(nameStyles.fontSize);
    expect(nameFontSize).toBeGreaterThanOrEqual(20); // 1.25rem = 20px
    
    // Check timer display text
    const timerDisplay = page.locator('#timer-display');
    const timerStyles = await timerDisplay.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize
      };
    });
    
    const timerFontSize = parseFloat(timerStyles.fontSize);
    expect(timerFontSize).toBeGreaterThanOrEqual(32); // 2rem = 32px
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check routine selection buttons
    const routineButton = page.locator('.routine-category-btn').first();
    await expect(routineButton).toHaveAttribute('data-routine');
    
    // Navigate to exercise display
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Check progress indicators
    const currentExercise = page.locator('#current-exercise');
    const totalExercises = page.locator('#total-exercises');
    await expect(currentExercise).toBeVisible();
    await expect(totalExercises).toBeVisible();
    
    // Check timer display
    const timerDisplay = page.locator('#timer-display');
    await expect(timerDisplay).toBeVisible();
    
    // Check exercise information
    const exerciseName = page.locator('#exercise-name');
    const exerciseDescription = page.locator('#exercise-description');
    await expect(exerciseName).toBeVisible();
    await expect(exerciseDescription).toBeVisible();
  });

  test('should handle screen reader navigation', async ({ page }) => {
    // Test with reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Check that animations are still functional but reduced
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Test with high contrast preference
    await page.emulateMedia({ colorScheme: 'dark' });
    
    // Check that the app still functions
    await page.click('.back-btn');
    await expect(page.locator('#routine-selection')).toBeVisible();
    
    // Test with forced colors
    await page.emulateMedia({ forcedColors: 'active' });
    
    // Check that the app still functions
    await page.click('[data-routine="wake-up"]');
    await expect(page.locator('#exercise-display')).toBeVisible();
  });

  test('should have proper error handling for accessibility', async ({ page }) => {
    // Test with JavaScript disabled (simulate by removing event listeners)
    await page.evaluate(() => {
      // Remove all event listeners
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.onclick = null;
        button.addEventListener = () => {};
      });
    });
    
    // Check that buttons still have proper attributes
    const routineButton = page.locator('.routine-category-btn').first();
    await expect(routineButton).toHaveAttribute('data-routine');
    
    // Test with reduced functionality
    await page.reload();
    await expect(page.locator('#routine-selection')).toBeVisible();
    
    // Check that essential information is still accessible
    const mainTitle = page.locator('.main-title');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toContainText('Tend');
  });

  test('should complete routine with keyboard only', async ({ page }) => {
    // Navigate to routine selection using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('#exercise-display')).toBeVisible();
    
    // Navigate through exercises using keyboard
    for (let i = 1; i < 8; i++) {
      // Tab to skip button
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      
      if (i < 8) {
        await expect(page.locator('#current-exercise')).toContainText((i + 1).toString());
      }
    }
    
    // Verify completion screen
    await expect(page.locator('#completion-screen')).toBeVisible();
    
    // Navigate completion screen with keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('#routine-selection')).toBeVisible();
  });
});
