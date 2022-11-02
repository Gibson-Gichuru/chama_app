import { ADD_ALERT, DELETE_ALERT } from "./AlertTypes";

const initialState = {
    availableAlerts:[]
}

const alertReducer = (state= initialState, action)=>{

    switch(action.type){
        case ADD_ALERT: return {
            ...state,
            availableAlerts:[...state.availableAlerts, action.payload]
        }

        case DELETE_ALERT: return {
            ...state,
            availableAlerts: state.availableAlerts.filter(alert=>alert.id !== action.payload)
        }

        default: return state
    }
}

export default alertReducer

