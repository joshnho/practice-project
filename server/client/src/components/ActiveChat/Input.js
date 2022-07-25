import React, { useState } from "react";
import { theme } from "../../themes/theme";
import { FormControl, FilledInput, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(theme => ({
  root: {
    justifySelf: "flex-end",
    marginTop: theme.spacing(2),
  },
  input: {
    height: 70,
    backgroundColor: theme.palette.activeChat.inputBg,
    borderRadius: 8,
    marginBottom: theme.spacing(2)
  },
}))

const Input = ({ otherUser, conversationId, user, postMessage }) => {
  const [text, setText] = useState("")
  const classes = useStyles(theme)

  const handleChange = (e) => {
    setText(e.target.value,)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: e.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setText("")
  };
    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
        </FormControl>
      </form>
    );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
