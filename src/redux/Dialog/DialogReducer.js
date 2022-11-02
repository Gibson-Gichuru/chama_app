import {OPEN_DIALOG, CLOSE_DIALOG} from "./DialogTypes";

const initialState = {

    features:{},
    open:false
}

const dialogReducer = (state= initialState, action)=>{

    switch(action.type){

        case OPEN_DIALOG: return {

            ...state,
            features: {...action.payload},
            open:true

        }
        case CLOSE_DIALOG: return {
            ...state,
            features: {},
            open:true
        }

        default: return state
    }

}

export default dialogReducer