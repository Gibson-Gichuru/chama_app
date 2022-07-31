import { useAuth } from "../context/AuthContext";
import {
    Typography,
    Box,
    Container
} from "@mui/material";
import LoginForm from "./LoginForm";
const Main = ()=>{

    const {access, isExpired} = useAuth()

    return (

        <Box sx={{ py:3}}>
            <Container maxWidth="lg">
                {access || !isExpired? (
                    <Typography variant="body2">Main Content</Typography>
                ): (
                    <Box sx={{
                        height:"100vh",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <LoginForm/>
                    </Box>  
                )}
            </Container>
        </Box>
    )
}

export default Main