import { createContext, useState, useContext, useEffect} from "react";

const AuthContext = createContext()


const AuthContextProvider = ({children}) =>{

    // get the  access Authentication tokens object from the sessionStorage
    let [refreshToken, setRefreshToken] = useState(

        ()=> sessionStorage.getItem("tokens")? JSON.parse(sessionStorage.getItem('tokens')): null
    )

    
    let [access, setAccess] = useState(
        ()=> {

            let tokens = refreshToken?.access

            return tokens
        }
    )

    let [isExpired, setIsExpired] = useState(true)



    let logIn = (refresh, access) => {

        sessionStorage.setItem(
            "tokens", 
            JSON.stringify(
                {
                    "refresh":refresh,
                    "access":access
                }
            )
        )
        
        setAccess(access)
        setIsExpired(!isExpired)
    }

    let logOut = () => {
        sessionStorage.removeItem("tokens")
        setRefreshToken(null)
        setAccess(null)
        setIsExpired(!isExpired)
    }

    let contextData = {
        access:access,
        refreshToken:refreshToken,
        setRefreshToken:setRefreshToken,
        setAccess:setAccess,
        logIn:logIn,
        logOut:logOut,
        isExpired:isExpired,
        setIsExpired:setIsExpired
    }

    useEffect(
        ()=>{
            if(refreshToken){
                setAccess(refreshToken.access)
        }
        },[refreshToken]
    )
    return (

        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext)

export {useAuth, AuthContextProvider}