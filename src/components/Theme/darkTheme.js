import React from 'react'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import deepOrange from '@material-ui/core/colors/deepOrange';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

//Dark Theme
export const darkTheme = createMuiTheme({ 
    palette: {
        type: 'dark',
        primary: {
            light: yellow[500],
            main: yellow[700],
            dark: green[900]
        },
        secondary: {
            light: deepOrange[200],
            main: cyan[500],
            dark: cyan[700],
        },
        tertiary: {
            light: green[200],
            main: green[500],
            dark: green[800],
        },
        basic: {
            main: grey[900],
        },
        common: {
          main: "#212121",      
        },
        
    },
})
export default darkTheme;