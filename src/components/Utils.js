import { useContext} from "react";
import { useViewport } from "../context/ViewPort";
import { ShadowContext } from "../context/ShadowContext";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as BsIcons from "react-icons/bs"
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Store } from 'react-notifications-component';

export const Shadow = ({styleClass,onClassName, children})=>{

    const {visible} = useContext(ShadowContext)

    return (

        <div className={`${styleClass}  ${visible? onClassName : ""}`}>
            {children}
        </div>
    )
}


export const FormHolder = ({children})=>{

    const {width} = useViewport()

    return (
        <div className="banner--form flex">
            <div className="banner">
                <img src={width < 846 ?"mobile-bg.svg": "big-bg.svg"} alt="savings" className="banner--img" />
            </div>
            {children}  
        </div> 
    )
}


export const Header = ({children})=>{
    return (
        <header className = "header">
            {children}
        </header>
    )
}


export const Main = ({children})=>{

    const {isExpired} = useAuth()

    useEffect(
        ()=>{

            if(isExpired && sessionStorage.length >= 1 ){
                Store.addNotification(NotificationSettings(
                    Notify(
                        "Session Expired, need to login again",
                        "warning"
                    )
                ));
            }
        },[isExpired]
    )

    return (
        <main className = "main">
            {children}
        </main>
    )
}

export const ProtectedComponent = ({children})=> {

    const {isExpired, setIsExpired} = useAuth()

    // access can be null
    const {access} = useAuth()

    // will throw an error if the  access is null

    // const access_info = jwtDecode(access)

    // if(dayjs.unix(access_info.exp).diff(dayjs()) < 1){

    //     setIsExpired(!isExpired)
    // }

    if(!access){

        return <Navigate to= "login"/>
    }
    else {

        const access_info = jwtDecode(access)

        if(dayjs.unix(access_info.exp).diff(dayjs()) < 1){

            sessionStorage.clear()
        }

        if(isExpired){

            return <Navigate to= "login"/>

        }
    }

    return children
}


export const NotificationSettings = (content)=>{

    return {

        content,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000
        }

    }
}


export function Notify(message, styleClass){

    return(

        <div className={`notification ${styleClass}`}>
            <BsIcons.BsFillBellFill/>
            <p className="notification--text">
                {message}
            </p>
        </div>
    )
}