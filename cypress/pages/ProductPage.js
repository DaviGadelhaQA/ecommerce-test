class ProductPage
{
    selectProduct(productName){
         cy.get('app-card').filter(`:contains("${productName}")`).then(($element) => {
            cy.wrap($element).should('have.length', 1);
            cy.wrap($element).contains('button', 'Add').click();
        });
    }

    goToCart(){
        cy.contains('a', 'Checkout').click();
    }
}

export default new ProductPage();