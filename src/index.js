import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUpPage from './components/signuppage'
import HomePage from './components/homepage';
import EditorPage from './components/editorpage'
import SignInPage from './components/signinpage'
import { Route, NavLink, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Notfound from './components/notfound';


const routing = (
  <Router>
  <div>
    
    <ul>
      <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
       </li>
      <li>
          <NavLink  activeClassName="active" to="/signuppage">
           Sign Up
         </NavLink>
      </li>
      <li>
          <NavLink  activeClassName="active" to="/signinpage">
           Sign In
         </NavLink>
      </li>
      <li>
          <NavLink  activeClassName="active" to="/editor">
           Editor
         </NavLink>
      </li>
    </ul>
   
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signuppage" component={SignUpPage} />
        <Route path="/signinpage" component={SignInPage} />
        <Route path="/editor" component={EditorPage} />
        <Route component={Notfound} />
      </Switch>
  </div>
  </Router>
)


ReactDOM.render(

  routing, document.getElementById('root')

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
