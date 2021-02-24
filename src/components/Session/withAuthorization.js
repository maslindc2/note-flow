import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
 
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
             //redirects non-authenticated user to sign-in page 
            this.props.history.push("/signinpage");
          }
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
 
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};
 
export default withAuthorization;