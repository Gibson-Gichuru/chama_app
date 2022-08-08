
import { 
    AppBar,
    Toolbar,
    Container,
    Typography,
    IconButton,

} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Nav = ()=> {

    return (

        <AppBar position="static" component="header">
            <Container maxWidth="lg">
                <Toolbar component="nav">
                    <Typography variant="body2" sx={{ letterSpacing:2, fontWeight:700, fontSize:18}}>Chama App</Typography>
                    <IconButton size="large" sx={{display:{xs:"flex", sm:"none"}, ml:"auto"}}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
        
    )
}

export default Nav;