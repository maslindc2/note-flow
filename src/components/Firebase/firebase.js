import app from 'firebase/app';
import firebase from 'firebase/app'
import 'firebase/auth';

/*
Implementation of Firebase connectivity. 
We can define the config function in an .env file later so we can add it
to our gitinore file so our credentials aren't exposed. 
*/

const config = {
    apiKey: "AIzaSyBOL0tgT4Kj73E67Y7IhLVw7x2OXU7yyDA",
    authDomain: "note-flow-60166.firebaseapp.com",
    projectId: "note-flow-60166",
    storageBucket: "note-flow-60166.appspot.com",
    messagingSenderId: "229776630736",
    appId: "1:229776630736:web:14b929733fa37c629ecfd5",
    measurementId: "G-B2S22DDZTV"
  };

  class Firebase{
      constructor(){
    

           
          app.initializeApp(config);
          this.auth = app.auth();
        
      
      }//constructor
    

    // *** Auth API ***
     doCreateUserWithEmailAndPassword = (email, password) =>
     this.auth.createUserWithEmailAndPassword(email, password);

     doSignInWithEmailAndPassword = (email, password) =>
     this.auth.signInWithEmailAndPassword(email, password);

     doSignOut = () => this.auth.signOut();

     doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
     doPasswordUpdate = password =>
       this.auth.currentUser.updatePassword(password);

 

}//class

  export default Firebase;
