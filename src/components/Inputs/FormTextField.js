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
        error={properties.error}
        helperText={properties.helperText}
        {...properties.extras}/>
    )
}