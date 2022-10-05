import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"

import {addAlert} from "../redux/Alert/AlertActions";
import {loginUser} from "../redux/User/UserActions";

import {connect} from "react-redux";
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
    IconButton,

} from "@mui/material";
import { green } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { v4 as uuid} from "uuid";

import FormTextField from "./Inputs/FormTextField";

import {useQuery} from "react-query";


const LoginForm = ({changeIndex, handlePushAlert, logIn}) =>{

    // TODO USE REACT-QUERY TO HANDLE IS LOANDING FUCTIONALITY


    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = ()=>setShowPassword(!showPassword)

    const handleDownPassword = (e)=>{
        e.preventDefault()
    }
    async function handleRequestActivationLink (){
        // make request to the api
        
        await axios.post(
            "api/auth/activation_link",
            {remote_url:document.baseURI},
            {
                auth:{
                    username:formik.values.email,
                    password:formik.values.password
                }
            }

        ).then(()=>{

            handlePushAlert({
                id:uuid(),
                message: `Activation link Sent to ${formik.values.email}`,
                severity:"success"
            })

        }).catch(()=>{
            handlePushAlert({
                id:uuid(),
                message:"Unable to request Activation link, Contact your admin",
                severity:"error"
            })
        })
        
    }

    const formik = useFormik({

        initialValues: {
            email: "",
            password: ""
        },

        // form validation 

        validationSchema: Yup.object(
            {
                email : Yup.string().email("Invalid Email").required("required"),
                password: Yup.string().required("required!")
                            .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 
                            "password should contain atleast one number and one special character")
            }
        ),

        onSubmit: async (values, {setErrors}) => {

            await axios.get(
                "api/auth/login",
            {
                auth:{
                    username:values.email,
                    password:values.password
                }
            }
               
            ).then(({data})=>{
                
                logIn(data)


            }).catch(({response})=>{

                // The form only handles 403 error

                // any other error would be displayed on the alert notification component
                switch(response.status){

                    case 403:

                        setErrors(
                            {
                                email:response.data.error,
                                password:response.data.error
                            }
                        )

                        break;

                    default:
                       
                        handlePushAlert(
                            {
                                ...response.data,
                                id:uuid()
                            }
                        )
                        break;
                }
            })
        }
    })

   
    return (

        <>  
           <Card variant="outlined" sx={{maxWidth:375, width:"90%", mx:"auto"}}>
            <CardHeader title="Login"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit} data-testid="testLoginForm">
                    <Box sx={{display:"flex",flexDirection:"column", gap:2}}>

                        {/* <FormTextField properties={formElements["email"]}/>
                        <FormTextField properties={formElements["password"]}/> */}
                        <TextField autoComplete="off" id="email" type="email" placeholder="example@mail.com" label="Email Address" 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        inputProps={{"data-testid":"emailTestInput"}}
                        {...formik.getFieldProps('email')}/>

                        <TextField autoComplete="off" id="password" type= {showPassword? "text": "password"} placeholder="password" 
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        inputProps={{"data-testid":"passwordTestInput"}}
                        {...formik.getFieldProps('password')}
                        InputProps={{
                            endAdornment:<InputAdornment position="end">
                                <IconButton arial-label="toggle password visibility" onClick={handleShowPassword} onMouseDown={handleDownPassword} edge="end">
                                    { showPassword ?<VisibilityOff/>:<Visibility/>}
                                </IconButton>
                            </InputAdornment>,
                        }}/>
                        <Box sx = {{ position:"relative"}}>
                            {/* TODO INSTADE OF USING A COMPONENT MANAGED STATE, USE FORMIK ISSUBMITING FLAG */}
                            <Button 
                            data-testid="userLoginButton" variant="contained" type="submit" disabled={formik.isSubmitting} sx={{ width:"100%"}}>Login</Button>
                            {
                                formik.isSubmitting && (
                                    <CircularProgress size={24} sx = {{
                                        color:green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}/>
                                )
                            }
                        </Box>
                        <Box component="div" sx={{ display:"flex", flexDirection:"column" ,justifyContent:"space-around", alignItems:"center"}}>
                            <Typography variant="body2" component="div">
                                Don't have an account?
                                <Button data-testid="testRegisterButton" variant="text" size="small" onClick={()=>changeIndex(1)}>Sign Up</Button>
                            </Typography>
                            <Button data-testid="testForgotPassword" variant="text"size="small" onClick={()=>changeIndex(2)}>Forgot password</Button>
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

        handlePushAlert: (alert)=> dispatch(addAlert(alert)),
        logIn: (tokens)=> dispatch(loginUser(tokens))
    }
}

export default connect(undefined, mapDispatchToProp)(LoginForm);