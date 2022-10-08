import{useQuery} from "react-query";
import { useParams } from "react-router-dom";
import {connect} from "react-redux";
import {addAlert} from "../redux/Alert/AlertActions";
import Main from "../components/MainContainer";
import axios from "axios"
import {
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";


const ConfirmAccount = ()=>{

    const {token} = useParams()

    const {isSuccess, isError} = useQuery(
        "confirm",
        async ()=> await axios.get(`api/auth/account/confirmation/${token}`),
        {retry:false}
    )

    const makeUi = component=>(
        <Main>
            <Box sx={{
                width:"100vw", 
                height:"80vh", 
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
                }}>
                {component}
            </Box>
        </Main>
    )
    
    // TODO 
    if(isSuccess){
        return makeUi(<Typography variant="h5">Account Confirmed</Typography>)
    }

    // TODO 
    if(isError){
        return makeUi(<Typography variant="h5">Invalid Token</Typography>)
        
    }
    
    return makeUi(<CircularProgress size={250} thickness={1}/>)
    
}

export default ConfirmAccount