import React from 'react'
import SignIn from './SignIn';


import { SignUpLink } from './SignUp';

//Top level of sign in functionality 

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