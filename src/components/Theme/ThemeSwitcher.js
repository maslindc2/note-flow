import React, { useContext, useState } from "react";
//import { Button } from "react-bootstrap";
import ThemeContext from "../Theme/ThemeContext";
import Switch from "@material-ui/core/Switch";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";
import { createMuiTheme } from "@material-ui/core";

const light = createMuiTheme(lightTheme);
const dark = createMuiTheme(darkTheme);

export default function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext)

    const [state, setState] = React.useState({
        checked: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked});
        setTheme(state.checked ? light : dark);
    };

    return (
        <Switch checked={state.checked} onChange={handleChange} name="checked"
        className="switch-theme"
        />
    );
}