import { createContext, useState, useContext, useEffect } from "react";

const ViewPortContext = createContext({
    width: window.innerWidth,
})

const ViewPortContextProvider = ({children}) =>{

    // create a widht state

    const [width, setWidth] = useState(window.innerWidth)

    const handleResize = ()=> setWidth(window.innerWidth)

    useEffect(()=>{

        window.addEventListener('resize', handleResize)
        return window.removeEventListener('resize', handleResize)

    },[])

    return (

        <ViewPortContext.Provider value = {{ width }}>
            {children}
        </ViewPortContext.Provider>
    )
}


const useViewport = ()=> useContext(ViewPortContext)

export { ViewPortContextProvider, useViewport}