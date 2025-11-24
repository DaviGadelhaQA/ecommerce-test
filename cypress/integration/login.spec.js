describe('End to End ecommerce test', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Submit Order', () => {
        const productName = 'Nokia Edge'
        cy.get('#username').type(Cypress.env('username'));
        cy.get('#password').type(Cypress.env('password'));
        cy.get('input[type="submit"]').click();
        cy.contains('Shop Name').should('be.visible');
        cy.get('app-card').should('have.length', 4);

        cy.get('app-card').filter(`:contains("${productName}")`).then(($element) => {
            cy.wrap($element).should('have.length', 1);
            cy.wrap($element).contains('button', 'Add').click();
        });

        cy.contains('a', 'Checkout').click();
        let sum = 0;
        cy.get('tr td:nth-child(4) strong').each(($el) => {
            const amount = Number($el.text().split(' ')[1].trim())
            sum = sum + amount;
        }).then(() => {
            expect(sum).to.be.lessThan(200000); //wait the interaction
        });

        cy.contains('button', 'Checkout').click();
        cy.get('#country').type('India');
        cy.get(".suggestions ul li a", {timeout: 5000}).should('be.visible').click();
        cy.get('.btn-success').click();
        cy.get('.alert-success').should('contain', 'Success');
    });
});