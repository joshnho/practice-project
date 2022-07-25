import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { theme } from "../themes/theme";
import { Grid, Box, Typography, Paper, Button } from "@material-ui/core";
import Login from "./Signin/LoginForm";
import SignupForm from "./Signin/SignupForm";
import bgImg from "../static/images/bg-img.png";
import chatBubbleImg from "../static/images/bubble.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  image: {
    backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, .85), rgba(134, 185, 255, 0.85)),
    url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
  },
  imageTextContainer: {
    color: theme.palette.secondary.white,
    textAlign: "center",
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
    gap: "60px",
    width: "50%"
  },
  bubbleIcon: {
    width: "30%",
    alignSelf: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(8),
    flexWrap: "wrap",
  },
  headerText: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(5),
  },
  headerButton: {
    backgroundColor: theme.palette.secondary.white,
    fontSize: theme.spacing(2),
    width: "13em",
    height: "4em",
    color: theme.palette.primary.main,
    boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.white,
    },
  },
  headerLink: {
    display: "none",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    // paddingLeft: theme.spacing(10),
    marginTop: theme.spacing(14),
    gap: "20px",
    alignSelf: "center",
    width: "80%",
  },
  formTitle: {
    fontSize: theme.typography.formTitle.fontSize,
    fontWeight: theme.typography.fontWeight,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  textFields: {
    width: "75%",
    fontSize: theme.typography.textFields.fontSize,
  },
  submitButton: {
    width: "10em",
    height: "4em",
    fontSize: theme.typography.button.fontSize,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    alignSelf: "center"
  },

  "@media screen and (max-width: 600px)": {
    image: {
      display: "none",
    },
    formTitle: {
      alignSelf: "center"
    },
    formContainer: {
      marginTop: theme.spacing(1),
    },
    header: {
      width: "13em",
    },
    headerButton: {
      display: "none",
    },
    headerLink: {
      display: "inline",
      color: theme.palette.primary.main,
      cursor: "pointer",
      textDecoration: "underline",
    },
    headerText: {
      marginRight: theme.spacing(1),
    },
  },
}));

const Signin = ({ user, location }) => {
  const [hasAccount, setHasAccount] = useState(false);
  const classes = useStyles(theme);

  useEffect(() => {
    if (location?.state?.hasAccount) {
      // If we were previously logged in, redirect to login instead of register
      setHasAccount(location.state.hasAccount);
    }
  }, [location?.state?.hasAccount]);

  const handleClick = () => {
    setHasAccount(!hasAccount);
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <Grid container className={classes.root}>
      <Grid item sm={4} md={5} className={classes.image}>
        <Box className={classes.imageTextContainer}>
          <img
            src={chatBubbleImg}
            alt='chat-bubble'
            className={classes.bubbleIcon}
          />
          <Typography variant='h4'>
            Converse with anyone with any language
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6}>
        <Box className={classes.paper}>
          <Box className={classes.header}>
            <Typography className={classes.headerText}>
              {hasAccount
                ? "Don't have an account?"
                : "Already have an account?"}
            </Typography>
            <Button
              variant='contained'
              className={classes.headerButton}
              onClick={handleClick}
            >
              {hasAccount ? "Create an account" : "Login"}
            </Button>
            <Typography 
              className={classes.headerLink}
              onClick={handleClick}
            >
              {hasAccount ? "Create an account" : "Login"}
            </Typography>
          </Box>
          {hasAccount ? (
            <Login classes={classes} />
          ) : (
            <SignupForm classes={classes} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Signin);
