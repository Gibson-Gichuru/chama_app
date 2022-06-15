import { useContext } from "react"

import { ShadowContext } from "../context/ShadowContext"
const Shadow = ({styleClass,onClassName, offClassName, children})=>{

    const {visible} = useContext(ShadowContext)

    return (

        <div className={`${styleClass}  ${visible? onClassName : ""}`}>
            {children}
        </div>
    )
}

export default Shadow;