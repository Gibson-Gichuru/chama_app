import MainContainer from "../components/MainContainer";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import {
    LinearProgress,
} from "@mui/material";

import {lazy, Suspense} from "react";

const ResetPassword = ()=>{

    const [valid, setValid] = useState();
    const handleValid = (state)=> setValid(valid=> valid=state);
    const {userToken} = useParams();
    const PasswordRestForm = lazy(()=>import("../components/ResetPasswordForm"));
    const CustomError = lazy(()=>import("../components/CustomErrors"))
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
        <Suspense fallback={<LinearProgress color="error"/>}>
            <MainContainer>
            {valid?(<PasswordRestForm token={userToken}/>):(
                <CustomError message="Token Expired"/>
            )}
            </MainContainer> 
        </Suspense>
    )
}

export default ResetPassword