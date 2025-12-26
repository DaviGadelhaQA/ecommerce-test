import ConfirmationPage from "./ConfirmationPage";

class CartPage {
    checkoutItems() {
        cy.contains('button', 'Checkout').click();
        return new ConfirmationPage();
    }
    sumOfProducts() {
        let sum = 0;
        return cy.get('tr td:nth-child(4) strong').each(($el) => {
            const amount = Number($el.text().split(' ')[1].trim())
            sum = sum + amount;
        }).then(() => {
            return sum
        });
    }
}

export default new CartPage();