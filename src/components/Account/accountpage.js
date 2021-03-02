import React from 'react'

import firebase from 'firebase'
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from '../Session';

//Administrative features for signed in users - right now only functionality is changning password

class AccountPage extends React.Component {
  render() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}


    return (
      <div>
        <h1 id={"title"}>Account Page</h1>

        <div>

            <h1>Email:</h1>
            <p>{email}</p>
            <h1>Change password</h1>
            <PasswordChangeForm />
        </div>

      </div>
    )
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);