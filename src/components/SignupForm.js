import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useAlert } from "../context/AlertProvider";
import {
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    CardHeader,

} from "@mui/material";
import { v4 as uuid} from "uuid"


const Signup = ()=>{

    const {handlePushAlert} = useAlert()

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

        onSubmit : async values =>{

            await axios.post(
                "api/auth/register",
                {
                    email:values.email,
                    password:values.password,
                    username:values.username
                }
            ).then(
                response=>{
                    handlePushAlert({
                        id:uuid(),
                        message:"Account Created",
                        severity:"success"
                    })
                    
                }
            ).catch(
                error=>{

                    handlePushAlert({
                        id:uuid(),
                        message:"Unable to process request at the moment try again leter!",
                        severity:"error"
                    })
                    
                }
            )
        }
    
    })

    return (
    <>

        <Card variant="outlined" sx={{maxWidth:375, width:"90%", mx:"auto"}}>

            <CardHeader title="Join us"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ display:"flex", flexDirection:"column", gap:2}}>
                        <TextField 
                        id="username"
                        type="text"
                        placeholder="johnDoe"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        {...formik.getFieldProps('username')}/>
                        
                        <TextField 
                        id="email"
                        placeholder="johnDoe@example.com"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        {...formik.getFieldProps('email')}/>

                        <TextField 
                        id="password"
                        type="password"
                        placeholder="Enter Your Password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}/>

                        <TextField 
                        id="confirmPassword"
                        type="password"
                        placeholder="confirm your password"
                        label="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}/>

                        <Button variant="contained" type="submit" sx={{backgroundColor:"primary"}}>Sign Up</Button>
                        <Box 
                        component="div" 
                        sx={{display:"flex", flexDirection:"column", justifyContent:"space-around", alignItems:"center"}}>
                            <Typography variant="body2" component="div">
                                Have an Account?
                                <Typography component="span" sx={{ml:1, fontSize:12, cursor:"pointer"}}>
                                    Log in
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </CardContent>
        </Card>
    </>
    
    )
}

export default Signup