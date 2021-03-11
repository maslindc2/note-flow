import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import userInner from '../UserInfo/userInfo';

import firebase from 'firebase';
import ToolbarInner from '../toolbar/Toolbar';
import $ from 'jquery'

//implementation of sign in functionality
//succesfull sign in will send you to the editor component

//MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import './signInFormStyle.css'

const SignIn = () => (
  <div>


    <SignInForm />


  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,


};


class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {

        userInner()[2]();

        //Successful sign in will send user to editor page for now
        this.props.history.push("/homepage");

      })

      .catch(error => {
        this.setState({ error });
      });


    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} class="signInFormWrapper" noValidate autoComplete="off">
        <FormControl class="formEmailPassword" variant="outlined" size="small" >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput name="email" value={email} onChange={this.onChange} label="Email" placeholder="" />
        </FormControl>

        <FormControl class="formEmailPassword" variant="outlined" size="small" >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput name="password" value={password} onChange={this.onChange} type="password" label="Password" placeholder="" />
        </FormControl>

        <Button id="signInButton" variant="outlined" disabled={isInvalid} type="submit">Sign In </Button>

        {error && <p class="errorMessage">{error.message}</p>}
      </form>
    );
  }

}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;

export { SignInForm };