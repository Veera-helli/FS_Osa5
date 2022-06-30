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
    cy.get('#init-login').click();
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#init-login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#init-login').click();
      cy.get('#username').type('not_right');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Wrong username or password!');
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#init-login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('.titleInput').type('A blog created by cypress');
      cy.get('.authorInput').type('Cypress');
      cy.get('.urlInput').type('cy.com');
      cy.get('.create-button').click();

      cy.contains('A blog created by cypress');
    });

    it('A user can like a blog', function () {
      cy.contains('create new blog').click();
      cy.get('.titleInput').type('A blog created by cypress');
      cy.get('.authorInput').type('Cypress');
      cy.get('.urlInput').type('cy.com');
      cy.get('.create-button').click();
      cy.get('.view-button').click();
      cy.get('.like-button').click();
      cy.contains('likes 1');
    });

    it('A user can remove their own blog', function () {
      cy.contains('create new blog').click();
      cy.get('.titleInput').type('A blog created by cypress');
      cy.get('.authorInput').type('Cypress');
      cy.get('.urlInput').type('cy.com');
      cy.get('.create-button').click();
      cy.get('.view-button').click();
      cy.get('.remove-button').click();
      cy.get('html').should('not.contain', 'A blog created by cypress');
    });

    it('Blogs are in order of likes', function () {
      cy.contains('create new blog').click();
      cy.get('.titleInput').type('Blog with least likes');
      cy.get('.authorInput').type('Cypress');
      cy.get('.urlInput').type('cy.com');
      cy.get('.create-button').click();

      cy.contains('create new blog').click();
      cy.get('.titleInput').type('Blog with most likes');
      cy.get('.authorInput').type('Cypress');
      cy.get('.urlInput').type('cy.com');
      cy.get('.create-button').click();
      cy.wait(500);
      cy.get('.view-button').eq(1).click();
      cy.get('.like-button').eq(1).click(); // 1 like
      cy.wait(500);
      cy.get('.blog').eq(0).should('contain', 'Blog with most likes');
      cy.get('.blog').eq(1).should('contain', 'Blog with least likes');
    });
  });
});
