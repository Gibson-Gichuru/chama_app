import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";

import Forgot from "../../components/Forgot";
import {Provider} from "react-redux";

import {rest} from "msw";

import {setupServer} from "msw/node";

import configureStore from 'redux-mock-store'
import { ADD_ALERT } from "../../redux/Alert/AlertTypes";

const message = "Activation link Sent"

const server = setupServer(

    rest.get("api/auth/reset_password", (req, res, ctx)=>{

        return res(ctx.json({message}))
    })
)

const mockStore = configureStore([])

const store = mockStore({})


beforeAll(()=>server.listen())

beforeEach(
    ()=>{

        render(
            <Provider store={store}>
                <Forgot changeIndex={jest.fn()}/>
            </Provider>
        )
    }
)

afterEach(()=>server.resetHandlers())

afterAll(()=>server.close())

describe("<Forgot> component  tests", ()=>{


    it("pushes an alert to the user on form submition", async()=>{

        const elements = getDOMElements()
        
        fireUserActions(elements)

        await waitFor(
            ()=>{

                const actions = store.getActions()

                
                const performedActions = actions.filter(action=>action.type === ADD_ALERT)
                
                expect(performedActions.length).toEqual(1)

                expect(performedActions[0].payload.message).toEqual(message)
            }
        )

    })

    it("Errors out on 404 server error", async()=>{

        const error= "Email not registered"

        server.use(
            rest.get("api/auth/reset_password", (req,res,ctx)=>{

                return res.once(
                    ctx.status(404),
                    ctx.json({description:error})
                )
            })
        )

        const elements = getDOMElements()

        fireUserActions(elements)

        const errorContainer = await screen.findByText(error)
        
        await waitFor(async()=>{

            expect(errorContainer).toBeInTheDocument()  
        })
    })

    it("Should push an alert to the store  on server error 500", async ()=>{

        const error = "Unable to make request. Try again later"

        server.use(
            rest.get("api/auth/reset_password", (req,res, ctx)=>{

                return res.once(
                    ctx.status(500),
                )
            })
        )

        const elements = getDOMElements()

        fireUserActions(elements)

        await waitFor(
            ()=>{
                
                const actions = store.getActions()

                const performedActions = actions.filter(action=>action.payload.message === error)

                expect(performedActions.length).toEqual(1)
            }
        )
    })
})

function getDOMElements(){
    
    const emailInput = screen.getByRole(
        "textbox",
        {
            name: "Email Address"
        }
    )

    const sendBtn = screen.getByRole(
        "button",
        {
            name:"Send Reset Request"
        }
    )

    return {emailInput, sendBtn}
}

function fireUserActions(elements){

    const email = "testing@test.com"

    fireEvent.change(
        elements.emailInput,
        {
            target:{
                value:email
            }
        }
    )

    fireEvent.click(elements.sendBtn)
}