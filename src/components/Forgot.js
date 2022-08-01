import { useFormik } from "formik";
import * as Yup from "yup";
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

const Forgot = ({changeIndex})=>{

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

            onSubmit:  async values=>{

            }
        }
    )


    return (
        <Card variant="outlined" sx={{ maxWidth:375, width:"90%", mx:"auto"}}>
            <CardHeader title="Forgot Passswrd"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                        <TextField 
                        id="email"
                        type="email"
                        value={formik.values.email}
                        label="Email Address"
                        placeholder="Enter your account email address"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}/>
                        <Button 
                        variant="contained" 
                        type="submit" sx={{backgroundColor:"primary"}}>Send Reset Request</Button>
                        <Box 
                        component="div" 
                        sx={{ display:"flex", flexDirection:"column",justifyContent:"space-around", alignItems:"center"}}>
                            <Typography 
                            variant="body2" 
                            component="div" 
                            sx={{ml:1, fontSize:12, cursor:"pointer"}}
                            onClick={
                                ()=>changeIndex(0)
                            }>
                                Back To Login
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </CardContent>
        </Card>
    )
}

export default Forgot