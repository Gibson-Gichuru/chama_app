describe("User should be able to login in", ()=>{

    // visit the website

    it("should test user login flow", ()=>{
        cy.visit("http://localhost:3000")


        // test that input errors out on Blur
        formFieldsShouldErrorOutOnUserBlur()

        // test  that input error out on invalid user input

        formFieldsShouldErrorOutOnInvalidUserInput()
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