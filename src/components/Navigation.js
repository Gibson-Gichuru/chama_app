
import { 
    AppBar,
    Toolbar,
    Container,
    Typography,
    IconButton,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import { navigationLinks } from "../data/navdata";
import {useState} from "react";

const Nav = ()=> {

    const [open, setOpen] = useState(false);
    const handleDrawer = ()=> setOpen(!open)
    return (
        <>
            <AppBar position="static" component="header">
                <Container maxWidth="lg">
                    <Toolbar component="nav">
                        <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700,}}>Chama App</Typography>
                        <Box sx={{mx:"auto" ,display:"flex", gap:3}}>
                            {navigationLinks.map((item, index)=>(
                                <Button variant="string" color="inherit" component={Link} to={`/${item.title.toLowerCase()}`} key={index} sx={{display:{xs:"none", sm:"block"}}}>{item.title}</Button>
                            ))}
                        </Box>
                        <IconButton size="large" sx={{display:{xs:"flex", sm:"none"}, ml:"auto"}} onClick={handleDrawer}>
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer sx={{display:{sm:"none"}}} open={open} onClose={handleDrawer} anchor="right">
                <Box sx={{p:2, display:"flex", flexDirection:"column", width:300}}>
                    <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700, alignSelf:"center",py:2}}>Chama App</Typography>
                    <Divider/>
                    <List sx={{backgroundColor:"error"}}>
                        {navigationLinks.map((item,index)=>(
                            <ListItem key={index} onClick={handleDrawer} sx={{cursor:"pointer"}}>
                                <ListItemText component={Link} to={`/${item.title.toLowerCase()}`} >{item.title}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Nav;