import {render, screen, waitFor, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom"

import {Provider} from "react-redux";

import store from "../../redux/store";

import {addAlert, deleteAlert} from "../../redux/Alert/AlertActions";

import Notifications from "../../components/Notify"


describe("<Notification> component Test", ()=>{

    let wrapper;

    const alertMessage = "testing alert message";

    beforeEach(async()=> wrapper = render(<Provider store={store}>
        <Notifications/>
    </Provider>))

    const alert = {id: 1, message:alertMessage, action:{callback:jest.fn()}}

    // afterEach(async()=> await store.dispatch(deleteAlert(alert.id)))

    it("Should Render The alert once the an alert has been pushed to store", async()=>{

        /*
            Updating the store will update the state of the component 
            which will happpen outside the React's call stack

            we could wait for the component to update then assert the results

        */ 

       
       await waitFor(
            async ()=>{
                
                store.dispatch(addAlert(alert))

                const alertMessageContainer = await screen.findByTestId("alertMessageContainer")

                expect(alertMessageContainer.innerHTML).toContain(alertMessage);

                // clean up 

                store.dispatch(deleteAlert(alert.id))
            }
        )

    })

    it("Should test that the action function passed to an alert is called on button press", async ()=>{

        
        await waitFor( async ()=>{

            store.dispatch(addAlert(alert))

            const actionButton = await screen.findByTestId("actionTestButton")

            fireEvent.click(actionButton)

            expect(alert.action.callback).toBeCalled()
        })
    })

    it("Should delete action from store if user dismiss the alert component",  async()=>{
        
        await waitFor(async ()=>{

            store.dispatch(addAlert(alert))
    
            const dismissButton = await screen.findByTestId("dismissTestButton")
    
            fireEvent.click(dismissButton)
    
            const state = store.getState()
    
            const availableAlerts = state.alerts.availableAlerts.filter(alrt=> alrt.id === alert.id)

            expect(availableAlerts.length).toEqual(0)
        })

    })


})
