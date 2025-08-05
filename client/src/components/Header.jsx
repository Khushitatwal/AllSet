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

function Header() {
  const [user, setUser] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleOpen = () => setShowAuthForm(true);
  const handleClose = () => setShowAuthForm(false);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(localStorage.getItem);
    setUser(null);
  };

  return (
    <>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit">
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
            <>
              <Typography sx={{ fontFamily: "inherit" }}>
                Welcome, {user.firstName} !
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      <Divider />
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
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Header;
