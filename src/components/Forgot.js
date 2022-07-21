import { useFormik } from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
const Forgot = ()=>{

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
        <div className="card form--card">
            <h2 className="card--title">Forgot Password?</h2>
            <form onSubmit={formik.handleSubmit} className= "form flex">
            <div className="form--element flex">
                    <label htmlFor="email">Email</label>
                    <input 
                    id="email"
                    type="text"
                    placeholder="Enter your registered email address"
                    {...formik.getFieldProps('email')}
                    />

                    {formik.touched.email && formik.errors.email? (
                        <span className="error">{formik.errors.email}</span>
                    ) :null}
                </div> 
                <div className="form--element flex">
                    <button className="btn btn--submit" type="submit">Reset</button>
                </div>
                <div className="form--texts flex">
                    <Link to="/login" className="accent--text" replace={true}>Back to Login</Link>
                </div>
            </form> 
        </div>
    )
}

export default Forgot