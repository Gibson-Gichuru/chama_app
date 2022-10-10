import {fireEvent, render, screen , waitFor} from "@testing-library/react";
import  "@testing-library/jest-dom";

import ResetPasswordForm from "../../components/ResetPasswordForm";

import configureStore from "redux-mock-store";

import {Provider} from "react-redux";

import {BrowserRouter} from "react-router-dom";

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



beforeEach(
    ()=>render(
        <Provider store={store}>
            <ResetPasswordForm token="some token"/>
        </Provider>,
        {wrapper:BrowserRouter}
    )
)

describe("<ResetPassword> component test", ()=>{
    
    it("Errors out on invalid user input", async ()=>{

        const elements = getDOMElements()

        fireUserActions(elements,true)

        const errorContainer = await screen.findByText("password must match")

        await waitFor(
            ()=>{

                expect(errorContainer).toBeInTheDocument()
            }
        )
    })
})


function getDOMElements(elements){

    const passwordInput = screen.getByPlaceholderText("Enter Your New Password")
    const confirmPassword = screen.getByPlaceholderText("Confirm Your Password")

    const resetBtn = screen.getByRole(
        "button",
        {
            name:"Reset Password"
        }
    )

    return {passwordInput, confirmPassword, resetBtn}
}

function fireUserActions(elements, errorOut=false){

    const password = "Pass@1234"

    fireEvent.change(
        elements.passwordInput,
        {
            target:{
                value:password
            }
        }
    )

    if(errorOut){
        fireEvent.change(
            elements.confirmPassword,
            {
                target:{
                    value:"Error@12"
                }
            }
        )
    }

    fireEvent.change(
        elements.confirmPassword,
        {
            target:password
        }
    )

    fireEvent.click(elements.resetBtn)

}