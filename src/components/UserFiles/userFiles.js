import React from 'react'
import './filePage.css'
import FileCard from './fileCard'
//What user sees as the home page of our app

class UserFiles extends React.Component {
  render() {
    return (
      <div class="filePageWrapper">
        <h1 id={"fileTitle"}>My Files</h1>
        <h2 id={"subtitle"}>All saved user files will be displayed here. Currently in development.</h2>
        <div class="fileDisplay">
            <FileCard class={"file"}/>
            <FileCard class={"file"}/>
            <FileCard class={"file"}/>
            <FileCard class={"file"}/>
            <FileCard class={"file"}/>
            <FileCard class={"file"}/>

        </div>
      </div>
    )
  }
}export default UserFiles