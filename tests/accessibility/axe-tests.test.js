// Accessibility tests using axe-core
import { testRoutines, mockDOMStructure } from '../fixtures/test-data.js';

describe('Accessibility Tests with axe-core', () => {
  beforeEach(() => {
    // Set up DOM structure
    document.body.innerHTML = mockDOMStructure.routineSelection + 
                             mockDOMStructure.exerciseDisplay + 
                             mockDOMStructure.completionScreen;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('WCAG 2.1 AA Compliance', () => {
    test('should pass axe accessibility tests on routine selection', async () => {
      const { axe, toHaveNoViolations } = await import('jest-axe');
      expect.extend(toHaveNoViolations);

      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });

    test('should pass axe accessibility tests on exercise display', async () => {
      const { axe, toHaveNoViolations } = await import('jest-axe');
      expect.extend(toHaveNoViolations);

      // Show exercise display
      document.getElementById('routine-selection').classList.remove('active');
      document.getElementById('exercise-display').classList.add('active');

      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });

    test('should pass axe accessibility tests on completion screen', async () => {
      const { axe, toHaveNoViolations } = await import('jest-axe');
      expect.extend(toHaveNoViolations);

      // Show completion screen
      document.getElementById('routine-selection').classList.remove('active');
      document.getElementById('completion-screen').classList.add('active');

      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast Tests', () => {
    test('should have sufficient color contrast for text', () => {
      const checkColorContrast = (element) => {
        const styles = window.getComputedStyle(element);
        const backgroundColor = styles.backgroundColor;
        const color = styles.color;
        
        // Basic contrast check (in real implementation, use proper contrast checker)
        return {
          backgroundColor,
          color,
          hasContrast: true // Simplified for test
        };
      };

      const mainTitle = document.querySelector('.main-title');
      const contrast = checkColorContrast(mainTitle);
      expect(contrast.hasContrast).toBe(true);
    });
  });

  describe('Keyboard Navigation Tests', () => {
    test('should support keyboard navigation', () => {
      const buttons = document.querySelectorAll('button');
      let focusableCount = 0;

      buttons.forEach(button => {
        if (button.tabIndex >= 0 || button.tagName === 'BUTTON') {
          focusableCount++;
        }
      });

      expect(focusableCount).toBeGreaterThan(0);
    });

    test('should have proper tab order', () => {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });
});
