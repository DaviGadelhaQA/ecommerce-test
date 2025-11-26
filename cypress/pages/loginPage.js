class LoginPage
{
    login(username, password){
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('input[type="submit"]').click();
    }
}

export default new LoginPage();