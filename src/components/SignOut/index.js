import React from 'react';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';
 
/*
Basic implementation of sign out functionality.
If sign out is successful, the editor link
will be removed, user will be sent to sign in page, and  can't access the 
editor component until they sign in again
*/



const SignOutButton = ({ firebase }) => (

    <Button id={"signout"} href='/' onClick={firebase.doSignOut} > Sign Out </Button>

  
);






 
export default withFirebase(SignOutButton);