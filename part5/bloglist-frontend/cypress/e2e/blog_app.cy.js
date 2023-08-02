describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Peter Ang',
      username: 'peterang',
      password: 'iampeterang'
    })
    cy.visit('http://localhost:3000')
})
  it('login form is shown', function() {
    cy.contains('log in to application')
  })
  describe('Login', function() {  
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('peterang', {force: true})
      cy.get('#password')
        .type('iampeterang', {force: true})
      cy.get('#login-button')
        .click({force: true})

      cy.contains('Peter Ang logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('peterang', {force: true})
      cy.get('#password')
        .type('wrong', {force: true})
      cy.get('#login-button')
        .click({force: true})

      cy.contains('Wrong credentials')
    })
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
      .type('peterang', {force: true})
      cy.get('#password')
      .type('iampeterang', {force: true})
      cy.get('#login-button')
      .click({force: true})
    })

    it('a new blog can be created', function() {
      cy.get('#new-blog').click({force: true})
      cy.get('#title').type('I am Number Four', {force: true})
      cy.get('#author').type('Geronimo Stilton', {force: true})
      cy.get('#url').type('numberfour.com', {force: true})
      cy.get('#create').click({force: true})

      cy.contains('I am Number Four Geronimo Stilton')
    })

    describe('after new blog is created', function() {
      beforeEach(function() {
        cy.get('#new-blog').click({force: true})
        cy.get('#title').type('I am Number Four', {force: true})
        cy.get('#author').type('Geronimo Stilton', {force: true})
        cy.get('#url').type('numberfour.com', {force: true})
        cy.get('#create').click({force: true})

        cy.contains('I am Number Four Geronimo Stilton')
      })

      it('can like a blog', function() {
        cy.get('.view').click({force: true})
        cy.get('.like').click({force: true})
        cy.contains('likes 1')
      })

      it('can delete a blog', function() {
        cy.get('.view').click({force: true})
        cy.get('.delete').click({force: true})
        cy.get('html').should('not.contain', 'I am Number Four Geronimo Stilton')
      })

      it('only creator of blog can see the delete button', function() {
        cy.request('POST', 'http://localhost:3003/api/users', {
          name: 'Emerson Ang',
          username: 'emersonang',
          password: 'iamemersonang'
        })
        cy.get('#logout').click({force: true})
        cy.get('#username')
        .type('emersonang', {force: true})
        cy.get('#password')
        .type('iamemersonang', {force: true})
        cy.get('#login-button')
        .click({force: true})

        cy.get('.view').click({force: true})
        cy.get('html').should('not.contain', 'delete')
      })
      it.only('ordered based on descending number of likes', function() {
        cy.get('#title').type('I am Number Three', {force: true})
        cy.get('#author').type('Thea Stilton', {force: true})
        cy.get('#url').type('numberthree.com', {force: true})
        cy.get('#create').click({force: true})

        cy.contains('I am Number Three Thea Stilton').find('.view').click({force: true})
        cy.contains('I am Number Three Thea Stilton').find('.like').click({force: true})
        cy.get('.blogs').eq(0).should('contain', 'I am Number Three Thea Stilton')
        cy.get('.blogs').eq(0).should('contain', 'I am Number Four Geronimo Stilton')
      })
    })
  })
})