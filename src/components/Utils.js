import { useContext } from "react"
import { useViewport } from "../context/ViewPort"
import { ShadowContext } from "../context/ShadowContext"
export const Shadow = ({styleClass,onClassName, children})=>{

    const {visible} = useContext(ShadowContext)

    return (

        <div className={`${styleClass}  ${visible? onClassName : ""}`}>
            {children}
        </div>
    )
}


export const FormHolder = ({children})=>{

    const {width} = useViewport()

    return (
        <div className="banner--form flex">
            <div className="banner">
                <img src={width < 846 ?"mobile-bg.svg": "big-bg.svg"} alt="savings" className="banner--img" />
            </div>
            {children}  
        </div> 
    )
}


export const Header = ({children})=>{
    return (
        <header className = "header">
            {children}
        </header>
    )
}


export const Main = ({children})=>{
    return (
        <main className = "main">
            {children}
        </main>
    )
}