import React from 'react'
import SignIn from './SignIn';

import Firebase, { FirebaseContext } from './Firebase';
import { SignUpLink } from './SignUp';



class SignInPage extends React.Component {
  render() {
    return (
      <div>
       
        <h1>Sign In Page</h1>
        <SignIn/>
        <SignUpLink/>
       
      </div>
    )
  }
}export default SignInPage