/// <reference types="cypress" />

// eslint-disable-next-line n/handle-callback-err
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Sign In page', () => {
  it('should log in and display username in the header', () => {
    // Intercept the login request
    cy.intercept('POST', '**/users/login').as('loginRequest');

    // Visit homepage
    cy.visit('https://react-redux.realworld.io');

    // Click "Sign in"
    cy.contains('Sign in').click();

    // Fill in email and password
    cy.get('input[type="email"]').type('qa.tester@mate.academy');
    cy.get('input[type="password"]').type('Qwerty123!');

    // Submit login
    cy.get('button[type="submit"]').contains('Sign in').click();

    // Wait for login request to finish
    cy.wait('@loginRequest');

    // Assert that username appears in the header (navbar)
    cy.get('nav')
      .contains('QaTester')
      .should('be.visible');
  });
});
