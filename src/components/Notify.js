import { 
    Alert,
    Stack,
    Button,
    IconButton,
    Collapse,
    Box,

} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import { connect } from 'react-redux'

import {deleteAlert} from "../redux/Alert/AlertActions";

const Notifications = ({alerts, show,handlePopAlert})=>{

    
    return (
        <Stack sx={{width:"100%"}} spacing={2}>
            {alerts.map((alert,index)=>(
                <Collapse in={show}>
                    <Alert 
                    data-testid="alertMessageContainer"
                    key={index} 
                    severity={alert.severity}
                    action ={
                        alert.action?<Box>
                            <Button variant="text" color="inherit"
                            data-testid="actionTestButton"
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

const mapStateToProp = state=>{

    return {

        alerts: state.alerts.availableAlerts,
        show: state.alerts.availableAlerts.length > 0 ? true:false,
    }
}

export default connect(mapStateToProp)(Notifications)