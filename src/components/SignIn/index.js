import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import user from '../UserInfo/userInfo';

import firebase from 'firebase';


//implementation of sign in functionality
//succesfull sign in will send you to the editor component

const SignIn = () => (
  <div>
    
 
     <SignInForm  />
     
 
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
        //update username, and email
        //user.name= this.state.email.split('@')[0];
        user.email=this.state.email;
        //set state back to initial
        this.setState({ ...INITIAL_STATE });
        
        //get content from the database
        const db= firebase.firestore();
        const userRef=db.collection('users').doc(user.email);
        const docRef=userRef.collection('Editors').doc('Default_Editor');
        
        //update the innerHTML editor
        docRef.get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            user.content = documentSnapshot.get('text_HTML');
            document.getElementById('editor').innerHTML=user.content;
          }
        });

        //update user full name
        userRef.get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            user.fullname = documentSnapshot.get('name');
          }
        });
        //alert(test);
        //Successful sign in will send user to editor page for now
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
        
        <button disabled={isInvalid} type="submit" color={"black"}>
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
 
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
 
export { SignInForm };