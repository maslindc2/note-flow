import React from 'react';

import { NavLink } from 'react-router-dom'
import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) => (
    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
  );

//Links the user sees if they are authenticated by our authentification API
const NavigationAuth = () =>  (

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
        <li>
            <SignOutButton />
        </li>
        
      </ul>
     
        
    </div>
  
  );

  //Links users see if they are not authenticated 
  const NavigationNonAuth = () =>  (

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
            <SignOutButton />
        </li>
        
      </ul>
     
        
    </div>
  
  );


  export default Navigation;