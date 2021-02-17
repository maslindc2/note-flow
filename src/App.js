import React, { Component } from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import SignUpPage from './components/signuppage'
import HomePage from './components/homepage';
import EditorPage from './components/editorpage'
import SignInPage from './components/signinpage'
import Notfound from './components/notfound';
import { withFirebase } from './components/Firebase';
import PasswordPage from './components/passwordpage'

/*
Implementation of our main App component
The swith tags tell React what compoenets
to render based on what the current URL path 
is 
*/
  class App extends Component {
    constructor(props) {
      super(props);   
      this.state = {
        authUser: null,
      };      
    }
  
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        });
      }

      componentWillUnmount() {
        this.listener();
      }
   
    render() {
      return (
        <Router>
        <div>
            <Navigation authUser={this.state.authUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/signuppage" component={SignUpPage} />
                    <Route path="/signinpage" component={SignInPage} />
                    <Route path="/editor" component={EditorPage} />
                    <Route path="/passwordpage" component={PasswordPage} />
                    <Route component={Notfound} />
                </Switch>
         </div>
        </Router>
      );
    }
  }
   
  export default withFirebase(App);