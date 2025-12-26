beforeEach(() => {
    cy.visit('/');
    cy.fixture('example').then(function (data) { this.data = data });
})