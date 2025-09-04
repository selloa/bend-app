# Bend App Testing Documentation

This document provides comprehensive information about the testing suite for the Bend stretching and flexibility app.

## Testing Overview

The Bend app includes a complete testing suite covering:
- **Unit Tests**: Individual function testing
- **Integration Tests**: Component interaction testing
- **End-to-End Tests**: Full user flow testing
- **Accessibility Tests**: WCAG 2.1 AA compliance
- **Performance Tests**: Load time and efficiency testing
- **Cross-Browser Tests**: Compatibility testing

## Test Structure

```
tests/
├── unit/                    # Unit tests for individual functions
│   ├── timer.test.js       # Timer functionality tests
│   ├── navigation.test.js  # Navigation logic tests
│   ├── data.test.js        # Data structure validation tests
│   └── utils.test.js       # Utility function tests
├── integration/            # Integration tests
│   ├── user-flows.test.js  # Complete user journey tests
│   ├── state-management.test.js # State consistency tests
│   └── cross-component.test.js  # Component interaction tests
├── e2e/                    # End-to-end tests
│   ├── routine-completion.spec.js # Routine completion flows
│   ├── navigation.spec.js  # Navigation testing
│   └── accessibility.spec.js # Accessibility E2E tests
├── accessibility/          # Accessibility tests
│   └── axe-tests.test.js   # WCAG compliance tests
├── performance/            # Performance tests
│   └── lighthouse-tests.test.js # Performance benchmarks
└── fixtures/               # Test data and mocks
    └── test-data.js        # Test fixtures and mock data
```

## Running Tests

### Prerequisites

```bash
npm install
```

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Integration Tests

```bash
# Run integration tests
npm test -- --testPathPattern=integration
```

### End-to-End Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific browser tests
npx playwright test --project=chromium
```

### Accessibility Tests

```bash
# Run accessibility tests
npm run test:accessibility
```

### Performance Tests

```bash
# Run performance tests
npm run test:performance
```

### All Tests

```bash
# Run complete test suite
npm run test:all
```

## Test Coverage

The testing suite aims for:
- **90%+ code coverage** for unit tests
- **100% user flow coverage** for integration tests
- **WCAG 2.1 AA compliance** for accessibility
- **< 3s load time** for performance

## Test Categories

### Unit Tests

Tests individual JavaScript functions in isolation:

- **Timer Functions**: `startTimer()`, `pauseTimer()`, `toggleTimer()`, `skipExercise()`
- **Navigation Functions**: `selectRoutine()`, `nextExercise()`, `previousExercise()`
- **Data Validation**: Routine and exercise data structure validation
- **Utility Functions**: DOM manipulation, time formatting, validation helpers

### Integration Tests

Tests component interactions and state management:

- **User Flow Testing**: Complete routine from selection to completion
- **State Management**: State consistency across component transitions
- **Cross-Component**: Timer, navigation, and display synchronization

### End-to-End Tests

Tests complete user journeys in real browser environments:

- **Routine Completion**: Full routine execution with all user interactions
- **Navigation**: Exercise navigation, back/forward functionality
- **Accessibility**: Keyboard navigation, screen reader compatibility
- **Cross-Browser**: Chrome, Firefox, Safari, Edge compatibility

### Accessibility Tests

Ensures WCAG 2.1 AA compliance:

- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Touch Targets**: Minimum 44px touch target size
- **Text Scaling**: Functional at 200% zoom

### Performance Tests

Validates performance benchmarks:

- **Load Time**: < 3 seconds initial load
- **Timer Accuracy**: < 100ms timer precision
- **Memory Usage**: < 50MB initial, < 10MB growth per hour
- **Bundle Size**: < 100KB total bundle size

## Test Data

### Test Fixtures

Located in `tests/fixtures/test-data.js`:

- **Test Routines**: Simplified routines for fast test execution
- **Mock DOM**: Complete DOM structure for testing
- **User Interactions**: Simulated user actions
- **Accessibility Cases**: Test cases for accessibility validation
- **Performance Data**: Performance thresholds and test data

### Mock Data Strategy

- Minimal test routines for fast execution
- Consistent test data across all test suites
- Data factories for dynamic test generation
- Separation of test data from production data

## CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline includes:

1. **Unit Tests**: Jest tests with coverage reporting
2. **Integration Tests**: Component interaction testing
3. **E2E Tests**: Playwright cross-browser testing
4. **Accessibility Tests**: axe-core compliance testing
5. **Performance Tests**: Lighthouse performance validation
6. **Cross-Browser Tests**: Multi-browser compatibility
7. **Lint & Format**: Code quality checks
8. **Security Tests**: Vulnerability scanning
9. **Build Tests**: Deployment readiness validation

### Quality Gates

Tests must pass all quality gates:

- [ ] 90%+ unit test coverage
- [ ] All integration tests passing
- [ ] E2E tests passing on all browsers
- [ ] WCAG 2.1 AA compliance
- [ ] Performance benchmarks met
- [ ] No security vulnerabilities
- [ ] Code quality standards met

## Browser Support

### Desktop Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Mobile Browsers
- iOS Safari (latest 2 versions)
- Chrome Mobile (latest 2 versions)
- Samsung Internet
- Firefox Mobile

## Accessibility Standards

### WCAG 2.1 AA Compliance

- **Perceivable**: Information and UI components must be presentable in ways users can perceive
- **Operable**: UI components and navigation must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough for interpretation by assistive technologies

### Elderly-Friendly Features

- **Large Text**: Minimum 1.2rem font size
- **High Contrast**: Enhanced color contrast for better visibility
- **Simple Navigation**: Clear, intuitive navigation patterns
- **Touch-Friendly**: Large touch targets (44px minimum)
- **Clear Feedback**: Visual and audio feedback for interactions

## Performance Benchmarks

### Core Web Vitals

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

### Resource Limits

- **Initial Bundle**: < 100KB
- **Images**: < 50KB per image
- **Fonts**: < 20KB total
- **Memory Usage**: < 50MB initial

## Troubleshooting

### Common Issues

1. **Timer Tests Failing**: Check system clock and timer mocking
2. **E2E Tests Timing Out**: Increase timeout values for slow operations
3. **Accessibility Tests Failing**: Verify ARIA labels and semantic HTML
4. **Performance Tests Failing**: Check network conditions and resource loading

### Debug Commands

```bash
# Debug unit tests
npm test -- --verbose

# Debug E2E tests
npx playwright test --debug

# Debug accessibility tests
npm run test:accessibility -- --verbose

# Debug performance tests
npm run test:performance -- --verbose
```

## Contributing

### Adding New Tests

1. **Unit Tests**: Add to appropriate test file in `tests/unit/`
2. **Integration Tests**: Add to `tests/integration/`
3. **E2E Tests**: Add to `tests/e2e/`
4. **Accessibility Tests**: Add to `tests/accessibility/`
5. **Performance Tests**: Add to `tests/performance/`

### Test Naming Conventions

- **Unit Tests**: `describe('FunctionName', () => { test('should do something', () => {}) })`
- **Integration Tests**: `describe('Feature Integration', () => { test('should handle complete flow', () => {}) })`
- **E2E Tests**: `test('should complete user journey', async ({ page }) => {})`
- **Accessibility Tests**: `test('should meet accessibility standards', async () => {})`

### Test Data Management

- Use test fixtures for consistent data
- Mock external dependencies
- Keep test data minimal and focused
- Update fixtures when adding new features

## Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Accessibility Resources](https://webaim.org/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

### Performance Resources
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance](https://developers.google.com/web/tools/lighthouse)
- [Performance Budgets](https://web.dev/performance-budgets-101/)
