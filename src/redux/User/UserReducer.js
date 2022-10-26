import {LOGIN_USER, LOGOUT_USER} from "./UserType"

const initialState = {
    tokens: {},
    loggedIn: false,
    accountInfo:{}
}

const userReducer = (state = initialState, action)=>{

    switch(action.type){

        case LOGIN_USER: return {

            ...state,
            tokens: {...state.tokens, ...action.payload.tokens},
            loggedIn: true,
            accountInfo:{...state.accountInfo}
        }

        case LOGOUT_USER: return {
            ...state, 
            tokens:{},
            loggedIn:false,
            accountInfo:{...state.accountInfo}
        }

        default: return state
    }
}


export default userReducer;
