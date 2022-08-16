import { 
    AppBar,
    Toolbar,
    Container,
    Typography,
    IconButton,
    Tooltip,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Link,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CssBaseline from '@mui/material/CssBaseline';
import {Link as DomLink} from "react-router-dom";
import { navigationLinks } from "../data/navdata";
import {useState} from "react";
import { useAuth } from "../context/AuthContext";
import { Hidden } from "./Protected";

const drawerWidth = 240;

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
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="lg">
                    <Toolbar component="nav">
                        <Typography variant="h5" sx={{ letterSpacing:2, fontWeight:700,}}>Chama App</Typography>
                        
                        <Box sx={{mx:"auto" ,display:{xs:"none", sm:"flex"}, gap:3}}>
                            {navigationLinks.map((item, index)=>(
                                <Link variant="button" underline="hover" color="inherit" component={DomLink} to={`/${item.title.toLowerCase()}`} key={index} >{item.title}</Link>
                            ))}
                        </Box>
                        {/* protected components */}
                        <Hidden>
                            <Box sx={{ ml:"auto",display:"flex", justifyContent:"space-around"}}>
                                <Tooltip title="User Account">
                                    <IconButton size="large" color="inherit" onClick ={handleOpenMenu}><AccountCircleIcon/></IconButton>
                                </Tooltip>
                                <Tooltip title="notifications">
                                    <IconButton size="large" color="inherit"><NotificationsRoundedIcon/></IconButton> 
                                </Tooltip>                                      
                            </Box>
                            <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={handleCloseMenu}>
                                    {profileMenuItems.map((item, index)=>(
                                        <MenuItem key={index} onClick={()=>handleMenuItemClicked(item)}>{item.title}</MenuItem>
                                    ))}
                            </Menu>
                        </Hidden>
                        <IconButton size="large" sx={{display:{xs:"flex", sm:"none", marginLeft:"auto", color:"inherit"}}} onClick={handleDrawer}>
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer 
            sx={{width: drawerWidth, 
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }, 
            display:{sm:"none"}}} 
            open={open} 
            onClose={handleDrawer}>
                <Box sx={{p:2, display:"flex", flexDirection:"column",marginTop:4}}>
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