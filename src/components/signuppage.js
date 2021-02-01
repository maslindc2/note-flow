import React from 'react' 

import SignUp from './SignUp';

import Firebase, { FirebaseContext } from './Firebase';



class SignUpPage extends React.Component {
    render() {
      return (
        <FirebaseContext.Provider value={new Firebase()}> 
        <SignUp />
        </FirebaseContext.Provider>
      )
    }
  }export default SignUpPage