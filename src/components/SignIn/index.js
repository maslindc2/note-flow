import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import user from '../UserInfo/userInfo';

import firebase from 'firebase';
import ToolbarInner from'../toolbar/Toolbar';
import code_load from'../toolbar/Toolbar';
//implementation of sign in functionality
//succesfull sign in will send you to the editor component

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
          }
        });

       
        //alert(test);
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
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        
        <button disabled={isInvalid} type="submit" color={"black"}>
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
 
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
 
export { SignInForm };