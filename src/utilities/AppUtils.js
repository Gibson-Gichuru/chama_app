import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

import {TextField} from "@mui/material";

export function checkIsExpired(token){

    try{
        let  token_info = jwtDecode(token)
        if(dayjs.unix(token_info.exp).diff(dayjs())<1){
            return true
        }
    }catch(error){
        return true
    }

    return false
}

export function generateFormFields(fields){

    let formFields = {}

    fields.map((field)=>{

        let formField = <TextField {...field.common}/>

        formFields[field.name]= formField
    })

    return formFields
}