import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { readMessages } from "../../store/conversations";


const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadCount: {
    fontWeight: "semibold",
    color: "#FFFFFF",
    backgroundColor: "#3A8DFF",
  },
};

const Chat = ({ setActiveChat, classes, conversation, user, readMessages }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
    await readMessages(conversation.id, user.id)
    setUnreadCount(0);
  };

  useEffect(() => {
    setUnreadCount(conversation.messages.filter((message) => {
      return message.senderId === conversation.otherUser.id && message.read === false;
    }).length);
  }, [conversation]);

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={conversation.otherUser.photoUrl}
        username={conversation.otherUser.username}
        online={conversation.otherUser.online}
        sidebar={true}
      />
      <ChatContent hasUnreadMsgs={unreadCount > 0} conversation={conversation} />
      {unreadCount > 0 && (
        <Chip label={unreadCount} className={classes.unreadCount} />
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessages: (convoId, userId) => {
      dispatch(readMessages(convoId, userId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
