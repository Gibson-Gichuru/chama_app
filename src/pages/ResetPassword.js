import ResetPasswordForm from "../components/ResetPasswordForm";
import MainContainer from "../components/MainContainer";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import {
    Typography,
    Box,
} from "@mui/material";
const ResetPassword = ()=>{

    const [valid, setValid] = useState();
    const handleValid = (state)=> setValid(valid=> valid=state);
    const {userToken} = useParams();

    useEffect(()=>{

        try{
            const token_info = jwtDecode(userToken)
            if(dayjs.unix(token_info.exp).diff(dayjs()) < 1){
                handleValid(false)
            }
            else{
                handleValid(true)
            }
        }catch(error){
            handleValid(false)
    
        }
    })

    return (
        <MainContainer>
            {valid?(<ResetPasswordForm token={userToken}/>):(
                <Box>
                    <Typography>Token Expired</Typography>
                </Box>
            )}
        </MainContainer> 
    )
}

export default ResetPassword