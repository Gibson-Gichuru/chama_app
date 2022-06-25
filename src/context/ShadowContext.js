import { useState, createContext } from "react";


const ShadowContext = createContext()

const ShadowContextProvider = ({children}) => {

    const [visible, setVisible] = useState(false)

    const visibilityOn = ()=> setVisible(!visible)

    return (

        <ShadowContext.Provider value={{visible, visibilityOn}}>
            {children}
        </ShadowContext.Provider>
    )

}

export {ShadowContextProvider, ShadowContext}