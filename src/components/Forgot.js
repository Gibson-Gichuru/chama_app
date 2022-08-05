import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,

} from "@mui/material";
import { v4 as uuid} from "uuid";
import {useState} from "react";
import {green} from "@mui/material/colors";
import {useAlert} from "../context/AlertProvider";

const Forgot = ({changeIndex})=>{

    const [loading, setLoading] = useState(false);

    const handleLoading = (state)=> setLoading(loading=> loading=state)

    const {handlePushAlert} = useAlert()

    const formik = useFormik(
        {
            initialValues:{
                email:""
            },

            validationSchema: Yup.object(
                {
                    email: Yup.string().email("Invalid Email").required("required")
                }
            ),

            onSubmit:  async (values, {setErrors})=>{
                handleLoading(true)
                await axios.post(
                    "api/auth/request/password_reset",
                    {
                        email:values.email
                    }
                ).then(({response})=>{
                    
                    const message = {...response.data}
                    handlePushAlert({
                        id:uuid(),
                        message:message.message,
                        severity:"success"
                    })

                    handleLoading(false)

                }).catch(({response})=>{

                    const errors = {...response.data}

                    switch (errors.code) {
                        case 401:
                            setErrors({errors})
                            break;
                        default:
                            handlePushAlert({
                                id:uuid(),
                                message:"Unable to make request. Try again later",
                                severity:"error"
                            })
                            break;
                    }
                    handleLoading(false)
                })
            }
        }
    )


    return (
        <Card variant="outlined" sx={{ maxWidth:375, width:"90%", mx:"auto"}}>
            <CardHeader title="Forgot Passswrd"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                        <TextField id="email" type="email" value={formik.values.email} label="Email Address"
                        placeholder="Enter your account email address"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}/>
                        <Box sx={{ position:"relative"}}>
                            <Button variant="contained" disabled={loading} type="submit" sx={{width:"100%"}}>Send Reset Request</Button>
                            {
                                loading && (
                                    <CircularProgress
                                    size = {24}
                                    sx={{
                                        color:green[500],
                                        position:"absolute",
                                        top:"50%",
                                        left:"50%",
                                        marginTop:"-12px",
                                        marginLeft:"-12px"
                                    }}/>
                                )
                            }
                        </Box>
                        <Box 
                        component="div" 
                        sx={{ display:"flex", flexDirection:"column",justifyContent:"space-around", alignItems:"center"}}>
                            <Button 
                            variant="text" 
                            size="small"
                            onClick={
                                ()=>changeIndex(0)
                            }>
                                Back To Login
                            </Button>
                        </Box>
                    </Box>
                </form>
            </CardContent>
        </Card>
    )
}

export default Forgot