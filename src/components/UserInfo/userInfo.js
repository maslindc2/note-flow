import { Email } from '@material-ui/icons';
import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
import ToolbarInner from'../toolbar/Toolbar';


var user ={
    email: '',
    content:'',
    fullname:'',
    arr_Values: [],
    arr_DOMs: [],
    arr_Langs:[],
    arr_math_Values:[],
    docs_size:0,
    docs_ids:[]
};
export default function userInner(){
    

    function loading_user_info(){
        const db_user= firebase.auth().currentUser;

        //console.log("user "+db_user);
        user.email=db_user.email;
        user.fullname=db_user.displayName;
        //console.log("email "+user.email);

        //get content from the database
        const db= firebase.firestore();
        const userRef=db.collection('users').doc(user.email);


        const docRef=userRef.collection('Editors').doc('Default_Editor');
        const usersRef=firebase.firestore().collection("users").doc(user.email);

        //update number of files
        usersRef.collection('Editors').get().then(DocumentSnapshot => {
        user.docs_size = DocumentSnapshot.size;
        });

        //update file name
        usersRef.collection('Editors').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            user.docs_ids.push(doc.id);
        });
    });

        //update the innerHTML editor
    /*
        docRef.get().then(documentSnapshot => {
            console.log("loading user info");
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
            */
        console.log(user);
        console.log("loaded user info");
        
    }

    function loading_editor(doc_id){
        const db= firebase.firestore();
        const userRef=db.collection('users').doc(user.email);
        const docRef=userRef.collection('Editors').doc(doc_id);
        console.log("loading the editor");
        docRef.get().then(documentSnapshot => {
        //load html
        user.content = documentSnapshot.get('text_HTML');
        //load codeblock
        user.arr_DOMs= documentSnapshot.get('arr_DOMs');
        user.arr_Langs=documentSnapshot.get('arr_Langs');
        user.arr_Values= documentSnapshot.get('arr_Values');
        //load mathblock
        user.arr_math_Values=documentSnapshot.get('arr_math_Values');
        //push contents to the editor
        console.log(user);
        document.getElementById('editor').innerHTML=user.content;
        //push codeblock
        if(user.arr_Values  !=null && user.arr_Langs!=null &&  user.arr_DOMs != null){
        console.log(user);
        var code_load = ToolbarInner();
        code_load[0]();
        
        
    }
        //push mathblock
        if(user.arr_math_Values!=null){
        var math_load= ToolbarInner();
        math_load[1]();
    }
    console.log("loaded the editor");
});
    }

    return [user,loading_user_info,loading_editor];
}


