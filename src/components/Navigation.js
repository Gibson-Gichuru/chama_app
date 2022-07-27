import {useState} from "react";

import { 
    AppBar,
    Toolbar,
    List,
    Button,
    Drawer,
    Box,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
   } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

const Nav = ()=> {

    const drawerWidth =240;

    const [toggle, setToggle] = useState(false)

    const navItems = ["home", "about", "contacts"]
    const handleDrawerToggle = () =>{

        setToggle(!toggle)
      
    }

    const drawer = (

        <Box>
            <Typography variant="h5" sx={{ my:2 }}>Chama App</Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>
    )

    const container = window !== undefined ? () => window.document.body : undefined;

    return (

        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Chama App
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                    ))}
                </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                container={container}
                variant="temporary"
                open={toggle}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
            </Box>
        </Box>
        
    )
}


export default Nav;