import axios from "axios";
import { useContext } from "react";
import { useAuth } from "./AuthContext";
import dayjs from "dayjs";

const baseUSrl = "/api"

const useAxios = ()=> {

    const {access,refreshToken, setUser, setRefreshToken} = useAuth()
    // creating a custom axios instance
    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${access}`}
    })

    // creating an axios request intercepter


    axiosInstance.interceptors.request.use(
        async req=>{

            const user = jwtDecode(access)
            // check if the token is expired
            
            const isExpired = dayjs.unix(user.exp).diff(dayjs())<1;
            if(!isExpired) return req
            
            const response = await axios.post(
                "/api/auth/token",
                headers={
                    Authorization: `Bearer ${refreshToken}`
                },
                {access:user},
            )

            sessionStorage.setItem('tokens', JSON.stringify(response.data.tokens))
            return req
        }
    )
}