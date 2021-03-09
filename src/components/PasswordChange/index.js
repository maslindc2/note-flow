import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import firebase from 'firebase' 

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
    const { passwordOne, oldPassword } = this.state;

    var user = firebase.auth().currentUser;
    //var validated;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email, 
      oldPassword
  );

    // Prompt the user to re-provide their sign-in credentials

    user.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
      //validated = true;
      user.updatePassword(passwordOne)
      alert("The password associated with your account has been changed.");
    }).catch(function(error) {
      // An error happened.
      alert("The password you entered does not match the password associated with your account.")
      
    });

/*
    if(validated == true){
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
    }
 */
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  

 
  render() {
    const { passwordOne, passwordTwo, oldPassword, oldPasswordTwo, error } = this.state;
  
    const isInvalid =
      (passwordOne !== passwordTwo || passwordOne === '') ||/* (oldPassword !== oldPasswordTwo ||*/ (oldPassword==='');


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