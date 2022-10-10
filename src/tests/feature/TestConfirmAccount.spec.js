
import {render, screen, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom";

import  {rest} from "msw";

import {setupServer} from "msw/node";

import {Provider} from "react-redux";

import { MemoryRouter } from "react-router";

import {QueryClientProvider, QueryClient} from "react-query";

import configureStore from "redux-mock-store";

const mockStore = configureStore([])

const client = new QueryClient()

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

import App from "../../App";


// Backend server mock
const server = setupServer(

    rest.get("api/auth/account/confirmation/:token", (req, res, ctx)=>{

        return res(
            ctx.json({
                message:"Account has been activated"
            })
        )
    })
)

beforeAll(()=>server.listen())


afterAll(()=>server.close())


describe("User Account Confrmation Flow Tests", ()=>{


    it("Should display Error UI on account Confirmation fail", 

        async ()=>{

            const token = "some token"

            server.use(
                rest.get('api/auth/account/confirmation/:token', (req,res,ctx)=>{

                    return res.once(
                        ctx.status(403),
                        ctx.json({message:"Invalid Token"})
                    )
                })
            )
            render(renderApplication())

            
            const feedback = await screen.findByText("Invalid Token")
            await waitFor(
                ()=>{

                    expect(feedback).toBeInTheDocument()
                }
            )
    
        }
        
        )

    it("Should display Account Confirmed UI in success Account confirmation", async ()=>{
        const token = "Some token"

        render(renderApplication())

        const feedback = await screen.findByText("Account Confirmed")

        expect(feedback).toBeInTheDocument()
    })
})

function renderApplication(){

    const token = "some token"

    return (
        <MemoryRouter initialEntries={[`/account/confirm/${token}`]}>
            <QueryClientProvider client={client}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </QueryClientProvider>
        </MemoryRouter>
    )
}