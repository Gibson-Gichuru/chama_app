import Notifications from "./Notify";
import {
    Box,
    Container
} from "@mui/material";

const Main = ({children})=>{

    return (

        <Box sx={{ py:3}}>
            <Container maxWidth="lg">
               {children}
            </Container>
            <Notifications/> 
        </Box>
    )
}

export default Main