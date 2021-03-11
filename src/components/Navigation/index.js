import React from 'react';

import { NavLink } from 'react-router-dom'
import SignOutButton from '../SignOut';
import AppBarDrawer from "./AppBarDrawer";
import { ThemeProvider, createMuiTheme, useTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AuthUserContext } from '../Session';
//import theme from '../Theme/ThemeAPI';
import lightTheme from '../Theme/lightTheme';
import darkTheme from '../Theme/darkTheme';
import { useState } from 'react';
import { setState } from 'react';
import ThemeContext from '../Theme/ThemeContext';
import Layout from "../Theme/Layout";

const light = createMuiTheme(lightTheme);
const dark = createMuiTheme(darkTheme);


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
const NavigationAuth = () => {
  //Needs App bar and additional functionality
  const [theme, setTheme] = useState(light)
  const value = { theme, setTheme}

  //const handleThemeChange = (themeState) => {
  // setTheme(themeState ? dark : light)
  //}

  return (
      //Needs App bar and additional functionality
      <ThemeContext.Provider value={value} >
        <AppBarDrawer />
      </ThemeContext.Provider> 
  );
};

//What users see if they are not authenticated 
const NavigationNonAuth = () => (

  //Needs App Bar
  <div display="none" />
);

  export default Navigation;
