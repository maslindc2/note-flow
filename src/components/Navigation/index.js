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



//What  user sees if they are authenticated by our authentification API 
const NavigationAuth = () => (
  //Needs App bar and additional functionality

  <AppBarDrawer />
);

//What users see if they are not authenticated 
const NavigationNonAuth = () => (

  //Needs App Bar
  <div display="none" />


);


export default Navigation;