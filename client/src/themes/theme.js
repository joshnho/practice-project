import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    fontWeight: "bold",
    textFields: {
      fontSize: 25
    },
    homeHeader: {
      fontSize: 20,
    },
    activeChat: {
      msgDetails: 11
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
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
    },
    activeChat: {
      offlineDot: "#D0DAE9",
      onlineDot: "#1CED84",
      ellipsis: "#95A7C4",
      inputBg: "#F4F6FA",
      msgDetails: "#BECCE2",
    }
  }
});
