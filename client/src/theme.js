import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // switch to "dark" if needed
    primary: {
      main: "#351402ff",
    },
    secondary: {
      main: "#e7d6c8ff",
    },
    background: {
      default: "#fbf2ebff",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#e7d6c8ff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#451a03ff",
        },
      },
    },
  },
});

export default theme;
