import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
export function checkIsExpired(token){

    try{
        let  token_info = jwtDecode(token)
        if(dayjs.unix(token_info.exp).diff(dayjs())<1){
            return true
        }
    }catch(error){
        return true
    }

    return false
}