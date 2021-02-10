import React from 'react';

import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom'


const Navigation = () =>  (

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
     
        
    </div>
 
  
  );

  export default Navigation;