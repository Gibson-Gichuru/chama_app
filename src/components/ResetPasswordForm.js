import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

import {
    Button,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {v4 as uuid} from "uuid";
import {useAlert} from "../context/AlertProvider";
import {green} from "@mui/material/colors";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";

const ResetPasswordForm = ()=>{

    // states

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = ()=> setShowPassword(!showPassword)

    // loading state

    const [loading, setLoading] = useState(false)

    const handleLoading = (state)=> setLoading(loading=> loading=state)
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
            // handle logic
        }
    })

    return (
        <>
            {/* A card without any shadow box syling with 375px max width and horizontaly centered */}
            <Card variant="outlined" sx={{ maxWidth:375, width:"90%", mx:"auto"}}>
                <CardHeader title="Reset Password"/>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                            <TextField autoComplete="off" id="password" type={showPassword? "text":"password"} label="Password"
                            placeholder="Enter Ypur new Password"
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

                            <Box sx={{position:"relative"}}>    
                                <Button variant="contained" disabled={loading} type="submit" sx={{width:"100%"}}>Reset Password</Button>
                            </Box>
                            {
                                loading && (
                                    <CircularProgress size={24} sx={{
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
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default ResetPasswordForm
