/// <reference types="cypress" />

describe('Sign In page', () => {
  it('should log in and display username in the header', () => {
    // Intercept the login API
    cy.intercept('POST', '**/users/login').as('loginRequest');

    // Visit homepage
    cy.visit('https://react-redux.realworld.io');

    // Click "Sign in" link specifically
    cy.contains('a', 'Sign in').click();

    // Fill credentials from Cypress.env
    cy.get('input[type="email"]').type(Cypress.env('USER_EMAIL'));
    cy.get('input[type="password"]').type(Cypress.env('USER_PASSWORD'));

    // Submit login
    cy.get('button[type="submit"]').contains('Sign in').click();

    // Assert login request response
    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 200);

    // Assert username in navbar
    const expectedName = Cypress.env('USER_NAME');
    cy.get('nav').contains(expectedName).should('be.visible');
  });
});
