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
import { MuiThemeProvider } from '@material-ui/core/styles';

import { withAuthentication } from './components/Session';

import lightTheme from './components/Theme/lightTheme';
import darkTheme from './components/Theme/darkTheme';

//const themeLight = lightTheme;
//const themeDark = darkTheme;

/*
Implementation of our main App component
The swith tags tell React what compoenets
to render based on what the current URL path 
is 
*/
const theme = lightTheme;

const App = () => (
    <MuiThemeProvider theme={theme}>
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
                <Route component={Notfound} />
            </Switch>
    </div>
    </Router>
    </MuiThemeProvider>
);
export default withAuthentication(App);