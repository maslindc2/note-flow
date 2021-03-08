import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import Firebase from 'firebase' 

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { passwordOne } = this.state;

    
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //informing user their password has been changed
        alert("The password associated with your account has been changed.");
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
    const { passwordOne, passwordTwo, oldPassword, oldPasswordTwo, error } = this.state;
    //I'm strugging with figuring out how to validate with the users ACTUAL old password associated with their firebase account
    //Right now this is just checking that the user is entering the same thing for each form 
    const isInvalid =
      (passwordOne !== passwordTwo || passwordOne === '') || (oldPassword !== oldPasswordTwo || oldPassword==='');
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="oldPassword"
          value={oldPassword}
          onChange={this.onChange}
          type="password"
          placeholder="Enter Old Password"
        />
         <input
          name="oldPasswordTwo"
          value={oldPasswordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Old Password"
        />
        
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);