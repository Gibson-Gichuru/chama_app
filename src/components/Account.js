import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TabContent from "./TabContent";

import {v4 as uuid} from "uuid";

import {useState} from "react";
import {green} from "@mui/material/colors";
import {useFormik} from "formik";

import * as Yup from "yup";
function Account() {


  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = ()=> setShowPassword(!showPassword)

  const [loading, setLoading] = useState(false)

  const handleLoading = (status)=>setLoading(prev_status=> prev_status = status)

  let formGroup = {display:"flex", gap:1, justifyContent:"space-between"}

  
  const formik = useFormik(

    {
      initialValues:{
        email:"",
        username:"",
        phonenumber:"",
        password:"",
        confirmPassword:"",
      },

      validationSchema: Yup.object(
        {
          email:Yup.string().email("Invalid Email"),
          password:Yup.string().matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 
          "Password Should Contain atleast one number and one special character"),
          confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "password must match"),
          username:Yup.string().min(3,"Username needs to more than 3 letters long"),
          phonenumber: Yup.string().matches(/^(?:254|\+254|0)?(7(?:(?:[129][0–9])|(?:0[0–8])|(4[0–1]))[0–9]{6})$/,"invalid phone format, (use 07... format or 254.. format)"),

        }
      ),

      onSubmit: async (values, {setErrors})=>{

      }
    }

  )

  return (

    <TabContent>
      <Typography variant ="h5" sx={{p:2, mb:2}}>User Account Details</Typography>
        <form onSubmit={formik.handleSubmit}>

          <Box sx = {{display:"flex", flexDirection:"column", gap:1, px:1}}>
             <TextField sx = {{width:"100%"}} autoComplete="off" id="email" type="email"
             placeholder="johnDoe@example.com" label="Email" value = {formik.values.email}
             onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)}
             helperText={formik.touched.email && formik.errors.email}
             {...formik.getFieldProps('email')}/>

             <Box sx={{...formGroup}}>
                <TextField autoComplete="off" id="username"  type="text" label="Username"
                  placeholder="johnDoe" value={formik.values.username}
                  onchange={formik.handleChange} error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  {...formik.getFieldProps('username')}/>

                  <TextField autoComplete="off" id="phonenumber" type="text" label="Phonenumber"
                  placeholder="254/700000000" value={formik.values.username}
                  onchange={formik.handleChange} error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                  helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                  {...formik.getFieldProps('phonenumber')}/>
             </Box>

             <TextField autoComplete="off" id="password"  type={showPassword? "text":"password"} label="Password"
                placeholder="Change Your Password" value={formik.values.username}
                onchange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
                InputProps = {{

                  endAdornment:<InputAdornment position="end">
                      <IconButton arial-label="toggle password visibility" onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff/>:<Visibility/>}
                      </IconButton>
                  </InputAdornment>
                }}/>

                <TextField autoComplete="off" id="confirmPassword"  type={showPassword? "text":"password"} label="Confirm Password"
                  placeholder="Confirm Your Password" value={formik.values.username}
                  onchange={formik.handleChange} error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  {...formik.getFieldProps('confirmPassword')}/>

              <Box sx = {{ position:"relative"}}>
                  <Button variant="contained" disabled= {loading} type="submit" sx={{width:"100%"}}>Update Account</Button>
                  {
                      loading && (
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

          </Box>

        </form>
    </TabContent>
  )
}

export default Account