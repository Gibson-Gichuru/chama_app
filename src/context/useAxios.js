import axios from "axios";
import { useContext } from "react";
import { useAuth } from "./AuthContext";
import dayjs from "dayjs";
import {checkIsExpired} from "../utilities/AppUtils";
import { ThemeContext } from "@emotion/react";
const baseUSrl = "/api"

const useAxios = ()=> {

    const {access,refreshToken, setAcces, setRefreshToken} = useAuth()
    // creating a custom axios instance
    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${access}`}
    })

    // creating an axios request intercepter

    axiosInstance.interceptors.request.use(
        async req=>{
            
            const isExpired = checkIsExpired(access);
            if(!isExpired) return req
            
            const response = await axios.post(
                "/api/auth/token",
                headers={
                    Authorization: `Bearer ${refreshToken}`
                },
                {access:user},
            ).then(({response})=>{
                setRefreshToken(data.token.refresh)
                setAccess(data.token.access)
            })

            sessionStorage.setItem('tokens', JSON.stringify(response.data.tokens))
            return req
        }
    )
}