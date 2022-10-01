import {LOGIN_USER} from "./UserType"

const initialState = {

    tokens: {}
}

const userReducer = (state = initialState, action)=>{

    switch(action.type){

        case LOGIN_USER: return {

            ...state,
            tokens: {...state.tokens, ...action.payload}
        }

        default: return state
    }
}


export default userReducer;
