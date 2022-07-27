import {useState} from "react";

import { 
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Tooltip,
    Button,
    Typography,
    IconButton,
    Box,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    useTheme
} from "@mui/material/styles";

const pages = ['Home', "About", "Contacts", "Faqs"]
const settings = ["Profile", "Account", "Dashbord", "Logout"]

const Nav = ()=> {

    const theme = useTheme()
        // navigation anchor state
    const [anchorNav, setAnchorNav] = useState(null) 
    // user menu anchor state
    const [anchorUser, setAnchorUser] = useState(null) 

    // menu open and close event handlers
    const handleOpenNavMenu = (event)=>{
        setAnchorNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event)=>{
        setAnchorUser(event.currentTarget)
    }

    const handleCloseNavMenu = ()=>{
        setAnchorNav(null)
    }
    const handleCloseUserMenu = ()=>{
        setAnchorUser(null)
    }

    return (

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="a" href="/"
                        sx={{mr:2, display:{xs:'none', md:'flex'},fontWeight:700, letterSpacing: ".3rem",color:`${theme.secondary}`,textDecoration:"none"}}>
                        Chama App
                    </Typography>
                    <Box sx={{flexGrow:1,display:{ xs:"flex", md:"none"}}}>
                        <IconButton size="large" arial-label="Account for current user" arial-controls="menu-appbar" arial-haspopup="true" onClick={handleOpenNavMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorNav} anchorOrigin={{vertical:"bottom",horizontal:"left"}} keepMounted open={Boolean(anchorNav)}
                            transformOrigin={{vertical: 'top',horizontal: 'left',}}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display:{xs:"block", md:"none"}
                            }}>
                            {
                                pages.map(
                                    page=> (
                                        <MenuItem key={page} onclick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    )
                                )
                            }
                        </Menu>
                    </Box>

                    <Typography variant="h5" noWrap component="a" href=""
                        sx={{mr:2, display:{xs:"flex", md:"none"}, flexGrow:1, fontWeight:700,letterSpacing:".3rem",textDecoration:"none",color:`${theme.secondary}`,}}>
                        Chama App
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                    <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>))}
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="current user" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorUser} anchorOrigin={{vertical: 'top',horizontal: 'right' }} keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'right',}} open={Boolean(anchorUser)} onClose={handleCloseUserMenu}>
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        
    )
}

export default Nav;