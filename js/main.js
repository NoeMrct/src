document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const validator = new FormValidator();
    
    // Smooth scrolling
    window.scrollToContact = function() {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    };
    
    // Navigation smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            service: form.service.value,
            message: form.message.value
        };
        
        // Validate form
        const isValid = validator.validateForm(formData);
        
        if (!isValid) {
            displayErrors(validator.getErrors());
            return;
        }
        
        // Simulate form submission
        submitForm(formData);
    });
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
        
        const inputElements = document.querySelectorAll('.error');
        inputElements.forEach(el => el.classList.remove('error'));
    }
    
    function displayErrors(errors) {
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(field + '-error');
            const inputElement = document.getElementById(field);
            
            if (errorElement) {
                errorElement.textContent = errors[field];
            }
            if (inputElement) {
                inputElement.classList.add('error');
            }
        });
    }
    
    function submitForm(formData) {
        const submitButton = form.querySelector('.submit-button');
        const successMessage = document.getElementById('form-success');
        
        // Disable button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            console.log('Form submitted:', formData);
        }, 1000);
    }
});