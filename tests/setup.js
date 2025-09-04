// Test setup file for Jest
import '@testing-library/jest-dom';

// Mock DOM methods that might not be available in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock performance.now for timer tests
global.performance = global.performance || {};
global.performance.now = jest.fn(() => Date.now());

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup global test utilities
global.testUtils = {
  // Helper to create mock DOM elements
  createMockElement: (tagName, attributes = {}) => {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach(key => {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  },

  // Helper to simulate timer
  mockTimer: () => {
    let callbacks = [];
    let currentTime = 0;
    
    const mockSetInterval = (callback, interval) => {
      const id = callbacks.length;
      callbacks.push({ callback, interval, lastCall: currentTime });
      return id;
    };
    
    const mockClearInterval = (id) => {
      callbacks = callbacks.filter((_, index) => index !== id);
    };
    
    const advanceTime = (ms) => {
      currentTime += ms;
      callbacks.forEach(({ callback, interval, lastCall }) => {
        if (currentTime - lastCall >= interval) {
          callback();
          lastCall = currentTime;
        }
      });
    };
    
    return {
      setInterval: mockSetInterval,
      clearInterval: mockClearInterval,
      advanceTime,
      getCurrentTime: () => currentTime
    };
  }
};
