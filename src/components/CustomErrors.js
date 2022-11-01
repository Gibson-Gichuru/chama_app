import { 
    Typography,
    Box
} from "@mui/material"

const CustomErrors = ({message, children})=>{

    return (
        <Box>
            <Typography variant="body1">{message}</Typography>
        </Box>
    )
}

export default CustomErrors