// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Checklist";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <List>
      <ListItem button key="Home">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
    </List>
  );

  return (
    <>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>
      <Toolbar>
        <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};

export default Sidebar;
