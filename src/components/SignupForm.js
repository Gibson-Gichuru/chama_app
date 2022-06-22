import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import { NotificationSettings } from "./Utils";

const Signup = ()=>{

    const navigate = useNavigate();

    const form = useFormik({
    
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
                    // Show the success message 
                    // navigate to the login page
                    Store.addNotification(
                        NotificationSettings(
                            "Account",
                            "Account Created!",
                            "success"
                        )
                    )
                    navigate("login")
                }
            ).catch(
                error=>{
                    console.log(error)
                }
            )
        }
    
    })

    return (
    <>

        <div className="card form--card">
            <h2 className="card--title">Sign Up</h2>
            <form onSubmit={form.handleSubmit} className = "form flex">

                <div className="form--element flex">
                    <label htmlFor="username">Username</label>
                    <input 
                    id="username"
                    type="text"
                    placeholder="your prefered profile username"
                    {...form.getFieldProps('username')}

                    />

                    {form.touched.username && form.errors.username? (
                        <span className="error">{form.errors.username}</span>
                    ) :null}
                </div>  

                <div className="form--element flex">
                    <label htmlFor="email">Email</label>
                    <input 
                    id="email"
                    type="text"
                    placeholder="name@example.com"
                    {...form.getFieldProps('email')}

                    />

                    {form.touched.email && form.errors.email? (
                        <span className="error">{form.errors.email}</span>
                    ) :null}
                </div>  

                <div className="form--element flex">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        id="password"
                        placeholder="enter your password"
                        {...form.getFieldProps('password')}
                    />
                    {form.touched.password && form.errors.password?(
                        <span className="error">{form.errors.password}</span>
                    ):null}
                </div>


                <div className="form--element flex">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" 
                        id="confirmPassword"
                        placeholder="confirm your password"
                        {...form.getFieldProps('confirmPassword')}
                    />
                    {form.touched.password && form.errors.confirmPassword?(
                        <span className="error">{form.errors.confirmPassword}</span>
                    ):null}
                </div>

                <div className="form--element flex">
                    <button className="btn btn--submit" type="submit">Sign up</button>
                </div>

                <div className="form--texts flex">
                    <p className="text">
                        Aready have an account?
                        <span className="accent--text">Login</span>
                    </p>
                </div>
            </form>
        </div>
    </>
    
    )
}

export default Signup