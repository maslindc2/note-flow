import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import userInner from '../UserInfo/userInfo';

import firebase from 'firebase';
import ToolbarInner from'../toolbar/Toolbar';


//implementation of sign in functionality
//succesfull sign in will send you to the editor component

//MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import './signInFormStyle.css'

const SignIn = () => (
  <div>
    
 
     <SignInForm  />
     
 
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  

};

 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { email, password } = this.state;
    
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        /*
        var user =userInner()[0];
        
        user.email=this.state.email;
        //set state back to initial
        this.setState({ ...INITIAL_STATE });
        
        //get content from the database
        const db= firebase.firestore();
        const userRef=db.collection('users').doc(user.email);
        userRef.get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            user.fullname=documentSnapshot.get('Fullname');
          }
        });
        

        const docRef=userRef.collection('Editors').doc('Default_Editor');
        const usersRef=firebase.firestore().collection("users").doc(user.email);
        //update number of files
        usersRef.collection('Editors').get().then(DocumentSnapshot => {
          user.docs_size = DocumentSnapshot.size;
        });
        //update file name
        usersRef.collection('Editors').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              //console.log(doc.id);
              user.docs_ids.push(doc.id);
          });
      });
        //update the innerHTML editor
        docRef.get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            //load html
            user.content = documentSnapshot.get('text_HTML');
            //load codeblock
            user.arr_DOMs= documentSnapshot.get('arr_DOMs');
            user.arr_Langs=documentSnapshot.get('arr_Langs');
            user.arr_Values= documentSnapshot.get('arr_Values');
            //load mathblock
            user.arr_math_Values=documentSnapshot.get('arr_math_Values');
            
          }
        });
        //push contents to the editor
        document.getElementById('editor').innerHTML=user.content;
        //push codeblock
        if(user.arr_Values  !=null && user.arr_Langs!=null &&  user.arr_DOMs != null){
          console.log(user.arr_Langs);
          var code_load = ToolbarInner();
          code_load[0]();
          
      }
        //push mathblock
        if(user.arr_math_Values!=null){
        var math_load= ToolbarInner();
        math_load[1]();
      }
      */
       
        //alert(test);
        userInner()[2]();
        userInner()[3]("Default_Editor");
        userInner()[1]="Default_Editor";
        
        
    
        //Successful sign in will send user to editor page for now
        this.props.history.push("/editor");
        
        
        
        
      })
      
      .catch(error => {
        this.setState({ error });
      });
      
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form onSubmit={this.onSubmit} class="signInFormWrapper" noValidate autoComplete="off">
        <FormControl class="formEmailPassword" variant="outlined" size="small" >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput name="email" value={email} onChange={this.onChange} label="Email" placeholder="Email Address"/>
          </FormControl>

        <FormControl class="formEmailPassword" variant="outlined" size="small" >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput name="password" value={password} onChange={this.onChange} type="password" label="Password" placeholder="Password"/>
          </FormControl>
        
        <Button variant="outlined" id="submitButton" disabled={isInvalid} type="submit" color={"black"}>
          Sign In
        </Button>
 
        {error && <p class="errorMessage">{error.message}</p>}
      </form>
    );
  }
 
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
 
export { SignInForm };