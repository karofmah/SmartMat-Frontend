// https://docs.cypress.io/api/table-of-contents

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/#/')
        cy.server();
        cy.route({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/authenticate',
            response: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', // some random characters
            },
            status: 200
        })
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/api/refrigerators/getRefrigeratorByUser?userEmail=example@mail.com',
            response: {
                data: 1,
            },
            status: 200
        })
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/api/users/login/getUser?email=example@mail.com',
            response: {
                data: 1,
            },
            status: 200
        })
        cy.route({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/register',
            response: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', // some random characters
            },
            status: 201
        })
    })
    it('Routes to user page on valid input on login', () => {
        cy.get("#email-input").type("example@mail.com");
        cy.get("#password-input").type("password");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/user')
        });
    })
    it('Routes to user page on valid input for register', () => {
        cy.get('#register-radiobutton').click();
        cy.get("#email-input").type("example@mail.com");
        cy.get("#password-input").type("password");
        cy.get("#firstname-input").type("John");
        cy.get("#lastname-input").type("Doe");
        cy.get("#phone-input").type("12345678");
        cy.get("#household-input").type("5");
        cy.get("#age-input").type("20");
        cy.get("#pin-code-input").type("1234");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/user')
        });
    })
    it('Does not route to user page on invalid input on login', () => {
        cy.get("#email-input").type("example");
        cy.get("#password-input").type("password");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#email-input").clear();
        cy.get("#password-input").clear();

        cy.get("#email-input").type("example@mail.com");
        cy.get("#password-input").type("p");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });
    })
    it('Does not route to user page on invalid input for register', () => {
        cy.get('#register-radiobutton').click();
        cy.get("#email-input").type("example@mail.com");
        cy.get("#password-input").type("password");
        cy.get("#lastname-input").type("Doe");
        cy.get("#phone-input").type("12345678");
        cy.get("#household-input").type("5");
        cy.get("#age-input").type("20");
        cy.get("#pin-code-input").type("1234");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#lastname-input").clear();
        cy.get("#firstname-input").type("John");
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });

        cy.get("#lastname-input").type("Doe");
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

        cy.get("#age-input").type("20");
        cy.get("#pin-code-input").clear();
        cy.get('#submit-button').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:8000/#/')
        });
    })
})
