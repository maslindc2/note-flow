import React, { useContext } from 'react'
import HomeContent from './homePageContent'
import './Homepage.css'
import { withAuthorization } from '../Session';

import Typography from '@material-ui/core/Typography';
import ThemeContext from '../Theme/ThemeContext';
import { useTheme } from '@material-ui/core';
import lightTheme from '../Theme/lightTheme';
import { ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';

//What user sees as the home page of our app


class HomePage extends React.Component {
  render() {
    const theme = lightTheme;
    return (
      <ThemeProvider theme={theme}>
        <div style={{ justifyContent: 'center',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5%' }}>
          <Typography variant="h2" 
                      color="textPrimary"
                      style={{ marginTop: 40 }}>
            Home Page
          </Typography>
          <Typography variant="h5" 
                      color="textPrimary"
                      style={{ marginTop: 10,
                              marginBottom: 35 }}>
            Welcome to Note Flow!
          </Typography>
          <HomeContent />
        </div>
      </ThemeProvider>
    )
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);