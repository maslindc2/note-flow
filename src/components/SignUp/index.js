import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

//implementation of sign up functionality
//successfull sign up will take you to the homepage

const SignUp = () => (
  <div>
   
     <SignUpForm />
    
  </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        //redirects user after a successful sign-in back to the home page
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
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
         <input
          name="username"
          value={username}
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