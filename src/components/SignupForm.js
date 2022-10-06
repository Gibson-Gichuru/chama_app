import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useState} from "react";
import {
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    InputAdornment,
    IconButton

} from "@mui/material";
import { LoadingButton } from '@mui/lab';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { v4 as uuid} from "uuid";

import {connect} from "react-redux";

import { addAlert } from "../redux/Alert/AlertActions";


const Signup = ({changeIndex, handlePushAlert})=>{

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = ()=> setShowPassword(!showPassword)

    const formik = useFormik({
    
        initialValues:{
            username:"",
            email:"",
            password:"",
            confirmPassword: "",
        },

        validationSchema: Yup.object(
            {   
                username:Yup.string().required("required").min(3,"have to be 3 chars or more"),
                email: Yup.string().email("Invalid Email").required("required"),
                password: Yup.string().required("required")
                .min(8, "Password is too short-should be 8 char min")
                .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 
                        "password should contain atleast one number and one special character"),

                confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required("need to confirm your password")
            }
        ),

        onSubmit : async (values, {setErrors}) =>{

            await axios.post(
                "api/auth/register",
                {
                    email:values.email,
                    password:values.password,
                    username:values.username,
                    remote_url:document.baseURI,
                }
            ).then(
                (response)=>{
                    handlePushAlert({
                        id:uuid(),
                        message:`${response.data.message} ${formik.values.email}`,
                        severity:"success"
                    })
                    changeIndex(0)
                }
            ).catch(({ response })=>{
                    const errors = {...response.data.errors}
                    setErrors(errors)
                }

            )
        }
    
    })

    return (
    <>

        <Card variant="outlined" sx={{maxWidth:375, width:"90%", mx:"auto"}}>

            <CardHeader title="Join us"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit} data-testid="testRegisterForm">
                    <Box sx={{ display:"flex", flexDirection:"column", gap:2}}>
                        <TextField autoComplete="off" id="username" type="text" placeholder="johnDoe" label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        {...formik.getFieldProps('username')}/>
                        
                        <TextField autoComplete="off" id="email" placeholder="johnDoe@example.com" label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        {...formik.getFieldProps('email')}/>

                        <TextField autoComplete="off" id="password" type={showPassword?"text":"password"} placeholder="Enter Your Password" label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps = {{
                            endAdornment:<InputAdornment position="end">
                                <IconButton arial-label="togge password visibility" onClick={handleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff/>:<Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}/>

                        <TextField autoComplete="off" id="confirmPassword" type={showPassword?"text":"password"} placeholder="confirm your password" label="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}/>

                        <LoadingButton variant="contained" type="submit" loading={formik.isSubmitting}
                        loadingIndicator={<CircularProgress size={24}/>}>Sign Up</LoadingButton>
                        
                        <Box 
                        component="div" 
                        sx={{display:"flex", flexDirection:"column", justifyContent:"space-around", alignItems:"center"}}>
                            <Typography variant="body2" component="div">
                                Have an Account?
                                <Button variant="text" size="small"onClick={()=>changeIndex(0)}
                                data-testid="testBackToLoginForm">Back to Login</Button>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </CardContent>
        </Card>
    </>
    
    )
}

const mapDispatchToProp = dispatch=>{

    return {
        handlePushAlert: alert=>dispatch(addAlert(alert)),   
    }
}

export default connect(undefined,mapDispatchToProp)(Signup)