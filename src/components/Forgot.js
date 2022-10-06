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

import {addAlert} from "../redux/Alert/AlertActions";

import {connect} from "react-redux"; 
import { LoadingButton } from '@mui/lab';
const Forgot = ({changeIndex,handlePushAlert})=>{


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
                
                await axios.get(
                    "api/auth/reset_password",
                    {
                        params:{
                            email:values.email,
                            remote_url:document.baseURI
                        }
                    }
                ).then(({data})=>{

                    handlePushAlert({
                        id:uuid(),
                        message:data.message,
                        severity:"success"
                    })

                }).catch(({response})=>{
                    
                    switch (response.status) {
                        case 404:
                            setErrors({
                                email:response.data.description
                            })
                            break;
                        default:
                            handlePushAlert({
                                id:uuid(),
                                message:"Unable to make request. Try again later",
                                severity:"error"
                            })
                            break;
                    }
                })
            }
        }
    )


    return (
        <Card variant="outlined" sx={{ maxWidth:375, width:"90%", mx:"auto"}}>
            <CardHeader title="Forgot Passswrd"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit} data-testid="testForgotPasswordForm">
                    <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                        <TextField id="email" type="email" value={formik.values.email} label="Email Address"
                        placeholder="Enter your account email address"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}/>

                        <LoadingButton variant="contained" type="submit" disabled={formik.isSubmitting}
                        loading={formik.isSubmitting}
                        loadingIndicator={<CircularProgress size={24}/>}>Send Reset Request</LoadingButton>
                        
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

const mapDispatchToProp = dispatch=>{

    return {
        handlePushAlert: alert=>dispatch(addAlert(alert)),   
    }
}

export default connect(undefined, mapDispatchToProp)(Forgot)