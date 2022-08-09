import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Forgot from "./Forgot"
import {useState, useEffect} from "react";
import {Box} from "@mui/material";


const Forms = ()=>{

    const [index, setIndex] = useState(0)

    const handleIndexToggle = (new_index)=>{
        setIndex(new_index)
    }

    const [form, setForm] = useState(null)

    useEffect(
        ()=>{
            if(index ===0){
                setForm(<LoginForm changeIndex={handleIndexToggle}/>)
            }
            else if(index ===1){
                setForm(<SignupForm changeIndex = {handleIndexToggle}/>)
            }
            else{
                setForm(<Forgot changeIndex = {handleIndexToggle}/>)
            }
        }, [index]
    )


    return (
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            {form}
        </Box>
    )
}


export default Forms