import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
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
  paper: {
    display: "flex",
    flexDirection: "column",
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
    marginRight: "20px",
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

const Signup = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
              Already have an account?
            </Typography>
            <Button
              variant='contained'
              className={classes.headerButton}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Box>
          <form onSubmit={handleRegister} className={classes.formContainer}>
            <Typography className={classes.formTitle}>
              <Box fontSize='h3.fontSize' fontWeight='bold'>
                Create an account
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
                  required
                />
              </FormControl>
              <FormControl
                margin='normal'
                className={classes.textFields}
                required
              >
                <TextField
                  label='E-mail address'
                  aria-label='e-mail address'
                  type='email'
                  name='email'
                  InputProps={{
                    classes: {
                      input: classes.textFields,
                    },
                  }}
                  required
                />
              </FormControl>
              <FormControl
                margin='normal'
                error={!!formErrorMessage.confirmPassword}
                className={classes.textFields}
                required
              >
                <TextField
                  aria-label='password'
                  label='Password'
                  type='password'
                  inputProps={{ minLength: 6 }}
                  name='password'
                  InputProps={{
                    classes: {
                      input: classes.textFields,
                    },
                  }}
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl
                margin='normal'
                error={!!formErrorMessage.confirmPassword}
                className={classes.textFields}
                required
              >
                <TextField
                  label='Confirm Password'
                  aria-label='confirm password'
                  type='password'
                  inputProps={{ minLength: 6 }}
                  name='confirmPassword'
                  InputProps={{
                    classes: {
                      input: classes.textFields,
                    },
                  }}
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <Button
                className={classes.submitButton}
                color='primary'
                type='submit'
                variant='contained'
                size='large'
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
