import React from 'react'
import PasswordForget from './PasswordForget';




//Top level of password recovery functionality for unauthorized users

class PassWordForgetPage extends React.Component {
  render() {
    return (
      <div>
       
        <h1>Recover password</h1>
        <PasswordForget/>
       
      </div>
    )
  }
}export default PassWordForgetPage