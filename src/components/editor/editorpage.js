import React, { useContext } from 'react'
import Editor from './Editor'
import './Editor.css'
import ToolbarInner from "../toolbar/Toolbar";
import { withAuthorization } from '../Session';
import ThemeContext from '../Theme/ThemeContext';
import { ThemeProvider, createMuiTheme, useTheme, MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from '../Theme/lightTheme';
import darkTheme from '../Theme/darkTheme';
//top level of editor functionality



class EditorPage extends React.Component {
  render() {
    
    return (
      
        <div class={"editorPageWrapper"}>
          <ToolbarInner/>
          <Editor/>
        </div>
    )
  }
}
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(EditorPage);