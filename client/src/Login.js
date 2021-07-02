import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../src/themes/theme.js"
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import bgImg from "./static/images/bg-img.png"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",

  },
  image: {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  displayContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    padding: "10px",
  },

  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    paddingRight: "70px",
  },
  headerText: {
    color: "rgba(180, 180, 180, 1)",
    marginRight: "50px"
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
      color: "#FFFFFF !important"
    },

  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "8%",
    marginLeft: "10%",
    paddingRight: "10%",
    gap: "20px"
  },
  formTitle: {
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  textFields: {
    width: "75%",
    fontSize: "25px"
  },
  submitButton: {
    width: "7em",
    height: "3em",
    fontSize: "18px",
  }
}))

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
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.root}>
      <Grid item xs={false} md={5} className={classes.image} />
      <Box className={classes.displayContainer}>
        <Grid container item className={classes.header}>
          <Typography className={classes.headerText}>Don't have an account?</Typography>
          <Button variant="contained" className={classes.headerButton} onClick={() => history.push("/register")}>Create Account</Button>
        </Grid>
          <form onSubmit={handleLogin} className={classes.formContainer} >
            <Typography className={classes.formTitle}>
              <Box fontSize="h3.fontSize" fontWeight="bold">
                Welcome back!
              </Box>
            </Typography>
            <Grid className={classes.form}>
              <FormControl margin="normal" className={classes.textFields} required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  InputProps={{
                    classes: {
                      input: classes.textFields
                    }
                  }}
                />
              </FormControl>
              <FormControl margin="normal" className={classes.textFields} required>
                <TextField
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"
                  InputProps={{
                    classes: {
                      input: classes.textFields
                    }
                  }}
                />
              </FormControl>
              <Button className={classes.submitButton} color="primary" type="submit" variant="contained" size="large">
                Login
              </Button>
            </Grid>
          </form>
      </Box>
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
