import { useFormik } from "formik";
import * as Yup from 'yup';


const Signup = ()=>{

    const form = useFormik({
    
        initialValues:{
            email:"",
            password:"",
            confirmPassword: "",
        },

        validationSchema: Yup.object(
            {
                email: Yup.string().email("Invalid Email").required("required"),
                password: Yup.string().required("required")
                .min(8, "Password is too short-should be 8 char min")
                .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 
                        "password should contain atleast one number and one special character"),

                confirmPassword: Yup.string()
            }
        ),

        onSubmit : values =>{

        }
    
    })

    return (
    <>

        <div className="card form--card">
            <h2 className="card--title">Sign Up</h2>
            <form onSubmit={form.handleSubmit} className = "form flex">

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
                    <button className="btn btn--submit">Sign up</button>
                </div>

            </form>
        </div>
    </>
    
    )
}

export default Signup