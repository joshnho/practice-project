import React, { useEffect } from "react";
import { theme } from "../../themes/theme";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import socket from "../../socket";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  usernameDate: {
    fontSize: theme.typography.activeChat.msgDetails,
    color: theme.palette.activeChat.msgDetails,
    fontWeight: theme.typography.activeChat.fontWeight,
    marginBottom: theme.spacing(2)
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    color: theme.palette.secondary.white,
    letterSpacing: -0.2,
    padding: theme.spacing(1)
  }
}));

const OtherUserBubble = ({ text, time, otherUser, conversation, user }) => {
  const classes = useStyles(theme);

  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(OtherUserBubble);
