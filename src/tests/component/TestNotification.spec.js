import {render, screen, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"

import {Provider} from "react-redux";

import store from "../../redux/store";

import {addAlert, deleteAlert} from "../../redux/Alert/AlertActions";

import Notifications from "../../components/Notify"


describe("<Notification> component Test", ()=>{

    let wrapper;

    const alertMessage = "testing alert message";

    beforeEach(()=> wrapper = render(<Provider store={store}>
        <Notifications/>
    </Provider>))

    const alert = {id: 1, message:alertMessage, action:jest.fn()}

    afterEach(()=>store.dispatch(deleteAlert(alert.id)))

    it("Should Render The alert once the an alert has been pushed to store", async()=>{

        // push alert to store 

        store.dispatch(addAlert(alert))

        // get an element from the DOM that holds the alert Message

        const alertMessageContainer = await screen.findByTestId("alertMessageContainer")

        // assert that the allertContainer have the given Alert Message

        await waitFor(()=>{
            
            expect(alertMessageContainer.innerHTML).toContain(alertMessage);
        })

    })


})
