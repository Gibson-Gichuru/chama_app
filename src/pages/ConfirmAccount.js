import {useEffect} from "react";
import {useAlert} from "../context/AlertProvider";
import {useParams, useNavigate} from "react-router-dom";
import {v4 as uuid} from "uuid";
import axios from "axios";
import { checkIsExpired } from "../utilities/AppUtils";

const ConfirmAccount= ()=>{

    // get the user token from the url

    const {userToken} = useParams();

    const {handlePushAlert} = useAlert()

    const navigate = useNavigate()

    async function handleConfirmAccount(){

        await axios.get(
            `/api/auth/account/confirmation/${userToken}`
        ).then(()=>{
            handlePushAlert({
                id:uuid(),
                message:"Account now activated",
                severity:"success"
            })

            navigate("/", {replace:true})

        }).catch(()=>{
            handlePushAlert({
                id:uuid(),
                message:"Invalid or expired token used",
                severity:"error"
            })
        })

        navigate("/", {replace:true})
    }

    useEffect(()=>{

        if(checkIsExpired(userToken)){
            handlePushAlert({
                id:uuid(),
                message:"Invalid or expired token",
                severity:"error"
            })

            navigate("/", {replace:true})
        }else{
            handleConfirmAccount()
        }
        navigate("/", {replace:true})  
    })

    return (
        <></>
    )
}

export default ConfirmAccount