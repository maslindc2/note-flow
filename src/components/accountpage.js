import React from 'react'


import PasswordChangeForm from './PasswordChange';
import { withAuthorization } from './Session';

//Administrative features for signed in users - right now only functionality is changning password

class AccountPage extends React.Component {
  render() {
    return (
      <div>
        <h1 id={"title"}>Account Page</h1>

        <div>
            <h1>Change password</h1>
            <PasswordChangeForm />
        </div>

      </div>
    )
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);