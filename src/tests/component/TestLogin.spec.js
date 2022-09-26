import {render, screen, waitFor, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";

import {setupServer} from "msw/node";

import {rest} from "msw";

import LoginForm from "../../components/LoginForm";

import "@testing-library/jest-dom";

import {Provider} from "react-redux";

import store from "../../redux/store";

import {deleteAlert} from "../../redux/Alert/AlertActions";

describe("<Login/> Component Testing", ()=>{
    
    let wrapper;


    const email = "testing@interface.com";

    const password = "Passd@1234";

    const error = "invalid username or password"


    const base_url = " http://localhost/"
    
    const server = setupServer(
        rest.get("api/auth/login", (req,res, ctx)=>{

            return res(
                ctx.status(200),
                ctx.json({
                    tokens:{
                        refresh:"some refresh token",
                        access:"some access token"
                    }
                })
            )
        })
    )
    
    const handleSetIndex = jest.fn()

    beforeEach(async ()=> {

        await waitFor(()=>{

            wrapper = render(
                <Provider store={store}>
                    <LoginForm changeIndex= {handleSetIndex}/>
                </Provider>
            )
        })

        

        // get all the elements

        const emailInput = screen.getByRole("textbox", {
            name: "Email Address"
        });

        const passwordInput = screen.getByTestId("passwordTestInput");

        const loginButton = screen.getByRole("button", {name:"Login"});


        // perform some actions to the given elements
        
         //  Type user Email

        fireEvent.change(emailInput, {target:{
            value:email
        }})

        // Type user Password

        fireEvent.change(passwordInput, {target:{
            value:password
        }})

        // click on the login button

        fireEvent.click(loginButton)

    })

    beforeAll(()=>{server.listen()})

    afterEach(()=>server.resetHandlers())

    afterAll(()=>{server.close()})



    it("Input Elements Should Error Out on 401 http code return from server", async ()=>{
        // use this event handlers

        server.use(
            rest.get("api/auth/login", (req, res, ctx)=>{

                return res(
                    ctx.status(401),
                    ctx.json({description:error})
                )
            })
        )

        // get error containers

        const ErrorContainer = await screen.findByText(error)


        await waitFor(()=>{

            expect(ErrorContainer).toBeInTheDocument()
            
        })

    })

    it("Should push Error alert to store on 500 error code return from server", async ()=>{

        server.use(
            rest.get("api/auth/login", (req, res, ctx)=>{

                return res(

                    ctx.status(500)
                )
            })
        )


        const state = store.getState()

        const error500 = state.alerts.availableAlerts.filter(
            alert=> alert.message === "Unable to Connect,Try again later")
        
        await waitFor(()=>{

            expect(error500.length).toEqual(1)
        })

        // clean up thestate of the error

        error500.map(async error=> await store.dispatch(deleteAlert(error.id)))

    })

    it("Should push Error Alert to store on 403 error return from the  server", async ()=>{

        const message = "unauthorised"

        server.use(
            rest.get("api/auth/login", (req, res, ctx)=>{

                return res(
                    ctx.status(403),
                    ctx.json({
                        description:message
                    })
                )
            })
        )



        const state = store.getState()

        const error403 = state.alerts.availableAlerts.filter(
            alert=> alert.message === message)
        
        await waitFor(()=>{

            expect(error403 .length).toEqual(1)
        })

        // clean up thestate of the error

        error403.map(async error=> await store.dispatch(deleteAlert(error.id)))

    })
})