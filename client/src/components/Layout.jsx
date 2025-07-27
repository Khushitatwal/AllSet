// src/components/Layout.jsx
import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Navbar />
        <Box sx={{ padding: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
