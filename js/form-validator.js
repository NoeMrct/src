class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateEntreprise(text) {
        if (!text || text.trim().length < 2) {
            return 'L entreprise doit contenir au moins 2 caractères';
        }
        if (text.trim().length > 50) {
            return 'Le nom ne doit pas dépasser 50 caractères';
        }
        return null;
    }

    validateName(name) {
        if (!name || name.trim().length < 2) {
            return 'Le nom doit contenir au moins 2 caractères';
        }
        if (name.trim().length > 50) {
            return 'Le nom ne doit pas dépasser 50 caractères';
        }
        return null;
    }

    validateEmail(email) {
        if (!email || email.trim() === '') {
            return 'L\'email est requis';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Format d\'email invalide';
        }
        
        return null;
    }

    validatePhone(phone) {
        if (phone && phone.trim() !== '') {
            // eslint-disable-next-line no-useless-escape
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                return 'Format de téléphone invalide';
            }
        }
        return null;
    }

    validateMessage(message) {
        if (!message || message.trim().length < 10) {
            return 'Le message doit contenir au moins 10 caractères';
        }
        if (message.trim().length > 1000) {
            return 'Le message ne doit pas dépasser 1000 caractères';
        }
        return null;
    }

    validateForm(formData) {
        this.errors = {};
        
        const nameError = this.validateName(formData.name);
        if (nameError) this.errors.name = nameError;
        
        const emailError = this.validateEmail(formData.email);
        if (emailError) this.errors.email = emailError;
        
        const phoneError = this.validatePhone(formData.phone);
        if (phoneError) this.errors.phone = phoneError;
        
        const messageError = this.validateMessage(formData.message);
        if (messageError) this.errors.message = messageError;
        
        return Object.keys(this.errors).length === 0;
    }

    getErrors() {
        return this.errors;
    }
}

// Export pour les tests
// eslint-disable-next-line no-undef
if (typeof module !== 'undefined' && module.exports) {
    // eslint-disable-next-line no-undef
    module.exports = FormValidator;
}