import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../../pages/loginPage";
import ProductPage from "../../../pages/ProductPage";
import cartPage from "../../../pages/cartPage";

Given('I am on Ecommerce page', () => {
    cy.visit('/');
});

When('I login to the application', function() {
    loginPage.login(this.data.username, Cypress.env('password'));

    cy.contains('Shop Name').should('be.visible');
    cy.get('app-card').should('have.length', 4);
});

When('I add items to Cart and checkout', function() {
    ProductPage.selectProduct(this.data.productName);
    ProductPage.goToCart();
});

When('Validate the total price limit', function() {
    cartPage.sumOfProducts().then((sum) => {
        expect(sum).to.be.lessThan(200000); //wait the interaction
    });
});

Then('Select the country submit and verify Thankyou', function() {
    cartPage.checkoutItems()
        .submitFormDetails()
        .getAlertMessage()
        .should('contain', 'Success');
});