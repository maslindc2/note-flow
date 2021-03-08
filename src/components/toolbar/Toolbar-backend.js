import React, { Component } from 'react'
import './Toolbar.css'

//Imports for MathBlock
//Link to Imported Library Documentation: https://mathlive.io/ (site), https://cortexjs.io/docs/ (docs)
import { MathfieldComponent } from 'react-mathlive'
import Mathlive from 'mathlive'
import { Mathfield, MathfieldElement } from 'mathlive'

//imports for CodeBlock
import * as ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-java';
import 'ace-builds/src-min-noconflict/mode-c_cpp';
import 'ace-builds/src-min-noconflict/mode-python';
import $ from "jquery";

//Material UI Imports
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CodeIcon from '@material-ui/icons/Code';
import FunctionsIcon from '@material-ui/icons/Functions';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CheckIcon from '@material-ui/icons/Check';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import AppBarDrawer from "../Navigation/AppBarDrawer";
import App from "../../App";
//saving
import { withFirebase } from '../Firebase';
import Firebase from '../Firebase/firebase.js';
import firebase from 'firebase';
import userInner from '../UserInfo/userInfo';
//embedding
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

//Text Style Imports
<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Roboto&family=Roboto+Mono&display=swap');
</style> 

const useStyles = makeStyles((theme) => ({
    root: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },
}));

export default function ToolbarBackend() {
    

    function format(com, val) {
        document.getElementById('editor').focus();
        document.execCommand(com, false, val);
    }

    

    ////////////////////////////////////////
    //Vito is working on this

    //openmenu for code block
    function openMenu(id) {
        document.getElementById(id).classList.toggle("active");
    }

    //Main function to create new code block
    function addCodeBlock(lang,id) {
        //creating new filled div
        if(id==null){
        var next_line = document.getElementById('editor');
        
        //alert(" Language chosen for codeblock is: "+lang);
        format(
            'insertParagraph',
            `<pre class='editor' id='${next_line}'</pre>`
        );
        const codeBlock = document.createElement('pre');
        const target = document.getSelection();
        /*
        if (
            target.focusNode.nodeName.includes('#text') ||
            target.focusNode.classList.contains('title') ||
            target.focusNode.className.includes('codeBlock')
        ) {
            return
        }
        */
         id = `codeBlock-${document.getElementsByClassName('codeBlock').length + 1}`;
        codeBlock.classList.add('codeBlock');
        
        var new_block = format(
            'insertHTML',
            `<pre class='codeBlock' id='${id}'>${target}</pre>`
        );
        }
        
        //Embedding Ace editor
        var mode_name = lang;
        ace.require("ace/ext/language_tools");
        var code_editor = ace.edit(id, {
            theme: "ace/theme/tomorrow_night_eighties",
            mode: mode_name,
            minLines: 2,
            maxLines: 30,
            wrap: true,
            autoScrollEditorIntoView: true,    
        });

        code_editor.setOptions({
            fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        
        addLineAfterBlock(id);
        return code_editor;
    }
    //function to save code
    function Code_save(){
        const length = document.getElementsByClassName("codeBlock").length;
        var i;
        var user = userInner()[0];
        const arr_Values=[];
        const arr_DOMs=[];
        const arr_Langs=[];
        //const arr_Langs=[];
        for( i=0;i<length;i++){
            var id ="codeBlock-"+(i+1);
            var editor = ace.edit(id);
            arr_Values.push(editor.getValue());
            //editor.destroy();
            arr_DOMs.push(id);
            arr_Langs.push(editor.getOptions().mode);
            
            
        }
        user.arr_Values=arr_Values;
        user.arr_Langs=arr_Langs;
        user.arr_DOMs=arr_DOMs;
        
        
        //loading part
        /*
        for( i=0;i<arr_DOMs.length;i++){
            var new_editor= addCodeBlock(arr_Langs[i],arr_DOMs[i]);
            new_editor.setValue("Saved and loaded working \n"+arr_Values[i]+user.arr_Langs[i]);

        }
        */
        
    }
    //
    function code_load(){
        var i;
        var user = userInner()[0];
        var arr_DOMs=user.arr_DOMs;
        var arr_Langs=user.arr_Langs;
        var arr_Values=user.arr_Values;
        //destroy the old editor
        for( i=0;i<arr_DOMs.length;i++){
            var old_editor = ace.edit(arr_DOMs[i]);
            old_editor.destroy();
           
        }
        //recreate a new one
        for( i=0;i<arr_DOMs.length;i++){
            var new_editor= addCodeBlock(arr_Langs[i],arr_DOMs[i]);
            new_editor.setValue(arr_Values[i]);
        }
        
    }

    
    

    
    

    
    //experimenting to fix a dumb bug when trying to delete the code block
   /* function deleteBlock(){
        const codeBlock = document.getElementsByTagName("pre");
        const target = document.getSelection();
        
        
        const id='';
        $(document).ready(function(){
            $(document).click(function(){
            
            });
        });
        
        const code_editor=ace.edit(id);
        code_editor.destroy();
        code_editor.container.remove();
    }*/
    
    function addLineAfterBlock(id) {
        const block = document.getElementById(`${id}`);
        const div = document.createElement('div');
        const br = document.createElement('br');

        div.appendChild(br);
        if (!block) {
            return;
        } else {
            block.after(div);
        }
    }

    //Function for entering equation. Uses the Mathlive library and API
    //CSS element is in Editor.css file
    function addEquation() {

        //Focus on editor, insert line
        document.getElementById('editor').focus();
        var tag = document.getElementById('editor');

        //Create new math block element
        const mathBlock = new MathfieldElement();

        //Set initial value and options. Changing this will
        //change what the initial math equation looks like upon adding
        //Currently value is empty
        mathBlock.setValue("");

        //Chunk of code setting math block options and attributes
        mathBlock.setOptions({
            virtualKeyboardMode: "manual",
            virtualKeyboards: "all",
            virtualKeyboardTheme: "material",
            virtualKeyboardLayout: "auto",
            virtualKeyboardToolbarOptions: "default",
            smartMode: true,
            smartFence: true,
            resetStyle: true,
            selectionMode: "beforeend",
        });
        mathBlock.setAttribute("resetStyle", "true");
        mathBlock.setAttribute("class", 'mathBlock');

        //Setting Math Block ID upon creation. Each new math block should
        //be assigned individual ID based on number of other existing math blocks
        //in document
        mathBlock.setAttribute("id",
            `mathBlock-${document.getElementsByClassName('mathBlock').length + 1}`);
        const id = mathBlock.id;

        //Adds a blank space to use later for typing in
        format('insertText', ' ');

        //This ugly block of code moves the cursor one position to the left
        var setPos = document.createRange();
        var set = window.getSelection();
        setPos.setStart(tag.childNodes[0], tag.childNodes[0].textContent.length - 1);
        setPos.collapse(true);
        set.removeAllRanges();
        set.addRange(setPos);
        tag.focus();

        //Added event listener for moving out of math block with arrow key
        mathBlock.addEventListener('focus-out', (ev) => {
            if (ev.detail.direction === "forward") {
                setPos.setStart(tag.childNodes[0], tag.childNodes[0].textContent.length);
                setPos.collapse(true);
                set.removeAllRanges();
                set.addRange(setPos);
                tag.focus();
            } else if (ev.detail.direction === "backward") {
                document.getElementById('editor').focus();
            }
        });

        //Event Listener to change math block value when there is user input
        //May be beneficial when saving documents, since value itself is changed
        mathBlock.addEventListener('input', (ev) => {
            mathBlock.setValue(ev.target.value);
        })
        
        

        //Target is where selection/cursor is
        const target = document.getSelection();

        //Insert that math block
        insertBlockAtCursor(mathBlock, target);
        //Focus on that block
        document.getElementById(id).focus();
    }

    //Inserts an inline-block element at current cursor position
    function insertBlockAtCursor(block, target) {
        var range;
        range = target.getRangeAt(0);
        range.deleteContents();
        range.insertNode(block);
        
    }

    //handling save
    

    function check_doc(id){
        const user = userInner()[0];
        const docRef=firebase.firestore().collection("users").doc(user.email).collection("Editors").doc(id);
        
        
        docRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
            alert("This file already exist. Saving...")
            handleSave(id);
            } else {

            // Create the new document
            docRef.set({
                text_HTML:'Creating a new document'
            }); 
            handleSave(id);
            }
        
        });
        
    }
    
    //save math content
    function math_save(){
        
        var i;
        var user = userInner()[0];
        var arr_math_Values=[]
        for( i=0; i< document.getElementsByClassName("mathBlock").length;i++){
            var id='mathBlock-'+(i+1);
            var mathBlock= document.getElementById(id);
            arr_math_Values.push(mathBlock.getValue());
            //console.log(mathBlock.getValue());
            
        }
        user.arr_math_Values=arr_math_Values;
        
    }
    //load math content
    function math_load(){
        var i;
        var user = userInner()[0];
        for( i=0; i< document.getElementsByClassName("mathBlock").length;i++){
            var id='mathBlock-'+(i+1);
            var mathBlock= document.getElementById(id);
            //console.log(user.arr_math_Values[i]);
            mathBlock.setValue(user.arr_math_Values[i]);
            //console.log(mathBlock.getValue());

        }
    }

    function handleSave(id) {
        //update userinfo and current file
        userInner()[2]();
        userInner()[5](id);
        
        
      console.log("from handlesave "+id);
      var content = document.getElementById('editor').innerHTML;
      var title =document.getElementById('title').innerHTML;
      
      
      //Save to Default editor for now.
      console.log("in handling save"+ userInner()[1]);
      Code_save();
      math_save();
      var user = userInner()[0];
      const userRef =firebase.firestore().collection("users").doc(user.email);
      
      const docRef=firebase.firestore().collection("users").doc(user.email).collection("Editors").doc(id);

        if(user.arr_Langs !=null){
        

        //Save Code Editors
        
        docRef.update({
            
            'arr_Values': user.arr_Values,
            'arr_DOMs': user.arr_DOMs,
            'arr_Langs':user.arr_Langs,
            
        })
    }
    if(user.arr_math_Values!=null){
        //Save Math Block content
        docRef.update({
            'arr_math_Values': user.arr_math_Values
        })
    }
    //saving HTML content and title
    docRef.update({
        'title_HTML': title,
        'text_HTML': content,
    })
    update_current_page(id);           
    }

    
    function update_current_page(id){
        let user = userInner()[0];
        const userRef =firebase.firestore().collection("users").doc(user.email);
        
        userRef.update({
          'active_page': id
      });
      console.log("updated current page to the database");
    }
    

    
    //
    //
    //
    //
    //
    //
    //
    //
    

    return [code_load,math_load,check_doc,handleSave,(
        <div className='toolbar'>
            
            <div class="tooltip container">
                <span class="tooltiptext">Code Block</span>
                <button class={"bar"} onClick={e => openMenu("dropdown")}>
                    <CodeIcon />
                    <ul id="dropdown">
                        <li onClick={e => addCodeBlock("ace/mode/javascript")} >Javascript</li>
                        <li onClick={e => addCodeBlock("ace/mode/java")}>Java</li>
                        <li onClick={e => addCodeBlock("ace/mode/python")}>Python</li>
                        <li onClick={e => addCodeBlock("ace/mode/c_cpp")}>C++</li>
                    </ul>
                </button>
            </div>
            <div class="tooltip container">
                <span class="tooltiptext">Equation</span>
                <button class={"bar"} onClick={e => addEquation()}>
                    <FunctionsIcon />
                </button>
            </div>
            
            
            
        </div>
    )
    ]
}