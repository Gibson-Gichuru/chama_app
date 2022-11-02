describe("User should be able to login in", ()=>{

    // visit the website

    it("should test user login flow", ()=>{
        cy.visit("http://localhost:3000")


        // test that input errors out on Blur
        formFieldsShouldErrorOutOnUserBlur()

        // test  that input error out on invalid user input

        formFieldsShouldErrorOutOnInvalidUserInput()

        // show a alert

        formInteractsWithTheAlertComponet()
    })    

})

function formFieldsShouldErrorOutOnInvalidUserInput(){

    // get the email field and type  on it

    cy.get('#email').type("some cool staff")

    // get the password field and type on it

    cy.get('#password').type("some pass").blur()

    cy.contains("Invalid Email")
    cy.contains("password should contain atleast one number and one special character")

    // assert that the fields have errors
}

function formFieldsShouldErrorOutOnUserBlur(){
    cy.get('#email').focus().blur()
    cy.get('#password').focus().blur()

    cy.contains("required!")
}

function formInteractsWithTheAlertComponet(){

    const email = "testing@e2e.com"
    const password = "Test@1234"

    cy.get("#email").clear().type(email)

    cy.get("#password").clear().type(password)

    cy.get('button[type="submit"]').click()


    // assert that ther is a pop 

    cy.get('[data-testid=alertMessageContainer]').should("exist")
}
