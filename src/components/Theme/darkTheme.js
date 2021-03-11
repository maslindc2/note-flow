import React from 'react'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import deepOrange from '@material-ui/core/colors/deepOrange';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';

//Dark Theme
export const darkTheme = createMuiTheme({ 
    palette: {
        type: 'dark',
        primary: {
            light: deepOrange[500],
            main: deepOrange[700],
            dark: deepOrange[900]
        },
        secondary: {
            light: cyan[200],
            main: cyan[500],
            dark: cyan[700],
        },
        tertiary: {
            light: yellow[200],
            main: yellow[500],
            dark: yellow[800],
        },
        basic: {
            main: grey[900],
        }
    },
})
export default darkTheme;