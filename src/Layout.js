import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AboutPage from './AboutUsContent'; // Import your AboutPage component
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import "./Layout.css"

function Layout({ children }) {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <div>
            <AppBar position="fixed"  className='navbg'>
     
                <Toolbar>
                <Typography>
              
                    <img src="https://cdn.dribbble.com/users/1299339/screenshots/9733418/media/a1c0226b0562afdab5eda26708de2529.gif" alt="hello" style={{height:"39px", width:"50px",borderRadius:"50%"  }}/>
              
                    </Typography>
                    
                    <Typography style={{marginLeft:"5px"}}>
                        React Markdown
                    </Typography>
                    
                    <div style={{ flexGrow: 1 }} />
                    
                    <Button component={Link} to="/" color="inherit" sx={{ mx: 1, display: { xs: 'none', md: 'block' } }}>
                    <HomeIcon/>
                       About
                    </Button>
                   
                    <Button component={Link} to="/login" color="inherit" sx={{ mx: 1, display: { xs: 'none', md: 'block' } }}>
                    <LoginIcon/>
                        Login
                    </Button>
                   
                    <Button component={Link} to="/register" color="inherit" sx={{ mx: 1, display: { xs: 'none', md: 'block' } }}>
                    <AppRegistrationIcon/>
                        Register
                    </Button>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
                <List>
                    <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
                       About
                    </ListItem>
                    <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
                        Login
                    </ListItem>
                    <ListItem button component={Link} to="/register" onClick={handleDrawerClose}>
                        Register
                    </ListItem>
                </List>
            </Drawer>
            <Container maxWidth="md" sx={{ mt: 12 }}>
                {children}
            </Container>
           
        </div>
    );
}

export default Layout;
