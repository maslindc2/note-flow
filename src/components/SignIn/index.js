import React, { Component } from 'react';

import { FirebaseContext } from '../Firebase';



const SignIn = () => (
  <div>
    
    <FirebaseContext.Consumer>
    {firebase => <SignInForm firebase={firebase} />}
     
    </FirebaseContext.Consumer>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //Successful sign in will send user to editor page for now
        //Need to figure out how to send user after sign in
        this.props.history.push("/editor");
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
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 

export default SignIn;
 
export { SignInForm };