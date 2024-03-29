import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const ChatContent = ({ conversation: { latestMessageText, otherUser }, hasUnreadMsgs }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: 20,
      flexGrow: 1,
    },
    username: {
      fontWeight: "bold",
      letterSpacing: -0.2,
    },
    previewText: {
      fontSize: 12,
      color: hasUnreadMsgs ? "black" : "#9CADC8",
      letterSpacing: -0.17,
      fontWeight: hasUnreadMsgs ? "bold" : "normal",
    },
    notification: {
      height: 20,
      width: 20,
      backgroundColor: "#3F92FF",
      marginRight: 10,
      color: "white",
      fontSize: 10,
      letterSpacing: -0.5,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
  }));
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
