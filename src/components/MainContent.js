import { useAuth } from "../context/AuthContext";
import {
    Typography,
    Box,
    Container
} from "@mui/material";
import Forms from "../pages/Forms";
const Main = ()=>{

    const {access, isExpired} = useAuth()

    return (

        <Box sx={{ py:3}}>
            <Container maxWidth="lg">
                {access || !isExpired? (
                    <Typography variant="body2">Main Content</Typography>
                ): (
                    <Forms/>
                )}
            </Container>
        </Box>
    )
}

export default Main