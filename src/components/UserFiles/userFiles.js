import React from 'react'
import './filePage.css'
import FileCard from './fileCard'
import user from '../UserInfo/userInfo'
import firebase from'firebase'
import Firebase from '../Firebase/firebase.js';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import userInner from '../UserInfo/userInfo'
//What user sees as the home page of our app

function loadFIle(){
  let user= userInner()[0];
  var i;
  
  var files=[];

  //loading files information
  for( i=0;i<user.docs_size;i++){
    
    
    files.push(<FileCard id={user.docs_ids[i]} className={"files"} key={'doc'+(i+1)} ></FileCard>);
    //console.log("test "+user.docs_ids);
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
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(UserFiles);