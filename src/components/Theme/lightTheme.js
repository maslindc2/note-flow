import {createMuiTheme,} from "@material-ui/core/styles";
import React from 'react'
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';

//Light Theme
export const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: green[200],
            //mainRadialGradient: 'radial-gradient(#fdfdff 10%, #FBE8A6, #F4976C 80%)',
            //lightLinearGradient: 'linear-gradient(45deg, #66bb6a 30%, #00bcd4 90%)',
            //mainLinearGradient: 'linear-gradient(45deg, #47824a 30%, #008394 90%)',
            main: green[500],
            dark: green[800],
        },
        
        secondary: {
            light: lightBlue[400],
            main: lightBlue[700],
            dark: lightBlue[900],
        },

        tertiary: {
            main: deepOrange[500],
        },

        basic: {
            main: grey[300],
        }
    }

});
export default lightTheme;