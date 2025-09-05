const FormValidator = require('../../src/js/form-validator');

describe('FormValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new FormValidator();
  });

  describe('validateName', () => {
    test('should return error for empty name', () => {
      const result = validator.validateName('');
      expect(result).toBe('Le nom doit contenir au moins 2 caractères');
    });

    test('should return error for name too short', () => {
      const result = validator.validateName('A');
      expect(result).toBe('Le nom doit contenir au moins 2 caractères');
    });

    test('should return error for name too long', () => {
      const longName = 'A'.repeat(51);
      const result = validator.validateName(longName);
      expect(result).toBe('Le nom ne doit pas dépasser 50 caractères');
    });

    test('should return null for valid name', () => {
      const result = validator.validateName('Jean Dupont');
      expect(result).toBeNull();
    });

    test('should handle name with only spaces', () => {
      const result = validator.validateName('   ');
      expect(result).toBe('Le nom doit contenir au moins 2 caractères');
    });
  });

  describe('validateEmail', () => {
    test('should return error for empty email', () => {
      const result = validator.validateEmail('');
      expect(result).toBe('L\'email est requis');
    });

    test('should return error for invalid email format', () => {
      const result = validator.validateEmail('invalid-email');
      expect(result).toBe('Format d\'email invalide');
    });

    test('should return error for email without domain', () => {
      const result = validator.validateEmail('test@');
      expect(result).toBe('Format d\'email invalide');
    });

    test('should return null for valid email', () => {
      const result = validator.validateEmail('test@example.com');
      expect(result).toBeNull();
    });
  });

  describe('validatePhone', () => {
    test('should return null for empty phone', () => {
      const result = validator.validatePhone('');
      expect(result).toBeNull();
    });

    test('should return error for invalid phone format', () => {
      const result = validator.validatePhone('123');
      expect(result).toBe('Format de téléphone invalide');
    });

    test('should return null for valid phone', () => {
      const result = validator.validatePhone('0123456789');
      expect(result).toBeNull();
    });

    test('should accept phone with formatting', () => {
      const result = validator.validatePhone('+33 1 23 45 67 89');
      expect(result).toBeNull();
    });
  });

  describe('validateMessage', () => {
    test('should return error for empty message', () => {
      const result = validator.validateMessage('');
      expect(result).toBe('Le message doit contenir au moins 10 caractères');
    });

    test('should return error for message too short', () => {
      const result = validator.validateMessage('Court');
      expect(result).toBe('Le message doit contenir au moins 10 caractères');
    });

    test('should return error for message too long', () => {
      const longMessage = 'A'.repeat(1001);
      const result = validator.validateMessage(longMessage);
      expect(result).toBe('Le message ne doit pas dépasser 1000 caractères');
    });

    test('should return null for valid message', () => {
      const result = validator.validateMessage('Ceci est un message valide avec plus de 10 caractères');
      expect(result).toBeNull();
    });
  });

  describe('validateForm', () => {
    test('should return false for invalid form data', () => {
      const formData = {
        name: '',
        email: 'invalid',
        phone: '123',
        message: 'Court'
      };
      
      const result = validator.validateForm(formData);
      expect(result).toBe(false);
      
      const errors = validator.getErrors();
      expect(errors.name).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.phone).toBeDefined();
      expect(errors.message).toBeDefined();
    });

    test('should return true for valid form data', () => {
      const formData = {
        name: 'Jean Dupont',
        email: 'jean@example.com',
        phone: '0123456789',
        message: 'Ceci est un message valide avec suffisamment de caractères'
      };
      
      const result = validator.validateForm(formData);
      expect(result).toBe(true);
      
      const errors = validator.getErrors();
      expect(Object.keys(errors)).toHaveLength(0);
    });
  });
});