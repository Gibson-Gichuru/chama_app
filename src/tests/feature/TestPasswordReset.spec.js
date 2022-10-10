import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "react-query";

import App from "../../App";

import configureStore from "redux-mock-store";
import {rest} from "msw";
import {setupServer} from "msw/node";

const mockStore = configureStore([])
const store = mockStore({
    user:{
        tokens:{},
        loggedIn:false
    },
    dialog:{
        features:{

        },
        open:false
    },
    alerts:{
        availableAlerts:[],
    }
})

const client = new QueryClient()

const server = setupServer(

    rest.post("api/auth/reset_password", (req, res,ctx)=>{

        return res(ctx.json({message:"Password reset successful"}))
    })
)

beforeAll(()=>server.listen())
afterAll(()=>server.close())

describe("Testing Password rest flow", ()=>{

    it("Should alow user to reset password", async()=>{


        render(renderApplication())

        const elements = getDOMElements()

        performUserActions(elements)

        await waitFor(
            ()=>{

                const actions = store.getActions()

                const performedActions = actions.filter(action=>action.payload.message ==="Password reset successful")

                expect(performedActions.length).toEqual(1)
            }
        )
    })

    it("Should Error out on server 403 error", async()=>{

        const errorMessage  = "invalid user token"

        server.use(
            rest.post("api/auth/reset_password", (req, res, ctx)=>{

                return res.once(
                    ctx.status(403),
                    ctx.json({message:errorMessage})
                )
            })
        )

        render(renderApplication())

        const elements = getDOMElements()

        performUserActions(elements)

        await waitFor(
            ()=>{

                const actions = store.getActions()

                const performedActions = actions.filter(action=>action.payload.message === errorMessage)

                expect(performedActions.length).toEqual(1)
            }
        )


    })
})


function renderApplication (){

    const token = "some token"

    return (
        <MemoryRouter initialEntries={[`/reset/password/${token}`]}>
            <QueryClientProvider client={client}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </QueryClientProvider>
        </MemoryRouter>
    )
}

function getDOMElements(){

    const passwordInput = screen.getByPlaceholderText("Enter Your New Password")
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Your Password")

    const resetBtn = screen.getByRole(
        "button", {name:"Reset Password"}
    )

    return {passwordInput, confirmPasswordInput, resetBtn}
}


function performUserActions(elements){

    const password = "Testing@1234";

    const elementChange = {target:{value:password}}
    
    fireEvent.change(elements.passwordInput,{...elementChange})
    fireEvent.change(elements.confirmPasswordInput,{...elementChange})

    fireEvent.click(elements.resetBtn)
}