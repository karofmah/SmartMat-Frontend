describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/#/fridge')
    })
    it('allows user to generate recipe, write in item search and hover over categories', () => {
        cy.get("#generateButton").click()
        cy.get("#recipe").should('have.value', 'This is a test recipe')
        cy.get("#search").type('Ham')
        cy.get("#category-component").click()
    })
})