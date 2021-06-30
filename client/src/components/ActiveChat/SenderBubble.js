import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  msgDetails: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = ({ time, message }) => {
  const classes = useStyles();
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
