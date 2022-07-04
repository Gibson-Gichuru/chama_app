import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Main } from "../components/Utils";

import { Notify } from "../components/Utils";

import { NotificationSettings } from "../components/Utils";

import { Store } from "react-notifications-component";

const AccountConfirmed = ()=>{

    const [confirmed, setConfirmed] = useState(false)
    const {userToken} = useParams()
    const navigate =useNavigate()
    useEffect(
        ()=>{

            axios.get(
                `/api/auth/account/confirmation/${userToken}`
            ).then(
                response=>{

                    Store.addNotification(
                        NotificationSettings(
                            Notify(
                                "Account Confirmed",
                                "success"
                            )
                        )
                    )

                    window.setTimeout(navigate("/login", 9000))
                    
                }
            ).catch(
                error=>setConfirmed(false)
            )
            // get the token from the  url

            // make a fetch call to the  backend api to confirm the user token

            // change the  tconfirmed state according to the response status_code

        },[userToken]
    )
    return (
        <Main>
           <h1>
            { confirmed? "Account Confirmed": "Account not Confired"}
           </h1>
        </Main>
    )
}


export default AccountConfirmed