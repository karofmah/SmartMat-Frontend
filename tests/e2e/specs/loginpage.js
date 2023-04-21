// https://docs.cypress.io/api/table-of-contents

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/#/')
    })
    it('Routes to user page on valid input on login', () => {
        cy.get("#email-input").type("hei@mail.com");
        cy.get("#password-input").type("passordhei");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/user')
        });
    })
    it('Routes to user page on valid input for register', () => {
        cy.get('#register-radiobutton').click();
        cy.get("#email-input").type("hei@mail.com");
        cy.get("#password-input").type("passordhei");
        cy.get("#firstname-input").type("Marte");
        cy.get("#lastname-input").type("Vågen");
        cy.get("#phone-input").type("12345678");
        cy.get("#household-input").type("5");
        cy.get("#age-input").type("20");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/user')
        });
    })
    it('Does not route to user page on invalid input on login', () => {
        cy.get("#email-input").type("hei");
        cy.get("#password-input").type("passordhei");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#email-input").clear();
        cy.get("#password-input").clear();

        cy.get("#email-input").type("hei@mail.com");
        cy.get("#password-input").type("p");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });
    })
    it('Does not route to user page on invalid input for register', () => {
        cy.get('#register-radiobutton').click();
        cy.get("#email-input").type("hei@mail.com");
        cy.get("#password-input").type("passordhei");
        cy.get("#lastname-input").type("Vågen");
        cy.get("#phone-input").type("12345678");
        cy.get("#household-input").type("5");
        cy.get("#age-input").type("20");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#lastname-input").clear();
        cy.get("#firstname-input").type("Marte");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#lastname-input").type("Vågen");
        cy.get("#phone-input").clear();
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#phone-input").type("12345678");
        cy.get("#household-input").clear();
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#household-input").type("5");
        cy.get("#age-input").clear();
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });
    })
})
