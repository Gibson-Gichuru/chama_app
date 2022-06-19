import { useEffect } from "react";
import { useNotification } from "../context/NotificationContext";

const Notify = ()=>{

    const {message, category} = useNotification()

    const fadeout = ()=>{
        console.log("The compenent is unmounting")
    }

    useEffect(
        ()=>{
            window.setTimeout(fadeout, 7500)
        },[message]
    )

    return (

        <div className={`notification ${category}`}>
            {message}
        </div>
    )
}

export default Notify