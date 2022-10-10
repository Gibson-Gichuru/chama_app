import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Main from "./MainContainer";
import { LoadingButton } from '@mui/lab';

import {v4 as uuid} from "uuid";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useParams} from "react-router-dom";

import {connect} from "react-redux";

import {addAlert} from "../redux/Alert/AlertActions";

const ResetPasswordForm = ({handlePushAlert})=>{

    // states

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = ()=> setShowPassword(!showPassword)


    const {token}  = useParams();

    const navigate = useNavigate()
    // formik 


    const formik = useFormik({

        // form imputs
        initialValues:{
            password:"",
            confirmPassword:"",
        },

        // input validation Schema

        validationSchema: Yup.object({
            
            // password validation schema
            password: Yup.string().required("required")
            .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            "Password should contain alteast one number and one special character"),

            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "password must match")
            .required("need to confirm your password")
        }),

        // handle on submit event

        onSubmit: async (values)=>{
           
            await axios.post(
                "api/auth/reset_password",
                {
                    token:token,
                    password:values.confirmPassword
                }
            ).then(
                ({data})=>{
                
                    handlePushAlert({
                        id:uuid(),
                        message:data.message,
                        severity:"success"
                    })
                }
            ).catch(
                ({response})=>{
                    switch(response.status){

                        case 403:

                            handlePushAlert({
                                id:uuid(),
                                message:response.data.message,
                                severity:"info"
                            })
                            break;

                        default:
                            handlePushAlert({
                                id:uuid(),
                                message:"Unable to make request, try again later",
                                severity:"error"
                            })
                            break;
                    }
                }
            )
        }
    })

    return (
        <>
            {/* A card without any shadow box syling with 375px max width and horizontaly centered */}
            <Main>
                <Card variant="outlined" sx={{ maxWidth:375, width:"90%", mx:"auto"}}>
                    <CardHeader title="Reset Password"/>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                                <TextField autoComplete="off" id="password" type={showPassword? "text":"password"} label="Password"
                                placeholder="Enter Your New Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps = {
                                    {
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton arial-label="toggle password visibility" onClick={handleShowPassword} edge="end">
                                                {showPassword? <VisibilityOff/>:<Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                } {...formik.getFieldProps('password')}/>
                                <TextField autoComplete="off" id="confirmPassword" type={showPassword?"text":"password"} label="Confirm Password"
                                placeholder="Confirm Your Password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handlleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                {...formik.getFieldProps('confirmPassword')}/>

                                <LoadingButton variant="contained" type="submit" loading={formik.isSubmitting}
                                loadingIndicator={<CircularProgress size={24}/>}>Reset Password</LoadingButton>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Main>
        </>
    )
}

const mapDispatchToProp = dispatch=>{

    return {

        handlePushAlert: (alert)=> dispatch(addAlert(alert)),
    }
}

export default connect(undefined, mapDispatchToProp)(ResetPasswordForm)
