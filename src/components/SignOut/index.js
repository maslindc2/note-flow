import React from 'react';
 
import { withFirebase } from '../Firebase';
 
/*
Basic implementation of sign out button.
If sign out is successful, the editor link
will be removed and user can't access the 
component
*/
const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);
 
export default withFirebase(SignOutButton);