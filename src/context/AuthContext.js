import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{

    const [jwt, setJwt] = useState('')

    return (

        <AuthContext.Provider value={{ jwt, setJwt}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}