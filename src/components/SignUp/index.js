import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import firebase from 'firebase';
import user from '../UserInfo/userInfo'
//implementation of sign up functionality
//successfull sign up will take you to the homepage

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
        this.props.history.push("/");
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
      <form onSubmit={this.onSubmit}>
         <input
          name="fullname"
          value={fullname}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type = "submit">Sign Up </button>
 
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