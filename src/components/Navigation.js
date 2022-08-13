
import { 
    AppBar,
    Toolbar,
    Container,
    Typography,
    IconButton,
    Button,
    Box,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import { navigationLinks } from "../data/navdata";
const Nav = ()=> {
    return (

        <AppBar position="static" component="header">
            <Container maxWidth="lg">
                <Toolbar component="nav">
                    <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700}}>Chama App</Typography>
                    <Box sx={{mx:"auto" ,display:"flex", gap:3}}>
                        {navigationLinks.map((item, index)=>(
                            <Button variant="string" color="inherit" component={Link} to={`/${item.title.toLowerCase()}`} key={index} sx={{display:{xs:"none", sm:"block"}}}>{item.title}</Button>
                        ))}
                    </Box>
                    <IconButton size="large" sx={{display:{xs:"flex", sm:"none"}, ml:"auto"}}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
        
    )
}

export default Nav;