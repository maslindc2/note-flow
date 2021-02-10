import React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import SignUpPage from './components/signuppage'
import HomePage from './components/homepage';
import EditorPage from './components/editorpage'
import SignInPage from './components/signinpage'
import Notfound from './components/notfound';

const App = () => (
        
        <Router>
        <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signuppage" component={SignUpPage} />
          <Route path="/signinpage" component={SignInPage} />
          <Route path="/editor" component={EditorPage} />
          <Route component={Notfound} />
        </Switch>
         </div>
        </Router>
    
  );
  
  export default App;

