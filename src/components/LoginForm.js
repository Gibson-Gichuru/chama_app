import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Store } from 'react-notifications-component';
import { NotificationSettings } from "./Utils";
import { Notify } from "./Utils";
import { Link } from "react-router-dom";
const LoginForm = () =>{
    
   

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
                console.log(data)
            }).catch(error=>{
                
                switch (error.response.status) {
                    case 401:

                    Store.addNotification(NotificationSettings(
                        Notify(
                            "invalid username or password",
                            "warning"
                        )
                    ));
                        
                        break;
                    case 403:

                        Store.addNotification(NotificationSettings(
                           Notify(
                            "Account not Confirmed",
                            "warning"
                           )
                        ));
                        
                        break;
                    default:
                        break;
                }
            })
        }
    })


    return (

        <>  
           
            <div className="card form--card">
            <h2 className="card--title">Login</h2>
            <form onSubmit={formik.handleSubmit} className = "form flex">

                <div className="form--element flex">
                    <label htmlFor="email">Email</label>
                    <input 
                    id="email"
                    type="text"
                    placeholder="name@example.com"
                    {...formik.getFieldProps('email')}
                    />

                    {formik.touched.email && formik.errors.email? (
                        <span className="error">{formik.errors.email}</span>
                    ) :null}
                </div>  

                <div className="form--element flex">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        id="password"
                        placeholder="enter your password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password?(
                        <span className="error">{formik.errors.password}</span>
                    ):null}
                </div>

                <div className="form--element flex">
                    <button className="btn btn--submit" type="submit">Login</button>
                </div>

                <div className="form--texts flex">
                    <p className="text">
                        Don't have an account?
                        <Link to="/signup" className="accent--text" replace={true}>Sign up</Link>
                    </p>
                    <Link to="/forgot_password" className="accent--text" replace={true}>Forgot Password</Link>
                
                </div>

            </form>
        </div>
        </>
    )
}

export default LoginForm;