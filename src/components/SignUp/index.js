import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import firebase from 'firebase';
import user from '../UserInfo/userInfo'
//implementation of sign up functionality
//successfull sign up will take you to the homepage

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
import './signUpFormStyle.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
  },

  rootTwo: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const SignUp = () => (
  <div>
   
     <SignUpForm />
    
  </div>
);

const INITIAL_STATE = {
    fullname: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    content:""
  };
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { fullname, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        
        //set initial structure in database including USERNAME and EMAIL
        user.email= this.state.email;
        user.fullname=this.state.fullname;
        
        //update user email to the database
        const db= firebase.firestore();
        const userRef= db.collection('users').doc(user.email);

        //update user full name to the database
        userRef.set({
          'FullName': user.fullname
        })
        
        //set up the initial data in the database
        userRef.collection('Editors').doc('Default_Editor').set({
          text_HTML:'This account is first created'
        });

        //redirects user after a successful sign-in back to the home page
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/homepage");
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
 
  }
 
  
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
        fullname,
        email,
        passwordOne,
        passwordTwo,
        error,
        content
      } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    fullname === '';

    return (
      
        <form onSubmit={this.onSubmit} class="inputFormWrapper" noValidate autoComplete="off">
          <FormControl variant="outlined" size="small" >
            <InputLabel htmlFor="fullname">Full Name</InputLabel>
            <OutlinedInput name="fullname" value={fullname} onChange={this.onChange} label="Full Name" placeholder="Johnny Appleseed"/>
          </FormControl>

          <FormControl variant="outlined" size="small" >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput name="email" value={email} onChange={this.onChange} label="Email" placeholder="appleseed.johnny@website.com"/>
          </FormControl>
          
          <FormControl variant="outlined" size="small" >
            <InputLabel htmlFor="passwordOne">Password</InputLabel>
            <OutlinedInput name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" label="Password" placeholder="password123"/>
          </FormControl>

          <FormControl variant="outlined" size="small" >
            <InputLabel htmlFor="passwordTwo">Confirm Password</InputLabel>
            <OutlinedInput name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" label="Confirm Password" placeholder="password123"/>
          </FormControl>
          
          
          <Button id="submitButton" variant="outlined" disabled={isInvalid} type = "submit">Sign Up </Button>
  
          {error && <p>{error.message}</p>}
        </form>
      
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <NavLink  activeClassName="active" to="/signuppage">Sign Up</NavLink>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
 
export default SignUp;
 
export { SignUpForm, SignUpLink };