import React from 'react';

import { withFirebase } from '../Firebase';
 
/*
Basic implementation of sign out functionality.
If sign out is successful, the editor link
will be removed, user will be sent to sign in page, and  can't access the 
editor component until they sign in again
*/


const SignOutButton = ({ firebase }) => (
  <a id = "signout" type="button" href='/signinpage' onClick={firebase.doSignOut}>
    Sign Out
  </a>
  
);






 
export default withFirebase(SignOutButton);