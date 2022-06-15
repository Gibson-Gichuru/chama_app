import { useFormik } from "formik";
import * as Yup from "yup"
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

        onSubmit: values => {

            // Login the user via the auth context
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
                        <button className="btn btn--submit">Login</button>
                    </div>

                </form>
            </div>
            
        </>
    )
}

export default LoginForm;