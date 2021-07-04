import React, { useState, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { connect } from "react-redux";
import { Box, makeStyles } from "@material-ui/core";
import { updateReadStatus } from "../../store/utils/thunkCreators";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxHeight: "70vh",
    overflow: "auto",
  },
  messageWindow: {
    // Hide scrollbars for chrome
    "&::-webkit-scrollbar": {
      display: "none"
    },
    // Hide scrollbars IE 10+, Edge 64, Firefox
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  },
}));

const Messages = ({ userId, conversation, conversation: { messages, otherUser }, updateReadStatus }) => {
  const [atBottom, setAtBottom] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    if (atBottom === true) {
      if (conversation) {
        updateReadStatus(conversation, userId);
      };
    };
  }, [updateReadStatus, conversation, atBottom, userId])

  return (
    <Box className={classes.root}>
      <ScrollableFeed
        className={classes.messageWindow}
        onScroll={isAtBottom => setAtBottom(isAtBottom)}
      >
        {messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble key={message.id} message={message} time={time} />
          ) : (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
          );
        })};
      </ScrollableFeed>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReadStatus: (message) => {
      dispatch(updateReadStatus(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
