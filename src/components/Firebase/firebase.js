import app from 'firebase/app';

/*
We can define these in an .env file later so we can add it
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
      }
  }

  export default Firebase;
