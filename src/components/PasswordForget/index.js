import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';

 
const PasswordForget = () => (
  <div>
    
    <PasswordForgetForm />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //notify user that they will recieve an email to reset their password
        alert("A link to reset your password has been sent to the email address associated with your account.");
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
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const PasswordForgetLink = () => (
  <p class="signInFormWrapper">
    <NavLink  class="forgetText" activeClassName="active" to="/passwordpage">Forgot your password?</NavLink>
  </p>
);
 
export default PasswordForget;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };