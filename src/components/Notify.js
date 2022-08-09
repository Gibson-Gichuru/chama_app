import { 
    Alert,
    Stack,
    Button,
    IconButton,
    Collapse,
    Box,

} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
        <Stack sx={{width:"100%"}} spacing={2}>
            {alerts.map(alert=>(
                <Collapse in={show}>
                    <Alert 
                    key={alert.id} 
                    severity={alert.severity}
                    action ={
                        alert.action?<Box>
                            <Button variant="text" color="inherit"
                            onClick={()=> alert.action.callback()}>Send</Button>
                            <IconButton 
                            aria-label="close" 
                            color="inherit" 
                            size="small" 
                            onClick={()=>handlePopAlert(alert.id)}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Box>:(
                        <IconButton 
                        aria-label="close" 
                        color="inherit" 
                        size="small" 
                        onClick={()=>handlePopAlert(alert.id)}>
                             <CloseIcon fontSize="inherit" />
                        </IconButton>
                        )
                    }>{alert.message}</Alert>
                </Collapse>
               
            ))}
        </Stack>
    )

}

export default Notifications