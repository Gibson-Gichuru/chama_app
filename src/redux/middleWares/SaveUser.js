import {LOGIN_USER} from "../User/UserType";

const savetoSessionStorage = store=> next => action=>{

    if(action.type === LOGIN_USER){

        window.sessionStorage.setItem("tokens", JSON.stringify(action.payload))
    }

    next(action)
}


export default savetoSessionStorage