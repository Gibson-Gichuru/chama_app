import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import { useAuth } from "../context/AuthContext";
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
const LoginForm = ({changeIndex}) =>{
    

   
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

        onSubmit: async values => {

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
            }).catch(error=>{
                handlePushAlert({
                    id:uuid(),
                    message:"some testing message",
                    severity:"error"
                })
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
                        <TextField  
                        id="email" 
                        type="email" 
                        placeholder="example@mail.com" 
                        label="Email Address" 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        {...formik.getFieldProps('email')}/>

                        <TextField
                        id="password" 
                        type="password" 
                        placeholder="password" 
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        {...formik.getFieldProps('password')}/>
                        <Button variant="contained" type="submit" sx={{ backgroundColor:"primary"}}>Login</Button>
                        <Box component="div" sx={{ display:"flex", flexDirection:"column" ,justifyContent:"space-around", alignItems:"center"}}>
                            <Typography variant="body2" component="div">
                                Don't have an account?
                                <Typography 
                                component="span" 
                                sx={{ml:1, fontSize:12, cursor:"pointer"}}
                                onClick={
                                    ()=>changeIndex(1)
                                }>Sign Up</Typography>
                            </Typography>
                            <Typography 
                            component="span" 
                            sx={{fontSize:12, cursor:"pointer"}}
                            onClick={
                                ()=>changeIndex(2)
                            }>Forgot password</Typography>
                        </Box>
                    </Box>
                </form>
            </CardContent>
           </Card>
        </>
    )
}

export default LoginForm;