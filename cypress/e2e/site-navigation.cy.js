describe('Site Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the homepage correctly', () => {
    cy.contains('Solutions Web Innovantes');
    cy.contains('MonEntreprise');
    cy.get('.hero').should('be.visible');
    cy.get('.services').should('be.visible');
    cy.get('.contact').should('be.visible');
  });

  it('should navigate smoothly between sections', () => {
    cy.get('nav a[href="#services"]').click();
    cy.get('#services').should('be.visible');
    
    cy.get('nav a[href="#contact"]').click();
    cy.get('#contact').should('be.visible');
  });

  it('should scroll to contact when CTA button is clicked', () => {
    cy.get('.cta-button').click();
    cy.get('#contact').should('be.visible');
  });
});

describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#contact').scrollIntoView();
  });

  it('should display validation errors for empty form', () => {
    cy.get('#contactForm').submit();
    
    cy.get('#name-error').should('contain', 'au moins 2 caractères');
    cy.get('#email-error').should('contain', 'requis');
    cy.get('#message-error').should('contain', 'au moins 10 caractères');
  });

  it('should display validation error for invalid email', () => {
    cy.get('#name').type('Jean Dupont');
    cy.get('#email').type('email-invalide');
    cy.get('#message').type('Message de test avec suffisamment de caractères');
    
    cy.get('#contactForm').submit();
    
    cy.get('#email-error').should('contain', 'Format d\'email invalide');
  });

  it('should submit form successfully with valid data', () => {
    cy.get('#name').type('Jean Dupont');
    cy.get('#email').type('jean@example.com');
    cy.get('#phone').type('0123456789');
    cy.get('#service').select('web');
    cy.get('#message').type('Je souhaiterais obtenir plus d\'informations sur vos services de développement web');
    
    cy.get('#contactForm').submit();
    
    cy.get('#form-success').should('be.visible');
    cy.get('#form-success').should('contain', 'message a été envoyé avec succès');
    
    // Verify form is reset
    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
  });

  it('should handle phone validation correctly', () => {
    cy.get('#name').type('Jean Dupont');
    cy.get('#email').type('jean@example.com');
    cy.get('#phone').type('123'); // Invalid phone
    cy.get('#message').type('Message de test avec suffisamment de caractères');
    
    cy.get('#contactForm').submit();
    
    cy.get('#phone-error').should('contain', 'Format de téléphone invalide');
  });

  it('should work without phone number', () => {
    cy.get('#name').type('Marie Martin');
    cy.get('#email').type('marie@example.com');
    // Skip phone field
    cy.get('#service').select('seo');
    cy.get('#message').type('Bonjour, je souhaite améliorer le référencement de mon site web');
    
    cy.get('#contactForm').submit();
    
    cy.get('#form-success').should('be.visible');
  });
});