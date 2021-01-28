import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'

/*
Addresses to future components 
*/
import * as ROUTES from '../../constants/routes';
 
const Navigation = () => (
  <div className = 'header'>
    <ul>
    
        <li><Link to={ROUTES.SIGN_UP}>Sign Up </Link></li>

        <li><Link to={ROUTES.SIGN_IN}>Sign In </Link></li>
     
        <li><Link to={ROUTES.HOME}>Home </Link></li>
      
        <li><Link to={ROUTES.ACCOUNT}>Account </Link></li>        
      
    </ul>
  </div>
);
 
export default Navigation;