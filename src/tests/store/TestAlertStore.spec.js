import store from "../../redux/store";
import {addAlert, deleteAlert} from "../../redux/Alert/AlertActions";

describe("Testing Alert Store functionality", ()=>{

    let alert;

    beforeEach(()=> alert = {id: 1,text:"some alert message", action:jest.fn()})

    it("Should test an alertt is stored", ()=>{

        store.dispatch(addAlert(alert))

        const state= store.getState()

        const availableAlerts = state.alerts.availableAlerts.filter(alert=>alert.id===1)

        expect(availableAlerts.length).toEqual(1)

    })

    it("Should test an Alert can deleted from the store", ()=>{

        store.dispatch(deleteAlert(1))

        const state= store.getState()

        const availableAlerts = state.alerts.availableAlerts.filter(alert=>alert.id===1)

        expect(availableAlerts.length).toEqual(0)
    })
})