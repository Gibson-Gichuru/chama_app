import {LOGIN_USER, LOGOUT_USER} from "./UserType"

const initialState = {
    tokens: {},
    loggedIn: false
}

const userReducer = (state = initialState, action)=>{

    switch(action.type){

        case LOGIN_USER: return {

            ...state,
            tokens: {...state.tokens, ...action.payload},
            loggedIn: true
        }

        case LOGOUT_USER: return {
            ...state, 
            tokens:{},
            loggedIn:false
        }

        default: return state
    }
}


export default userReducer;
