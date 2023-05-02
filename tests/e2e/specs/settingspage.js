describe('Settings page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/#/settings')
        cy.server();
        cy.route({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/authenticate',
            response: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', // some random characters
            },
            status: 200
        })
    })
    /*it('User can edit their own settings', () => {
        cy.get("#info-button").click()
        cy.get("#first-name-input").clear()
        cy.get("#first-name-input").type("Jens")
        cy.get("#last-name-input").clear()
        cy.get("#last-name-input").type("Lund")
        cy.get("#phone-number-input").clear()
        cy.get("#phone-number-input").type("41342341")
        cy.get("#household-input").clear()
        cy.get("#household-input").type("1")
        cy.get("#info-button").click()
        cy.get("#first-name-display").should('have.text',"Jens")
        cy.get("#last-name-display").should('have.text',"Lund")
        cy.get("#phone-number-display").should('have.text',"41342341")
        cy.get("#household-display").should('have.text',"1")
    })*/
    it('Invalid input is not allowed', () => {
        cy.get("#info-button").click()
        cy.get("#first-name-input").clear()
        cy.get("#last-name-input").clear()
        cy.get("#last-name-input").type("Lunde")
        cy.get("#phone-number-input").clear()
        cy.get("#phone-number-input").type("41342341")
        cy.get("#household-input").clear()
        cy.get("#household-input").type("1")
        cy.get("#info-button").click()
        cy.get("#info-button").should('have.text', "Save your new information")
    })

})
