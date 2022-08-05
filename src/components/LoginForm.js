import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertProvider";
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

import { v4 as uuid} from "uuid"

const LoginForm = ({changeIndex}) =>{

    const [isLoading, setIsLoading] = useState(false)
    const handleIsLoading = (status)=>setIsLoading(isLoading => isLoading = status)

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = ()=>setShowPassword(!showPassword)
    const handleDownPassword = (e)=>{
        e.preventDefault()
    }
    const {logIn} = useAuth()
    const {handlePushAlert} = useAlert()
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
                            .min(8, "Password is too short - should be 8 chars minimum.")
                            .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 
                            "password should contain atleast one number and one special character")
            }
        ),

        onSubmit: async (values, {setErrors}) => {
            handleIsLoading(true)
            await axios.get(
                "api/auth/login",
                {
                    auth:{
                        username:values.email,
                        password:values.password
                    }
                }
            ).then(data=>{
                // setup the logged in user and redirect to the home page
                let tokens = data.data.tokens
                logIn(tokens.refresh, tokens.access)
                handleIsLoading(false)
            }).catch(({response})=>{

                const errors = {...response.data}
                switch (errors.code) {
                    case 403:
                        handlePushAlert({
                            id:uuid(),
                            message:response.data.description,
                            severity:"warning"
                        })
                        break;
                    case 401:
                        setErrors({email:errors.description, password:errors.description})
                        break;
                    default:
                        handlePushAlert({
                            id:uuid(),
                            message:"Unable to Connect,Try again later",
                            severity:"error"
                        })
                        break;
                }
               
                handleIsLoading(false)
            })
        }
    })


    return (

        <>  
           <Card variant="outlined" sx={{maxWidth:375, width:"90%", mx:"auto"}}>
            <CardHeader title="Login"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit} >
                    <Box sx={{display:"flex",flexDirection:"column", gap:2}}>
                        <TextField autoComplete="off" id="email" type="email" placeholder="example@mail.com" label="Email Address" 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        {...formik.getFieldProps('email')}/>

                        <TextField autoComplete="off" id="password" type= {showPassword? "text": "password"} placeholder="password" label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        {...formik.getFieldProps('password')}
                        InputProps={{
                            endAdornment:<InputAdornment position="end">
                                <IconButton arial-label="toggle password visibility" onClick={handleShowPassword} onMouseDown={handleDownPassword} edge="end">
                                    { showPassword ?<VisibilityOff/>:<Visibility/>}
                                </IconButton>
                            </InputAdornment>,
                        }}/>
                        <Box sx = {{ position:"relative"}}>
                            <Button variant="contained" type="submit" disabled={isLoading} sx={{ width:"100%"}}>Login</Button>
                            {
                                isLoading && (
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
                                <Button variant="text" size="small" onClick={()=>changeIndex(1)}>Sign Up</Button>
                            </Typography>
                            <Button variant="text"size="small" onClick={()=>changeIndex(2)}>Forgot password</Button>
                        </Box>
                    </Box>
                </form>
            </CardContent>
           </Card>
        </>
    )
}

export default LoginForm;