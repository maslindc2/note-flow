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

//Function to load content from code block


export default function ToolbarInner() {
    

    function format(com, val) {
        document.getElementById('editor').focus();
        document.execCommand(com, false, val);
    }

    function bulletPoint() {
        format('insertHTML', `<ul><li class="bulletList"></li></ul>`);
    }

    function changeFont(fontName) {
        const selectedFont = fontName.target.value;
        document.execCommand("fontName", false, selectedFont);
    }

    function changeFSize(Size) {
        const FSize = Size.target.value;
        document.execCommand("fontSize", false, FSize);
    }

    function highlightText(Color){
        const cColor = Color.target.value;
        document.execCommand("backColor", false, cColor);
    }

    function changeFColor(Color){
        const cColor = Color.target.value;
        document.execCommand("foreColor", false, cColor);
    }
    //Sets the url input box to shown or hidden
    function addLink() {
        const show = document.getElementById('url-input');
        if (show.classList.contains('hidden')) {
            show.classList.remove('hidden');
        } else {
            show.classList.add('hidden');
        }
    }

    function setUrl() {
        //Stores the input from the url box into inputVal
        var inputVal = document.getElementById('textFormatUrl').value;

        //Text is used for creating a hyperlink
        const text = window.getSelection();

        //used for showing or hiding url input box
        const show = document.getElementById('url-input');

        //Fixes problem with a leading space in the url when copying and pasting
        if (inputVal.substr(0, 1) === " ") {
            inputVal = inputVal.substr(1);
        }
        //Appends http:// to the url if the input did not have it to begin with
        var prefix1 = 'http://';
        var prefix2 = 'https://';
        if ((inputVal.substr(0, prefix1.length) !== prefix1) && (inputVal.substr(0, prefix2.length) !== prefix2)) {

            inputVal = prefix2 + inputVal;
        }

        /**
         * This obscene if statement checks to see if anchordNode.data is not the same as the selected text
         * this is how firefox handles selections.  The left side is there to make sure no false positives occur.
         * I'm not proud of this by any means but it works, this is the only time MATH260 is remotely useful.
         * A hyperlink is created by first clicking the url button, then paste your url in the input box,
         * then highlight the text you want to turn into a hyperlink and then press the check mark button. 
         */
        if (text.anchorNode.data != text || (text.baseNode === undefined && text.anchorNode.data != text)) {
            format(
                'insertHTML', `<a href='${inputVal}' target='_blank'>${inputVal}</a>`
            );
        } else {
            format(
                'insertHTML', `<a href='${inputVal}' target='_blank'>${text}</a>`
            );
        }

        //This makes the url input tag blank again. I could use "" or '' but JS thinks strings are the same as null
        document.getElementById('textFormatUrl').value = " ";

        //hides the input tag again 
        show.classList.add('hidden');
    }


    function insertImage() {
        //Stores the input from the url box into inputVal
        var inputVal = document.getElementById('textFormatUrl').value;

        //used for showing url input box
        const show = document.getElementById('url-input');

        //Fixes problem with a leading space in the url when copying and pasting
        if (inputVal.substr(0, 1) === " ") {
            inputVal = inputVal.substr(1);
        }

        //Insert image
        format(
            'insertHTML', `<img src='${inputVal}'>`
        );


        //This makes the url input tag blank again. I could use "" or '' but JS thinks strings are the same as null
        document.getElementById('textFormatUrl').value = " ";

        //hides the input tag again 
        show.classList.add('hidden');
    }

    function embedVideo() {
        //getting youtube video id
        //Stores the input from the url box into inputVal
        var inputVal = document.getElementById('textFormatUrl').value;

        //Fixes problem with a leading space in the url when copying and pasting
        const show = document.getElementById('url-input');
        if (inputVal.substr(0, 1) === " ") {
            inputVal = inputVal.substr(1);
        }


        var next_line = document.getElementById('editor');
        format(
            'insertParagraph',
            `<pre class='editor' id='${next_line}'</pre>`
        );

        const youTube = document.createElement('pre');
        const target = document.getSelection();
        const id = `youTube-${document.getElementsByClassName('youTubeClass').length + 1}`;
        youTube.classList.add('youTubeClass');
        format(
            'insertHTML',
            `<pre class='youTubeClass' id='${id}'>${target}</pre>`
        );
        const bool = true;
        ReactDOM.render(<ReactPlayer url={inputVal} controls={bool} />, document.getElementById(`${id}`));

        //Clears out url box
        document.getElementById('textFormatUrl').value = " ";
        //Hides the url box
        show.classList.add('hidden');
    }

    function setHeader() {
        const target = document.getSelection();
        format('insertHTML', `<h2>${target}</h2>`);
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
        console.log(user.arr_Values);
        console.log(user.arr_DOMs);
        
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
        console.log("loading  code_load");
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
    //Bugs persisting with tabbing/moving out of mathblock focus, inline mathblock, add mathblock on same line
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

        //Added event listener for moving out of math block with arrow key
        mathBlock.addEventListener('focus-out', (ev) => {
            if (ev.detail.direction === "forward") {

                //target.executeCommand('moveToMathFieldEnd');
                document.getElementById('editor').focus()
                

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

        document.getElementById('editor').focus();
        insertBlockAtCursor(mathBlock, target);
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
    //handling save
    function handleSave() {
        
        //firebase.initializeApp(config);

      var content = document.getElementById('editor').innerHTML;
      /*
     const itemsRef= firebase.database().ref('items');
     var childRef = itemsRef.child(user.name);
     childRef.update({
      editor: content
  })*/
      
      
      //Save to Default editor for now.
      console.log("before saving");
      Code_save();
      math_save();
      var user = userInner()[0];
     const usersRef=firebase.firestore().collection("users").doc(user.email).collection("Editors").doc("Default_Editor");
    if(user.arr_Langs !=null){
        //Save Code Editors
        //console.log("special saving");
        
        usersRef.update({
            
            'arr_Values': user.arr_Values,
            'arr_DOMs': user.arr_DOMs,
            'arr_Langs':user.arr_Langs,

        })
    }
    if(user.arr_math_Values!=null){
        //Save Math Block content
        usersRef.update({
            'arr_math_Values': user.arr_math_Values
        })
    }
    usersRef.update({
        'text_HTML': content,
    })
       
                
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
    //load everything
    /*
    var loading_editor=userInner()[2];
    loading_editor();
    */
    

    
    //
    //
    //
    //
    //
    //
    //
    //
    

    return [code_load,math_load,(
        <div className='toolbar'>
            <div class="tooltip container">
                <span class="tooltiptext">Bold</span>
                <button class={"bar"} onClick={e => format('bold')}>
                    <FormatBoldIcon />
                </button>
            </div>
            <div class="tooltip container">
                <span class="tooltiptext">Italicize</span>
                <button class={"bar"} onClick={e => format('italic')}>
                    <FormatItalicIcon />
                </button>
            </div>
            <div class="tooltip container">
                <span class="tooltiptext">List</span>
                <button class={"bar"} onClick={e => bulletPoint()}>
                    <FormatListBulletedIcon />
                </button>
            </div>
            <div className="tooltip container">
                <span class="tooltiptext">Font Style and Size</span>
                <select onChange={changeFont}>
                    <option value="Arial">Arial</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Roboto Mono">Roboto Mono</option>
                </select>
                <select onChange={changeFSize}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
            <div class="tooltip">
            <span class="tooltiptext">Highlight Text Color</span>
                <span class="HLightText">Highlight</span>
                <select onChange={highlightText}>
                    <option value ="#ffffff">None</option>
                    <option value ="Black">Black</option>
                    <option value="#99c2ff">Blue</option>
                    <option value="Orange">Orange</option>
                    <option value="#ff9999">Red</option>
                    <option value="Yellow">Yellow</option>

                </select>
            </div>
            <div class="tooltip">
            <span class="tooltiptext">Text Color</span>
            <span class="HLightText">Text Color</span>
                <select onChange={changeFColor}>
                    <option value ="Black">Black</option>
                    <option value ="#ffffff">White</option>
                    <option value="Blue">Blue</option>
                    <option value="Orange">Orange</option>
                    <option value="Red">Red</option>
                    <option value="#b3b300">Yellow</option>
                </select>
            </div>
            <div class="container">
                <div class="tooltip">
                    <span class="tooltiptext">Align Left</span>
                    <button class={"bar"} onClick={e => document.execCommand('justifyLeft', false)}>
                        <FormatAlignLeftIcon />
                    </button>
                </div>

                <div class="tooltip">
                    <span class="tooltiptext">Align Center</span>
                    <button class={"bar"} onClick={e => document.execCommand('justifyCenter', false)}>
                        <FormatAlignCenterIcon />
                    </button>
                </div>

                <div class="tooltip">
                    <span class="tooltiptext">Align Right</span>
                    <button class={"bar"} onClick={e => document.execCommand('justifyRight', false)}>
                        <FormatAlignRightIcon />
                    </button>
                </div>

                <div class="tooltip ">
                    <span class="tooltiptext">Justify Full</span>
                    <button class={"bar"} onClick={e => document.execCommand('justifyFull', false)}>
                        <FormatAlignJustifyIcon />
                    </button>

                </div>
            </div>
            <div class="tooltip">
                <span class="tooltiptext">Insert link</span>
                <button class={"bar"} onClick={e => addLink()}>
                    <InsertLinkIcon />
                </button>
            </div>

            <div id='url-input' className='hidden container'>
                <input id='textFormatUrl' placeholder='url' />
                <button class={"bar"} onClick={e => openMenu("dropdown_links")}>
                    <CheckIcon />
                    <ul id="dropdown_links">
                        <li onClick={e => setUrl()} >Link</li>
                        <li onClick={e => insertImage()} >Image</li>
                        <li onClick={e => embedVideo()}>Video</li>
                    </ul>
                </button>
            </div>
            <div class="tooltip container">
                <span class="tooltiptext">Header</span>
                <button class={"bar"} onClick={e => setHeader()}>
                    <TextFieldsIcon />
                </button>
            </div>
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
            <div class="tooltip container">
                <span class="tooltiptext">Save</span>
                <button class={"bar"} onClick={e => handleSave()}>
                    <SaveAltIcon />
                </button>
            </div>
            
            
        </div>
    )
    ]
}