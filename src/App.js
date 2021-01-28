import React from 'react';
import Editor from './components/editor/Editor'
import './App.css'; 

/*
For future app navigation and database connectivity. 
Enables route to component mapping.
*/
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

/*
For navigation to different components.
Configured in ./components/navigation/routes.js 
*/
import Navigation from './components/navigation/Navigation';

import SignUpPage from './components/SignUp';

import * as ROUTES from './constants/routes';

//Main function for running the app
function App() {
  return (
    <div className='app'>
      <Router> 
        <Navigation/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Editor/>
      </Router>
    </div>
  );
}

export default App