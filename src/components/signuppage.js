import React from 'react' 

import SignUp from './SignUp';
import { withAuthorization } from './Session';

//Top level of sign up functionality 

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