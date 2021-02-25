import React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import SignUpPage from './components/signuppage'
import HomePage from './components/homepage';
import EditorPage from './components/editorpage'
import SignInPage from './components/signinpage'
import Notfound from './components/notfound';
import PasswordPage from './components/passwordpage'
import AccountPage from './components/accountpage'
import UserFiles from './components/UserFiles/userFiles'


import { withAuthentication } from './components/Session';
/*
Implementation of our main App component
The swith tags tell React what compoenets
to render based on what the current URL path 
is 
*/
const App = () => (
   
        <Router>
        <div>
            <Navigation/>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/signuppage" component={SignUpPage} />
                    <Route path="/signinpage" component={SignInPage} />
                    <Route path="/editor" component={EditorPage} />
                    <Route path="/passwordpage" component={PasswordPage} />
                    <Route path="/accountpage" component={AccountPage} />
                    <Route path="/userfiles" component={UserFiles} />
                    <Route component={Notfound} />
                </Switch>
         </div>
        </Router>
);
   
export default withAuthentication(App);