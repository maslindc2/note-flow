import React from 'react';
import ReactDOM from 'react-dom';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import { ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core/styles';

const light = createMuiTheme(lightTheme);
const dark = createMuiTheme(darkTheme);
var givenTheme = light;
//const [theme, setTheme] = React.useState(version);

const ThemeContext = React.createContext({
    theme: light,
    setTheme: () => {},

})

export default ThemeContext

/*
function handleThemeChange(version) {
    if (version == 'dark') {
        givenTheme = dark;
    } else {
        givenTheme = light;
    }
    return givenTheme;
}

//const theme = givenTheme;


export const theme = (version) => (
    handleThemeChange(version)
); export default theme
*/