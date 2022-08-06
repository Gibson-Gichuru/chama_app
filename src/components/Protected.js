import { useAuth } from "../context/AuthContext";
import Main from "../components/MainContainer";
import Forms from "../components/Forms";
const Protected = ({children})=>{

    const {access , isExpired} = useAuth()


    if( access && !isExpired){

        return <>{children}</>
    }
    
    return <Main><Forms/></Main>
}

export default Protected