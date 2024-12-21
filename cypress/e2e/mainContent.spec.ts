describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login'); // Adjust the URL to match your application's login route
  });

  it('should render the login form', () => {
    cy.get('[data-cy="username-input"]').should('be.visible');
    cy.get('[data-cy="password-input"]').should('be.visible');
    cy.get('button').contains('Sign in').should('be.visible');
  });

  it('should show an error for empty fields', () => {
    cy.get('button').contains('Sign in').click();
    cy.get('.text-danger').should('contain', 'Invalid credentials, please try again.'); // Adjust error message as per app
  });

  it('should show an error for invalid credentials', () => {
    cy.get('[data-cy="username-input"]').type('wronguser');
    cy.get('[data-cy="password-input"]').type('wrongpassword');
    cy.get('button').contains('Sign in').click();
    cy.get('.text-danger').should('contain', 'Invalid credentials, please try again.');
  });

  it('should navigate to characters page on successful login', () => {
    // Mock login logic: Update the username/password below to match your valid credentials.
    cy.get('[data-cy="username-input"]').type('user');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('button').contains('Sign in').click();

    // Assert navigation
    cy.url().should('include', '/star-wars-characters');
  });

  it('should allow typing in the username and password fields', () => {
    cy.get('[data-cy="username-input"]').type('user').should('have.value', 'user');
    cy.get('[data-cy="password-input"]').type('password').should('have.value', 'password');
  });
});
