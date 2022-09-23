describe("User should be able to login in", ()=>{

    // visit the website

    it("should test user login flow", ()=>{
        cy.visit("http://localhost:3000")


        // test that input errors out on Blur


        cy.get('[data-testid=testUserEmailField]')
        .blur()

        cy.contains("Required!")

    })    

})
