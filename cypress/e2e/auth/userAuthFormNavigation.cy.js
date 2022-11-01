// login , signup, forgot password switching test

describe("Tests user switching available Auth forms", ()=>{

    // visit the website

    it("should test auth form switching flow", ()=>{

        cy.visit("http://localhost:3000")


        // assert that  the login form is displayed by default

        cy.get('[data-testid=testLoginForm]')
        .should('exist')

        // find register button and click it

        cy.get('[data-testid=testRegisterButton]')
        .click()

        // assert that the login form is not displayed

        cy.get('[data-testid=testLoginForm]')
        .should('not.exist')

        // assert that the form in diplay is the register button

        cy.get('[data-testid=testRegisterForm]')
        .should('exist')

        cy.get('[data-testid=testBackToLoginForm]')
        .click()

        // make sure that 

        cy.get('[data-testid=testLoginForm]')
        .should('exist')

        // get the forgot password from the DOM and click it

        cy.get('[data-testid=testForgotPassword]')
        .click()

        // assert that  the forgot passwoed does is now on Display


        cy.get('[data-testid=testForgotPasswordForm]')
        .should('exist')

    })

})



