import React from 'react' 

import SignUp from './SignUp';

import Firebase, { FirebaseContext } from './Firebase';
import { SignUpLink } from './SignUp';


class SignUpPage extends React.Component {
    render() {
      return (
        
        <FirebaseContext.Provider value={new Firebase()}> 
        <h1>Sign Up Page</h1>
        <SignUp />
        
        </FirebaseContext.Provider>
      )

    }
  }export default SignUpPage