import {LOGIN_USER} from "../User/UserType";
function savetoSessionStorage(storeApi){

    return function wrapDispatch(next){

        return function handleAction(action){

            if(action.type ===LOGIN_USER){
                // save to tokens to sessionStorage
                window.sessionStorage.setItem("tokens",JSON.stringify(action.payload))
            }

            return next(action)
        }
    }
}


export default savetoSessionStorage