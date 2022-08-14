import { useAuth } from "../context/AuthContext";
import Main from "../components/MainContainer";
import Forms from "../components/Forms";
import {checkIsExpired} from "../utilities/AppUtils";
const Protected = ({children})=>{

    const {access} = useAuth()


    if( access && !checkIsExpired(access)){

        return <>{children}</>
    }
    return <Main><Forms/></Main>
}
export const Hidden = ({children})=>{
    const {access} =useAuth()

    if (access && !checkIsExpired(access)){
        return<>{children}</>
    }

    return null
}
export default Protected 