import {rest} from "msw";
import {setupServer} from "msw/node";
import store from "../../redux/store";

import LoginForm from "../../components/LoginForm";

import {Provider} from "react-redux";

import {render, screen, fireEvent, waitFor} from "@testing-library/react";

import "@testing-library/jest-dom";




const server = setupServer(

    rest.get("api/auth/login", (req, res, ctx)=>{

        return res(
            ctx.json({
                tokens:{
                    refresh:"some refresh token",
                    acces:"some access token"
                }
            })
            )
        })
        )
        
        beforeAll(
    ()=>server.listen()
)

afterAll(
    ()=>server.close()
)

beforeEach(

    
    ()=>{

        render(
            <Provider store={store}>
                <LoginForm changeIndex={jest.fn()}/>
            </Provider>
        )
    }
)

afterEach(
    ()=>{

        server.resetHandlers()
    }
)


// TESTS

describe("<LoginForm> component testing", ()=>{

    it("The Form Fields should error out on Error 401", async ()=>{


        const error = "Invalid username or password";

        server.use(

            rest.get("api/auth/login", (req, res, ctx)=>{

                return res.once(
                    ctx.status(403),
                    ctx.json({error:error})
                )
            })
        )

        const email = "testing@test.com";
        const password = "Passw@1234";
        // get DOM ELEMENTS
        const emailInput = screen.getByRole(
            "textbox",
            {
                name:"Email Address"
            }
        )

        const passwordInput = screen.getByTestId("passwordTestInput")

        const loginButton = screen.getByRole(
            "button",
            {
                name:"Login"
            }
        )

        // FIRE EVENTS

        fireEvent.change(
            emailInput,
            {
                target:{
                    value:email
                }
            }
        )

        fireEvent.change(
            passwordInput,
            {
                target:{
                    value:password
                }
            }
        )
        
        fireEvent.click(loginButton)

        const errorContainer = await screen.findAllByText(error)

        await waitFor(
            ()=>{

                expect(errorContainer.length).toEqual(2)
            }
        )

    })
})