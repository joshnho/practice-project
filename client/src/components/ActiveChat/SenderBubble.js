import React from "react";
import { theme } from "../../themes/theme";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  msgDetails: {
    fontSize: theme.typography.activeChat.msgDetails,
    color: theme.palette.activeChat.msgDetails,
    fontWeight: theme.typography.activeChat.fontWeight,
    marginBottom: theme.spacing(2)
  },
  text: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: theme.spacing(1),
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = ({ time, message }) => {
  const classes = useStyles(theme);

  return (
    <Box className={classes.root}>
      <Typography className={classes.msgDetails}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{message.text}</Typography>
      </Box>
      <Typography className={classes.msgDetails}>{message.read && 'read'}</Typography>
    </Box>
  );
};

export default SenderBubble;
