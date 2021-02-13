import React from 'react';

import { NavLink } from 'react-router-dom'
import SignOutButton from '../SignOut';
import AppBarDrawer from "./AppBarDrawer";

const Navigation = ({ authUser }) => (
    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
  );



//Links the user sees if they are authenticated by our authentification API - Currently Home, Editor, and Sign Out button
const NavigationAuth = () =>  (


    <AppBarDrawer/>

  
  );

  //Links users see if they are not authenticated - currently all links and sign out button 
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
        
        
      </ul>
     
        
    </div>
  
  );


  export default Navigation;