import Main from "./MainContainer";
import {
    Typography,
    Box,
} from "@mui/material";

const NavItem = ({item})=>{

    return (
        <Main>
            <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700}}>{item.title}</Typography>
            <Box sx={{maxWidth:500}}>

            </Box>
        </Main>
    )
}

export default NavItem;