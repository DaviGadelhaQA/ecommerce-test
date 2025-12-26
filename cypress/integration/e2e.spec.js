import cartPage from "../pages/cartPage";
import loginPage from "../pages/loginPage";
import ProductPage from "../pages/ProductPage";

describe('End to End ecommerce test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('example').then(function (data) { this.data = data });
    })
    it('Submit Order', function () {
        const productName = this.data.productName;
        loginPage.login(this.data.username, Cypress.env('password'));

        cy.contains('Shop Name').should('be.visible');
        cy.get('app-card').should('have.length', 4);

        ProductPage.selectProduct(productName);
        ProductPage.goToCart();

        cartPage.sumOfProducts().then((sum) => {
            expect(sum).to.be.lessThan(200000); //wait the interaction
        });

        cartPage.checkoutItems()
            .submitFormDetails()
            .getAlertMessage()
            .should('contain', 'Success');
    });
});