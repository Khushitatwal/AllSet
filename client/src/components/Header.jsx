import {
  Divider,
  IconButton,
  Toolbar,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/Logo.png";
import AuthForm from "./AuthForm";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function Header() {
  const [user, setUser] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpen = () => setShowAuthForm(true);
  const handleClose = () => setShowAuthForm(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: (theme) => theme.zIndex.appBar,
          bgcolor: "#e3ebf3",
        }}
      >
        <Toolbar disableGutters sx={{ px: "15vw" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 30, ml: 1 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box display={"flex"} alignItems="center" gap={2}>
            {!user ? (
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Login / Signup
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
        <Divider />
      </Box>
      <Toolbar />
      <Modal open={showAuthForm} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: { xs: 200, sm: 400 },
          }}
        >
          <AuthForm
            onClose={handleClose}
            onLoggedin={(data) => {
              setUser(data);
              window.location.reload();
            }}
          />
        </Box>
      </Modal>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </>
  );
}

export default Header;
