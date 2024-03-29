import {rest} from "msw";

import {setupServer} from "msw/node";

import configureStore from 'redux-mock-store'

import {Provider} from "react-redux";

import {LOGIN_USER} from "../../redux/User/UserType";


import {render, screen, fireEvent, waitFor} from "@testing-library/react";

import "@testing-library/jest-dom";

import LoginForm from "../../components/LoginForm";
import { ADD_ALERT } from "../../redux/Alert/AlertTypes";
import savetoSessionStorage from "../../redux/middleWares/SaveUser";

const mockStore = configureStore([
    savetoSessionStorage
]);

const store = mockStore({});

const userTokens = {
    refresh:"some refresh token",
    access:"some access token"
}

const server = setupServer(

    rest.get("api/auth/login", (req, res, ctx)=>{

        return res(
            ctx.status(200),
            ctx.json({tokens:userTokens})
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

        // mocking the window sessionStorage

        Object.defineProperty(
            window, "sessionStorage",
            {
                value:{
                    getItem: jest.fn(()=>null),
                    setItem: jest.fn(()=>null)
                },
                writable:true
            }
        )

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

                // expect(window.sessionStorage.setItem).toHaveBeenCalledWith(userTokens)

                expect(window.sessionStorage.setItem).toHaveBeenCalled()

            }
        )

    })

    it("The Form Fields should error out on Error 401", async ()=>{

        const error = "Invalid username or password";

        server.use(

            rest.get("api/auth/login", (req, res, ctx)=>{

                return res.once(
                    ctx.status(401),
                    ctx.json({description:error})
                )
            })
        )

        
        // get DOM ELEMENTS
        
        const elements= getDOMElements();
        
        // fire user Actions

        fireUserActions(elements)
        const errorContainer = await screen.findAllByText(error)
        
        await waitFor(
            async ()=>{
                
                
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