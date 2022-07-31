import { 
    useState,
    createContext,
    useContext,

} from "react";


const AlertContext = createContext()

export const AlertContextProvider = ({children})=> {

    const [alerts, setAlerts] = useState([])


    const handlePushAlert = alert=> setAlerts([...alerts ,alert])

    const handlePopAlert = alert_id=> setAlerts(
        alerts.filter(
            alert=> alert.id !== alert_id
        )
    )

    let contextData = {alerts,handlePushAlert, handlePopAlert}

    return (
        <AlertContext.Provider value={contextData}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = ()=> useContext(AlertContext)