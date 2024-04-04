import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu, House, Create, Folder, Logout } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { LogOut } from "../Auth/LogOut";


function NavBar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar position="fixed" style={{ background: "linear-gradient(90deg, rgba(190,59,134,1) 12%, rgba(111,37,147,1) 56%, rgba(22,133,25,1) 100%)" }}>
        <Toolbar>
          <Typography>
            <img src="https://assets-v2.lottiefiles.com/a/b3202668-1151-11ee-939e-cf25d6aad422/LXZKuNhIQ5.gif" alt="hello" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
          </Typography>
          <Typography style={{ marginLeft: "5px" }}>
            React Markdown
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/dashboard/home" sx={{ display: { xs: 'none', md: 'block' } }}>
            <House /> Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/create" sx={{ display: { xs: 'none', md: 'block' } }}>
            <Create /> Create Project
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/get" sx={{ display: { xs: 'none', md: 'block' } }}>
            <Folder /> My Projects
          </Button>
          <Button color="inherit" onClick={LogOut} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Logout /> Logout
          </Button>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={Link} to="/dashboard/home" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/create" onClick={handleDrawerClose}>
            <ListItemText primary="Create Project" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/get" onClick={handleDrawerClose}>
            <ListItemText primary="My Projects" />
          </ListItem>
          <ListItem button onClick={LogOut}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;


