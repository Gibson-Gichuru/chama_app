
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
    Divider,
    Menu,
    MenuItem
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from "react-router-dom";
import { navigationLinks } from "../data/navdata";
import {useState} from "react";
import { useAuth } from "../context/AuthContext";
import { Hidden } from "./Protected";

const Nav = ()=> {

    const [open, setOpen] = useState(false);
    const handleDrawer = ()=> setOpen(!open)

    const [anchorElement, setAchorElement] = useState(null);

    const handleOpenMenu = (event)=>setAchorElement(event.currentTarget);

    const handleCloseMenu = ()=>setAchorElement(null);

    const handleMenuItemClicked = (Item)=>{
        handleCloseMenu()
        if(Item.action){
            Item.action()
        }   
    }

    const {logOut} = useAuth()

    const profileMenuItems = [
        {
            title:"Account",
            action:null
        },
        {
            title:"Logout",
            action:logOut
        }
    ]

    return (
        <>
            <AppBar position="static" component="header">
                <Container maxWidth="lg">
                    <Toolbar component="nav">
                        <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700, display:{xs:"none", sm:"block"}}}>Chama App</Typography>
                        <IconButton size="large" sx={{display:{xs:"flex", sm:"none", mr:"auto", color:"inherit"}}} onClick={handleDrawer}>
                            <MenuIcon/>
                        </IconButton>
                        <Box sx={{mx:"auto" ,display:{xs:"none", sm:"flex"}, gap:3}}>
                            {navigationLinks.map((item, index)=>(
                                <Button variant="string" color="inherit" component={Link} to={`/${item.title.toLowerCase()}`} key={index} >{item.title}</Button>
                            ))}
                        </Box>
                        {/* protected components */}
                        <Hidden>
                            <Box sx={{ ml:"auto",display:"flex", justifyContent:"space-around"}}>
                                <IconButton size="large" color="inherit" onClick ={handleOpenMenu}><AccountCircleIcon/></IconButton>                          
                                <IconButton size="large" color="inherit"><AccountCircleIcon/></IconButton>                          
                            </Box>
                            <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={handleCloseMenu}>
                                    {profileMenuItems.map((item, index)=>(
                                        <MenuItem key={index} onClick={()=>handleMenuItemClicked(item)}>{item.title}</MenuItem>
                                    ))}
                            </Menu>
                        </Hidden>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer sx={{display:{sm:"none"}}} open={open} onClose={handleDrawer}>
                <Box sx={{p:2, display:"flex", flexDirection:"column", width:300}}>
                    <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700, alignSelf:"center",py:2}}>Chama App</Typography>
                    <Divider/>
                    <List>
                        {navigationLinks.map((item,index)=>(
                            <ListItem key={index} onClick={handleDrawer} button dense component={Link} to={`/${item.title.toLowerCase()}`}>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Nav;