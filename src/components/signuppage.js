import React from 'react' 

import SignUp from './SignUp';

import Firebase, { FirebaseContext } from './Firebase';
import { SignUpLink } from './SignUp';


class SignUpPage extends React.Component {
    render() {
      return (
        <div>
        
        <h1>Sign Up Page</h1>
        <SignUp />
        
        </div>
       
      )

    }
  }export default SignUpPage