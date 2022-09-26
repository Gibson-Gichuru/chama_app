import {LOGIN_USER} from "./UserType";

export const loginUser = (tokens)=>{

    return {
        type:LOGIN_USER,
        payload:tokens
    }
}