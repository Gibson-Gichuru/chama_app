import { 
    Snackbar,
    Alert,

} from "@mui/material";

import {useAlert} from "../context/AlertProvider";
import {useState, useEffect} from "react";

const Notifications = ()=>{

    const {alerts,handlePopAlert} = useAlert()

    const [show, setShow] = useState(false)


    useEffect(
        ()=>{
            if(alerts.length > 0){
                setShow(true)
            }
        },[alerts]
    )
    
    return (
        <>
            {alerts.map(alert=>(
                <Snackbar 
                open={show} 
                autoHideDuration={6000} 
                key={alert.id} 
                onClose={()=>handlePopAlert(alert.id)}
                anchorOrigin={{vertical:"bottom", horizontal:"center"}}>
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                </Snackbar>
            ))}
        </>
    )

}

export default Notifications