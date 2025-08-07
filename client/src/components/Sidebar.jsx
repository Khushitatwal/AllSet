import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Plans", icon: <AssignmentIcon />, path: "/plans" },
  { text: "Tasks", icon: <ListAltIcon />, path: "/tasks" },
  { text: "Schedule", icon: <EventNoteIcon />, path: "/schedule" },
];

const Sidebar = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.firstName) {
      setFirstName(storedUser.firstName);
    }
    setUser(storedUser);
  }, []);

  const handleClick = (item) => {
    onClose();

    if (item.text === "Home" || user) {
      navigate(item.path);
    } else {
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{ width: 250, p: 2 }}>
          {firstName && (
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Typography variant="subtitle1">{firstName}</Typography>
            </Box>
          )}
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.text}
                to={item.path}
                onClick={() => handleClick(item)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          onClose={() => setAlertOpen(false)}
          sx={{ width: "100%" }}
        >
          Please login to access this section.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Sidebar;
