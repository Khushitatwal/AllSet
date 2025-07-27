// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6">Smart Study Scheduler</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
