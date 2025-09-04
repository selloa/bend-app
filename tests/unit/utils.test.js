// Unit tests for utility functions
describe('Utility Functions', () => {
  describe('DOM Utilities', () => {
    const createElement = (tagName, attributes = {}, textContent = '') => {
      const element = document.createElement(tagName);
      Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
      });
      if (textContent) {
        element.textContent = textContent;
      }
      return element;
    };

    const addClass = (element, className) => {
      if (element && typeof element.classList !== 'undefined') {
        element.classList.add(className);
      }
    };

    const removeClass = (element, className) => {
      if (element && typeof element.classList !== 'undefined') {
        element.classList.remove(className);
      }
    };

    const hasClass = (element, className) => {
      return element && element.classList && element.classList.contains(className);
    };

    test('should create element with attributes', () => {
      const button = createElement('button', { id: 'test-btn', 'data-routine': 'wake-up' }, 'Test Button');
      
      expect(button.tagName).toBe('BUTTON');
      expect(button.id).toBe('test-btn');
      expect(button.getAttribute('data-routine')).toBe('wake-up');
      expect(button.textContent).toBe('Test Button');
    });

    test('should add class to element', () => {
      const div = document.createElement('div');
      addClass(div, 'active');
      
      expect(div.classList.contains('active')).toBe(true);
    });

    test('should remove class from element', () => {
      const div = document.createElement('div');
      div.classList.add('active');
      removeClass(div, 'active');
      
      expect(div.classList.contains('active')).toBe(false);
    });

    test('should check if element has class', () => {
      const div = document.createElement('div');
      div.classList.add('active');
      
      expect(hasClass(div, 'active')).toBe(true);
      expect(hasClass(div, 'inactive')).toBe(false);
    });

    test('should handle null element gracefully', () => {
      expect(() => addClass(null, 'test')).not.toThrow();
      expect(() => removeClass(null, 'test')).not.toThrow();
      expect(hasClass(null, 'test')).toBe(false);
    });
  });

  describe('Time Utilities', () => {
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const parseTime = (timeString) => {
      const [minutes, seconds] = timeString.split(':').map(Number);
      return minutes * 60 + seconds;
    };

    const getCurrentTimestamp = () => {
      return Date.now();
    };

    const calculateElapsedTime = (startTime, endTime = null) => {
      const end = endTime || Date.now();
      return Math.floor((end - startTime) / 1000);
    };

    test('should format time correctly', () => {
      expect(formatTime(30)).toBe('0:30');
      expect(formatTime(90)).toBe('1:30');
      expect(formatTime(3661)).toBe('61:01');
      expect(formatTime(0)).toBe('0:00');
    });

    test('should parse time string correctly', () => {
      expect(parseTime('0:30')).toBe(30);
      expect(parseTime('1:30')).toBe(90);
      expect(parseTime('61:01')).toBe(3661);
      expect(parseTime('0:00')).toBe(0);
    });

    test('should get current timestamp', () => {
      const timestamp = getCurrentTimestamp();
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBeGreaterThan(0);
    });

    test('should calculate elapsed time', () => {
      const startTime = Date.now() - 5000; // 5 seconds ago
      const elapsed = calculateElapsedTime(startTime);
      
      expect(elapsed).toBeGreaterThanOrEqual(4);
      expect(elapsed).toBeLessThanOrEqual(6);
    });

    test('should calculate elapsed time with custom end time', () => {
      const startTime = 1000;
      const endTime = 4000;
      const elapsed = calculateElapsedTime(startTime, endTime);
      
      expect(elapsed).toBe(3);
    });
  });

  describe('Validation Utilities', () => {
    const isValidString = (value) => {
      return typeof value === 'string' && value.trim().length > 0;
    };

    const isValidNumber = (value) => {
      return typeof value === 'number' && !isNaN(value) && isFinite(value);
    };

    const isValidPositiveInteger = (value) => {
      return isValidNumber(value) && Number.isInteger(value) && value > 0;
    };

    const isValidArray = (value) => {
      return Array.isArray(value) && value.length > 0;
    };

    const isValidObject = (value) => {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    };

    test('should validate strings', () => {
      expect(isValidString('hello')).toBe(true);
      expect(isValidString('  hello  ')).toBe(true);
      expect(isValidString('')).toBe(false);
      expect(isValidString('   ')).toBe(false);
      expect(isValidString(null)).toBe(false);
      expect(isValidString(undefined)).toBe(false);
      expect(isValidString(123)).toBe(false);
    });

    test('should validate numbers', () => {
      expect(isValidNumber(123)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-123)).toBe(true);
      expect(isValidNumber(123.45)).toBe(true);
      expect(isValidNumber('123')).toBe(false);
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber(null)).toBe(false);
    });

    test('should validate positive integers', () => {
      expect(isValidPositiveInteger(123)).toBe(true);
      expect(isValidPositiveInteger(1)).toBe(true);
      expect(isValidPositiveInteger(0)).toBe(false);
      expect(isValidPositiveInteger(-123)).toBe(false);
      expect(isValidPositiveInteger(123.45)).toBe(false);
      expect(isValidPositiveInteger('123')).toBe(false);
    });

    test('should validate arrays', () => {
      expect(isValidArray([1, 2, 3])).toBe(true);
      expect(isValidArray(['a', 'b'])).toBe(true);
      expect(isValidArray([])).toBe(false);
      expect(isValidArray(null)).toBe(false);
      expect(isValidArray({})).toBe(false);
      expect(isValidArray('array')).toBe(false);
    });

    test('should validate objects', () => {
      expect(isValidObject({})).toBe(true);
      expect(isValidObject({ key: 'value' })).toBe(true);
      expect(isValidObject(null)).toBe(false);
      expect(isValidObject([])).toBe(false);
      expect(isValidObject('object')).toBe(false);
      expect(isValidObject(123)).toBe(false);
    });
  });

  describe('Event Utilities', () => {
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const throttle = (func, limit) => {
      let inThrottle;
      return function executedFunction(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    test('should debounce function calls', (done) => {
      let callCount = 0;
      const debouncedFunction = debounce(() => {
        callCount++;
      }, 100);

      debouncedFunction();
      debouncedFunction();
      debouncedFunction();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });

    test('should throttle function calls', (done) => {
      let callCount = 0;
      const throttledFunction = throttle(() => {
        callCount++;
      }, 100);

      throttledFunction();
      throttledFunction();
      throttledFunction();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 50);
    });
  });

  describe('Storage Utilities', () => {
    const setLocalStorage = (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error setting localStorage:', error);
        return false;
      }
    };

    const getLocalStorage = (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error getting localStorage:', error);
        return defaultValue;
      }
    };

    const removeLocalStorage = (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing localStorage:', error);
        return false;
      }
    };

    beforeEach(() => {
      localStorage.clear();
    });

    test('should set and get localStorage data', () => {
      const testData = { routine: 'wake-up', completed: true };
      
      expect(setLocalStorage('test-key', testData)).toBe(true);
      expect(getLocalStorage('test-key')).toEqual(testData);
    });

    test('should return default value for missing key', () => {
      expect(getLocalStorage('missing-key', 'default')).toBe('default');
      expect(getLocalStorage('missing-key')).toBe(null);
    });

    test('should remove localStorage data', () => {
      setLocalStorage('test-key', 'test-value');
      expect(getLocalStorage('test-key')).toBe('test-value');
      
      expect(removeLocalStorage('test-key')).toBe(true);
      expect(getLocalStorage('test-key')).toBe(null);
    });

    test('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage quota exceeded');
      });

      expect(setLocalStorage('test-key', 'test-value')).toBe(false);

      // Restore original method
      localStorage.setItem = originalSetItem;
    });
  });

  describe('Error Handling Utilities', () => {
    const safeExecute = (func, defaultValue = null) => {
      try {
        return func();
      } catch (error) {
        console.error('Safe execution error:', error);
        return defaultValue;
      }
    };

    const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await operation();
        } catch (error) {
          if (i === maxRetries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    test('should execute function safely', () => {
      const result = safeExecute(() => {
        return 'success';
      });
      expect(result).toBe('success');
    });

    test('should return default value on error', () => {
      const result = safeExecute(() => {
        throw new Error('Test error');
      }, 'default');
      expect(result).toBe('default');
    });

    test('should retry operation on failure', async () => {
      let attemptCount = 0;
      const operation = async () => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('Temporary failure');
        }
        return 'success';
      };

      const result = await retryOperation(operation, 3, 10);
      expect(result).toBe('success');
      expect(attemptCount).toBe(3);
    });

    test('should throw error after max retries', async () => {
      const operation = async () => {
        throw new Error('Persistent failure');
      };

      await expect(retryOperation(operation, 2, 10)).rejects.toThrow('Persistent failure');
    });
  });
});
