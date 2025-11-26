import loginPage from "../pages/loginPage";
import ProductPage from "../pages/ProductPage";

describe('End to End ecommerce test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('example').then(function(data) { this.data = data });
    })
    it('Submit Order', function (){
        const productName = this.data.productName;
        loginPage.login(this.data.username, Cypress.env('password'));
        
        cy.contains('Shop Name').should('be.visible');
        cy.get('app-card').should('have.length', 4);

        ProductPage.selectProduct(productName);

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