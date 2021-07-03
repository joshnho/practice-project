import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";

const SignupForm = ({ user, register, classes }) => {
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
      <form onSubmit={handleRegister} className={classes.formContainer}>
        <Typography variant='h3' className={classes.formTitle}>Create an account</Typography>
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
              required
            />
          </FormControl>
          <FormControl margin='normal' className={classes.textFields} required>
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
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
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
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
