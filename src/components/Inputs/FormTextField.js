import {
    TextField,
}from "@mui/material";

export default function FormTextField({properties}){

    return (
        <TextField 
        name={properties.name} 
        id={properties.id}
        type={properties.name}
        inputProps={{"data-testid":properties.testid}}
        value={properties.value}
        onChange={properties.onChange}
        errors={properties.errors}
        helperText={properties.helperText}
        {...properties.extras}/>
    )
}