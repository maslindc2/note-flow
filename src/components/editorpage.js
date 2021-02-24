import React from 'react'
import Editor from './editor/Editor'
import './editor/Editor.css'
import ToolbarInner from "./toolbar/Toolbar";
import { withAuthorization } from './Session';
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