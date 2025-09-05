// Configuration globale pour les tests Jest
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock du DOM pour les tests
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});