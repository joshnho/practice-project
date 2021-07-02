import React, { useEffect, useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const styles = {
  root: {
    height: "95vh",
  },
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
const Home = ({ classes, user, fetchConversations, logout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const prevUser = usePrevious(user);

  useEffect(() => {
    if (user?.id !== prevUser?.id) {
      setIsLoggedIn(true);
    }
  }, [prevUser?.id, user?.id]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleLogout = async () => {
    await logout(user.id);
  };
  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            hasAccount: isLoggedIn,
          },
        }}
      />
    );
  }
  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component='main' className={classes.root}>
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
