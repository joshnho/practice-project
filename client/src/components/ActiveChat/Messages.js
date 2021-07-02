import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

// CSS to hide scrollbar
import "../../static/css/messages.css"

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxHeight: "70vh",
    overflow: "auto",
  },
}))

const Messages = ({ messages, otherUser, userId }) => {
  const classes = useStyles()
  return (
    <Box className={`${classes.root} messages-container`}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} message={message} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
