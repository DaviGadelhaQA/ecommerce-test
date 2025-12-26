class ConfirmationPage {
    submitFormDetails(){
        cy.get('#country').type('India');
        cy.get(".suggestions ul li a", {timeout: 5000}).should('be.visible').click();
        cy.get('.btn-success').click();
        return this;
    }

    getAlertMessage(){
        return cy.get('.alert-success')
    }
}

export default ConfirmationPage;