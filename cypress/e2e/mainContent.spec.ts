describe('LoginForm Component', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visit the login page
  });

  it('should render the login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should allow typing in the username and password fields', () => {
    cy.get('input[type="text"]').type('user').should('have.value', 'user');
    cy.get('input[type="password"]').type('password').should('have.value', 'password');
  });

  it('should show an error message for invalid credentials', () => {
    cy.get('input[type="text"]').type('wronguser');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.get('.text-danger').should('contain.text', 'Invalid credentials, please try again.');
  });

  it('should redirect to the characters page on successful login', () => {
    cy.get('input[type="text"]').type('user'); // Mock the correct username
    cy.get('input[type="password"]').type('password'); // Mock the correct password
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/star-wars-characters'); // Ensure user is redirected to character page
  });
});

