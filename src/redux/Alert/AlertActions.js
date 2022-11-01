import {ADD_ALERT, DELETE_ALERT} from "./AlertTypes";

export const addAlert = (alertPayload)=>{

    return {
        type:ADD_ALERT,
        payload:alertPayload
    }

}

export const deleteAlert = (alertId)=> {

    return {
        type:DELETE_ALERT,
        payload:alertId
    }
}