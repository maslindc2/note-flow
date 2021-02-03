import React from 'react'
import SignIn from './SignIn';

import Firebase, { FirebaseContext } from './Firebase';
import { SignUpLink } from './SignUp';



class SignInPage extends React.Component {
  render() {
    return (
      <div>
        <FirebaseContext.Provider value={new Firebase()}> 
        <h1>Sign In Page</h1>
        <SignIn/>
        <SignUpLink/>
        </FirebaseContext.Provider>
      </div>
    )
  }
}export default SignInPage