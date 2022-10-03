import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom"

import {rest} from "msw";

import {setupServer} from "msw/node";

import Signup from "../../components/SignupForm";


// mock server object

const server = setupServer(
    
    rest.post("api/auth/register", (req, res, ctx)=>{

        return res(
            ctx.json({
                message:"User Account created!"
            })
        )

    })
)

beforeAll(
    ()=> server.listen()
)

beforeEach(
    ()=>{

        render(<Signup changeIndex={jest.fn()}/>)
    }
)

afterEach(
    ()=>server.resetHandlers()
)

afterAll(

    ()=>server.close()
)

describe("<SignupForm> component testing", ()=>{

    // test that the form errors out on invalid user input

    const email = "testing@testing.com";
    const userName = "testingUsername";
    const password = "Pass@1234"
    const usernameError = "Username Not Available"
    const emailError = "Email Aready Registered";


    it("Errors out if an aready username or email exists", async ()=>{

        server.use(

            rest.post("api/auth/register", (req, res, ctx)=>{

                return res.once(

                    ctx.status(403),
                    ctx.json({
                        errors:{
                            email:emailError,
                            username:usernameError,
                        }
                    })
                )
            })
        )


        // get the Dom elements 

        const elements = getDOMElements()

        // fire user events

        // Enter username
        fireEvent.change(
            elements.usernameInput,
            {
                target:{
                    value:userName
                }
            }
        )

        // enter user email
        fireEvent.change(
            elements.emailInput,
            {
                target:{
                    value:email
                }
            }
        )

        // enter user password
        fireEvent.change(
            elements.passwordInput,
            {
                target:{
                    value:password
                }
            }
        )
        
        // confirm user password


        fireEvent.change(
            elements.confirmPasswordInput,
            {
                target:{
                    value:password
                }
            }
        )

        // click the signup button

        fireEvent.click(elements.signUpBtn)
        
        // get username errorContiner

        const usernameErrorContainer = await screen.findByText(usernameError)

        const emailErrorContainer = await screen.findByText(emailError)

        await waitFor(
            ()=>{
                expect(usernameErrorContainer).toBeInTheDocument()
                expect(emailErrorContainer).toBeInTheDocument()
            }
        )


    })
})


function getDOMElements() {

    // username field

    const usernameInput = screen.getByRole(
        "textbox",
        {
            name:"Username"
        }
    )

    const emailInput = screen.getByRole(

        "textbox", 
        {
            name:"Email Address"
        }
    )

    const passwordInput = screen.getByPlaceholderText("Enter Your Password");
    const confirmPasswordInput = screen.getByPlaceholderText("confirm your password")

    const signUpBtn = screen.getByRole("button", {name:"Sign Up"})

    return {
        usernameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signUpBtn
    }
}