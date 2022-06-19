import { useState, useContext, createContext } from "react";

const Notification = createContext()

const NotificationProvider = ({children})=>{

    const [message, setMessage] = useState("")
    
    const [category, setCategory] = useState("")


    const showNotification = (displayMessage, notificationType)=>{

        setMessage(displayMessage)
        setCategory(notificationType)
    }

    return (

        <Notification.Provider value={{showNotification, message, category}}>
            {children}
        </Notification.Provider>
    )
}


const useNotification = ()=> useContext(Notification)

export {useNotification, NotificationProvider}