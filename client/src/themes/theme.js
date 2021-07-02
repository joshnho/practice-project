import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    textFields: {
      fontSize: 25
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
      fontSize: "18px",
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: {
      main: "#B0B0B0",
      white: "#FFFFFF",
      gradient: "#86B9FF",
    }
  }
});
