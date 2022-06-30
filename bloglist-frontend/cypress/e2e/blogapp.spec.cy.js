/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('not_right');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Wrong username or password!');
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#titleInput').type('A blog created by cypress');
      cy.get('#authorInput').type('Cypress');
      cy.get('#urlInput').type('cy.com');

      cy.get('#create-button').click();
      cy.contains('A blog created by cypress');
    });

    it('A user can like a blog', function () {
      cy.contains('create new blog').click();
      cy.get('#titleInput').type('A blog created by cypress');
      cy.get('#authorInput').type('Cypress');
      cy.get('#urlInput').type('cy.com');
      cy.get('#create-button').click();
      cy.get('#view-button').click();
      cy.get('#like-button').click();
      cy.contains('likes 1');
    });

    it('A user can remove their own blog', function () {
      cy.contains('create new blog').click();
      cy.get('#titleInput').type('A blog created by cypress');
      cy.get('#authorInput').type('Cypress');
      cy.get('#urlInput').type('cy.com');
      cy.get('#create-button').click();
      cy.get('#view-button').click();
      cy.get('#remove-button').click();
      cy.get('html').should('not.contain', 'A blog created by cypress');
    });
  });
});
