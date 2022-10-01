import {rest} from "msw";

import {setupServer} from "msw/node";

import configureStore from 'redux-mock-store'

import {Provider} from "react-redux";

import {LOGIN_USER} from "../../redux/User/UserType";


import {render, screen, fireEvent, waitFor} from "@testing-library/react";

import "@testing-library/jest-dom";

import LoginForm from "../../components/LoginForm";

const mockStore = configureStore([]);

const store = mockStore({});

const server = setupServer(

    rest.get("api/auth/login", (req, res, ctx)=>{

        return res(
            ctx.status(200),
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

        // create a mocked store with an empty object as theinitial state

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

    const email = "testing@test.com";
    const password = "Passw@1234";

    it("Should login the user on a success form submit", async ()=>{



        // get  the form inputs 

        const elements = getDOMElements()
        // user enters their email
        fireEvent.change(
            elements.emailInput,
            {
                target:{
                    value:email
                }
            }
        )

        // user enters their password
        
        fireEvent.change(
            elements.passwordInput,
            {
                target:{
                    value:password
                }
            }
        )
    
        //  user clicks the login button

        fireEvent.click(elements.loginButton)


        // confirm that the addUSer action was called

        await waitFor(
            ()=>{
                const actions = store.getActions();

                const performedActions = actions.filter(action=> action.type === LOGIN_USER)
                expect(performedActions.length).toEqual(1)

            }
        )

    })


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

        
        // get DOM ELEMENTS
        
        const elements= getDOMElements();
        // FIRE EVENTS

        fireEvent.change(
            elements.emailInput,
            {
                target:{
                    value:email
                }
            }
        )

        fireEvent.change(
            elements.passwordInput,
            {
                target:{
                    value:password
                }
            }
        )
        
        fireEvent.click(elements.loginButton)

        const errorContainer = await screen.findAllByText(error)

        await waitFor(
            ()=>{

                expect(errorContainer.length).toEqual(2)
            }
        )

    })
})


function getDOMElements(){

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

    return {emailInput, passwordInput, loginButton}

}