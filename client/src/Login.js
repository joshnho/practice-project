import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../src/themes/theme.js";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import bgImg from "./static/images/bg-img.png";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  image: {
    backgroundImage: `linear-gradient(to bottom, rgba(56, 139, 255, 0.65), rgba(134, 185, 255, 0.85)),
    url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },


  // imageTextContainer: {
  //   display: "flex",
  //   justifyContent: "center",
  // },
  // imageText: {
  //   color: "white",
  //   fontSize: "40px",
  //   width: "70%",
  //   textAlign: "center",
  // },

  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    marginLeft: "10px",
    paddingRight: "70px",
    flexWrap: "wrap",
  },
  headerText: {
    color: "rgba(180, 180, 180, 1)",
    marginRight: "50px",
  },
  headerButton: {
    backgroundColor: "white",
    fontSize: "17px",
    width: "15em",
    height: "4em",
    color: "#3A8DFF",
    boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
    "&:hover": {
      backgroundColor: "#86B9FF !important",
      color: "#FFFFFF !important",
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "8%",
    marginLeft: "10%",
    paddingRight: "10%",
    gap: "20px",
  },
  formTitle: {},
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  textFields: {
    width: "75%",
    fontSize: "25px",
  },
  submitButton: {
    width: "10em",
    height: "4em",
    fontSize: "18px",
    marginTop: "20px",
    marginLeft: "15%",
  },
}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles(theme);
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={5} className={classes.image} />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Box container item className={classes.header}>
            <Typography className={classes.headerText}>
              Don't have an account?
            </Typography>
            <Button
              variant='contained'
              className={classes.headerButton}
              onClick={() => history.push("/register")}
            >
              Create Account
            </Button>
          </Box>
          <form onSubmit={handleLogin} className={classes.formContainer}>
          <Typography className={classes.formTitle}>
            <Box fontSize='h3.fontSize' fontWeight='bold'>
              Welcome back!
            </Box>
          </Typography>
          <Grid className={classes.form}>
            <FormControl
              margin='normal'
              className={classes.textFields}
              required
            >
              <TextField
                aria-label='username'
                label='Username'
                name='username'
                type='text'
                InputProps={{
                  classes: {
                    input: classes.textFields,
                  },
                }}
              />
            </FormControl>
            <FormControl
              margin='normal'
              className={classes.textFields}
              required
            >
              <TextField
                label='Password'
                aria-label='password'
                type='password'
                name='password'
                InputProps={{
                  classes: {
                    input: classes.textFields,
                  },
                }}
              />
            </FormControl>
            <Button
              className={classes.submitButton}
              color='primary'
              type='submit'
              variant='contained'
              size='large'
            >
              Login
            </Button>
          </Grid>
        </form>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
