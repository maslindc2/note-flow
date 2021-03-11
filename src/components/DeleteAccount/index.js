import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase'
import { withFirebase } from '../Firebase';

 
const DeleteAccount = () => (
  <div>
    
    <DeleteAccountForm />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class DeleteAccountFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { oldPassword } = this.state;

    var user = firebase.auth().currentUser;
    //var validated;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email, 
      oldPassword
  );
    // Prompt the user to re-provide their sign-in credentials

    user.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
     
      user.delete();
      alert("Your account has been deleted.");
    }).catch(function(error) {
      // An error happened.
      alert("The email or password you entered does not match the credentials associated with your account.")
      
    });

 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { oldPassword, error } = this.state;
 
    const isInvalid = oldPassword =='';
 
    return (
      <form onSubmit={this.onSubmit}>

        <input
          name="oldPassword"
          value={oldPassword}
          onChange={this.onChange}
          type="text"
          placeholder="Verify Password"
        />
        
        <button disabled={isInvalid} type="submit">
          Delete My Account
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const DeleteAccountLink = () => (
  <p class="DeleteAccountFormWrapper">
  Tired of having an awesome way to take notes?   <NavLink  class="forgetText" activeClassName="active" to="/deleteaccount">Delete your account.</NavLink>
  </p>
);
 
export default DeleteAccount;
 
const DeleteAccountForm = withFirebase(DeleteAccountFormBase);
 
export { DeleteAccountForm, DeleteAccountLink };