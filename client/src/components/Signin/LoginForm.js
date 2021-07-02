import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";

const Signin = (props) => {
  const { user, login, classes } = props;

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
    <form onSubmit={handleLogin} className={classes.formContainer}>
      <Typography variant='h3'>Welcome back!</Typography>
      <Grid className={classes.form}>
        <FormControl margin='normal' className={classes.textFields} required>
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
        <FormControl margin='normal' className={classes.textFields} required>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
