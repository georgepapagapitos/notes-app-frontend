describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app, A Human Company 2021');
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('user can log in', function () {
    cy.contains('log in').click();
    cy.get('#username').type('gpapagapitos');
    cy.get('#password').type('password');
    cy.get('#login-button').click();
    cy.contains('George Papagapitos logged in');
  });
});