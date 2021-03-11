import React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import HomePage from './components/HomePage/homepage';
import EditorPage from './components/editor/editorpage';
import Notfound from './components/notfound';
import PasswordPage from './components/passwordpage'
import AccountPage from './components/Account/accountpage'
import UserFiles from './components/UserFiles/userFiles'
import WelcomePage from './components/WelcomePage/welcomePage'
import { withAuthentication } from './components/Session';
import DeleteAccount from './components/deleteaccountpage'
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
                    <Route exact path="/" component={WelcomePage}/>
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/editor" component={EditorPage} />
                    <Route path="/passwordpage" component={PasswordPage} />
                    <Route path="/accountpage" component={AccountPage} />
                    <Route path="/userfiles" component={UserFiles} />
                    <Route path="/deleteaccount" component={DeleteAccount} />
                    <Route component={Notfound} />
                </Switch>
         </div>
        </Router>
);

export default withAuthentication(App);