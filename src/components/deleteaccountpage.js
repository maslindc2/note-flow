import React from 'react'
import DeleteAccount from './DeleteAccount';

import { withAuthorization } from './Session';


//Top level of account delete functionality for authorized users

class DeleteAccountPage extends React.Component {
  render() {
    return (
      <div>
       
        <h1>Delete Account</h1>
        <DeleteAccount/>
       
      </div>
    )
  }
}const condition = authUser => !!authUser;
export default withAuthorization(condition)(DeleteAccountPage);