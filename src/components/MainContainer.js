import Notifications from "./Notify";
import {
    Box,
    Container
} from "@mui/material";

const Main = ({children})=>{

    return (

        <Box>
             <Notifications/> 
            <Container sx={{py:3}} maxWidth="lg">
               {children}
            </Container>
        </Box>
    )
}

export default Main