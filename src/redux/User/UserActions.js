import {LOGIN_USER, LOGOUT_USER} from "./UserType";

export const loginUser = (tokens)=>{

    return {
        type:LOGIN_USER,
        payload:tokens
    }
}

export const logoutUser = ()=>{

    return {type:LOGOUT_USER}
}