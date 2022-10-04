import {rest} from "msw";

import {setupServer} from "msw/node";

import configureStore from 'redux-mock-store'

import {Provider} from "react-redux";

import {LOGIN_USER} from "../../redux/User/UserType";


import {render, screen, fireEvent, waitFor} from "@testing-library/react";

import "@testing-library/jest-dom";

import LoginForm from "../../components/LoginForm";
import { ADD_ALERT } from "../../redux/Alert/AlertTypes";

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

    it("Should login the user on a success form submit", async ()=>{

        // get  the form inputs 

        const elements = getDOMElements()
    
        // confirm that the addUSer action was called
        fireUserActions(elements)
        
        await waitFor(
            ()=>{
                // fireEvent.click(elements.loginButton)

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
        
        // fire user Actions

        fireUserActions(elements)
        
        await waitFor(
            async ()=>{
                
                const errorContainer = await screen.findAllByText(error)
                
                expect(errorContainer.length).toEqual(2)
            }
        )

    })


    it("Pushes an alert to the store on Server error", async()=>{

        // define a handler 

        const error = "Something weird happend";

        server.use(
            rest.get("api/auth/login", (req, res, ctx)=>{

                return res.once(
                    ctx.status(500),
                    ctx.json({
                        error:error
                    })
                )
            })
        )

        // get the Dom elements

        const elements = getDOMElements();

        // fire user Actions

        fireUserActions(elements)

        
        await waitFor(
            ()=>{
                

                const actions = store.getActions()

                const performedActions = actions.filter(action=>action.type === ADD_ALERT)

                expect(performedActions.length).toEqual(1)
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

function fireUserActions(elements){
    const email = "testing@test.com";
    const password = "Passw@1234";

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
}