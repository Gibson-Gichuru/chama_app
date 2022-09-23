// TextField Component Testing

import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";

import FormTextField from "../../components/Inputs/FormTextField";

import {Formik} from "formik";

import * as Yup from "yup";

describe("<FormTextField> component testing",  ()=>{

    let wrapper;

    beforeEach(()=> wrapper = render(
        <Formik
                initialValues={{email:""}}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email("Invalid").required("Required!")
                    })
                }
            >
                {formik=>{

                    const properties = {
                        name:"email",
                        id:"email",
                        testid:"emailTestId",
                        value:formik.values.email,
                        onChange:formik.handleChange,
                        error: formik.touched.email && Boolean(formik.errors.email),
                        helperText: formik.touched.email && formik.errors.email,
                        extras:{...formik.getFieldProps('email')}
                    }
                    return <FormTextField properties = {properties}/>
                }}
            </Formik>))


    it("Errors out on invalid user input", async ()=>{
        
        // get the textfield and type in it

        let textField = screen.getByTestId('emailTestId')

        fireEvent.change(textField, {target:{value:"somerandomtext"}})

        fireEvent.blur(textField)
        
        const errorContainer = await screen.findByText("Invalid");

        await waitFor(()=>{
            expect(errorContainer.innerHTML).toContain("Invalid")
        })
        
    })

    it("Errors out when a user blurs on an input that requires input", async ()=>{

        let textField = screen.getByTestId('emailTestId')

        fireEvent.blur(textField)

        const errorContainer = await screen.findByText("Required!")

        await waitFor(()=>{

            expect(errorContainer.innerHTML).toContain("Required!")
        })
    })
})