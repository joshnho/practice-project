import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { theme } from "../../themes/theme";

const useStyles = makeStyles((theme) => ({
  // ActiveChat component root styling
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    maxHeight: "100%",
    marginRight: theme.spacing(2),
  },
  chatContainer: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

const ActiveChat = ({ user, conversation, updateReadStatus }) => {
  const classes = useStyles(theme);

  return (
    <Box className={classes.root}>
      {conversation?.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              conversation={conversation}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
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

export default connect(mapStateToProps, null)(ActiveChat);
