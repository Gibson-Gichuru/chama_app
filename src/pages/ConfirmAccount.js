import {useEffect} from "react";
import {useAlert} from "../context/AlertProvider";
import {useParams, useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import {v4 as uuid} from "uuid";
import axios from "axios";

const ConfirmAccount= ()=>{

    // get the user token from the url

    const {userToken} = useParams();

    const {handlePushAlert} = useAlert()

    const navigate = useNavigate()

    async function handleConfirmAccount(url){

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

        try {
            const token_info = jwtDecode(userToken)

            if(dayjs.unix(token_info.exp).diff(dayjs()) < 1){

                handlePushAlert({
                    id:uuid(),
                    message:"Invalid or expired token",
                    severity:"error"
                })

                navigate("/", {replace:true})
            }
            else{
                handleConfirmAccount()
            }
            
        } catch (error) {

            handlePushAlert({
                id:uuid(),
                message:"Invalid or expired token",
                severity:"error"
            })

            navigate("/", {replace:true})
        }

    })

    return (
        <></>
    )
}

export default ConfirmAccount