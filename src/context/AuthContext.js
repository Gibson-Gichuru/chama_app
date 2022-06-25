import { createContext, useState, useContext } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{

    const [jwt, setJwt] = useState(null)

    const logIn = (refresh, access) => setJwt(
        jwt.access  = access,
        jwt.refresh = refresh
    )

    const logOut = () => setJwt({})

    return (

        <AuthContext.Provider value={{ logIn, logOut, jwt}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext)

export {useAuth, AuthContextProvider}