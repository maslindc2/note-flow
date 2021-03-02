import React from 'react';

import { NavLink } from 'react-router-dom'
import SignOutButton from '../SignOut';
import AppBarDrawer from "./AppBarDrawer";
 
import { AuthUserContext } from '../Session';

const Navigation = ({ authUser }) => (
    <div>
       <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
      </div>
  );



//Links the user sees if they are authenticated by our authentification API - Currently Home, Editor, and Sign Out button
const NavigationAuth = () =>  (
    //Needs App bar and additional functionality
    
    <AppBarDrawer/>
  );

  //Links users see if they are not authenticated - currently all links and sign out button 
  const NavigationNonAuth = () =>  (

    //Needs App Bar
    <div display="none"/>
    
  
  );


  export default Navigation;