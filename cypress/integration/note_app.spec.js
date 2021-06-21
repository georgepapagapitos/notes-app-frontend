describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'George Papagapitos',
      username: 'gpapagapitos',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('gpapagapitos');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error').should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'George Papagapitos logged in');
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'gpapagapitos', password: 'password' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note from cypress',
          important: false
        });
      });

      it('it can be made important', function () {
        cy.contains('another note from cypress')
          .contains('make important')
          .click();

        cy.contains('another note from cypress')
          .contains('make not important');
      });
    });
  });
});