import React from 'react'
import './filePage.css'
import FileCard from './fileCard'
import user from '../UserInfo/userInfo'
import firebase from'firebase'
import Firebase from '../Firebase/firebase.js';
import { withFirebase } from '../Firebase';
//What user sees as the home page of our app
var size=0;
function loadFIle(){
  
  var i;
  var size;
  var files=[];
  var ids =[];
  

  //loading files information
  for( i=0;i<user.docs_size;i++){
    files.push(<FileCard class={"file"} key={'doc'+(i+1)} id={user.docs_ids[i]}></FileCard>);
    console.log("test "+user.docs_ids);
  }  
  return files;
}

class UserFiles extends React.Component {
  
  render() {
    return (
      <div class="filePageWrapper">
        <h1 id={"fileTitle"}>My Files</h1>
        <h2 id={"subtitle"}>All saved user files will be displayed here. Currently in development.</h2>
        <div class="fileDisplay">
          
            {loadFIle()}

        </div>
      </div>
    )
  }
}export default UserFiles