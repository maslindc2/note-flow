import React,{ Component } from 'react'
import './Toolbar.css'

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
import user from '../UserInfo/userInfo';




const useStyles = makeStyles((theme) => ({
    root: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },
}));



export default function ToolbarInner() {
    
    function format(com, val) {
        document.getElementById('editor').focus();
        document.execCommand(com, false, val);
    }

    function bulletPoint() {
        format('insertHTML', `<ul><li class="bulletList"></li></ul>`);
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
        const text = document.getSelection();
        
        //used for showing or hiding url input box
        const show = document.getElementById('url-input');
        if(inputVal.substr(0,1) === " "){
            inputVal = inputVal.substr(1);
        }
        //Appends http:// to the url if the input did not have it to begin with
        var prefix1 = 'http://';
        var prefix2 = 'https://';
        if ((inputVal.substr(0, prefix1.length) !== prefix1) && (inputVal.substr(0, prefix2.length) !== prefix2)){
            
            inputVal = prefix2 + inputVal;
        }
        
        /**
         * This block handles url insert. text.baseNode.data==undefined checks to see if the user
         * is trying to insert only a url and NOT create a hyper link.  Else handles creating the hyperlink.
         * A hyperlink is created by first clicking the url button, then paste your url in the input box,
         * then highlight the text you want to turn into a hyperlink and then press the check mark button. 
         */
        if (text.baseNode.data === undefined) {
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

    function setHeader() {
        const target = document.getSelection();
        format('insertHTML', `<h2>${target}</h2>`);
    }

    ////////////////////////////////////////
    //Vito is working on this

    //openmenu for code block
    function openMenu() {
        document.getElementById("dropdown").classList.toggle("active");
    }

    

    //Main function to create new code block
    function addCodeBlock(lang) {
        //creating new filled div
        var next_line = document.getElementById('editor');
        
        alert(" Language chosen for codeblock is: "+lang);
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
        const id = `codeBlock-${document.getElementsByClassName('codeBlock').length + 1}`;
        codeBlock.classList.add('codeBlock');
        

        var new_block = format(
            'insertHTML',
            `<pre class='codeBlock' id='${id}'>${target}</pre>`
        );
        
        //Embedding Ace editor
        var mode_name = "ace/mode/"+lang;
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
    
    function handleSave() {
        
          //firebase.initializeApp(config);

        var content = document.getElementById('editor').innerHTML;
        
       const itemsRef= firebase.database().ref('items');
       var childRef = itemsRef.child(user.name);
       childRef.update({
           editor: content
       })
                
    }
    
    ////////////////////////////////////////////////////////

    //Emily working on this. Uses the Mathlive library and API
    function addEquation() {

        //Focus on editor, insert line
        document.getElementById('editor').focus();
        var next_line = document.getElementById('editor');
        format(
            'insert',
            `<pre class='editor' id='${next_line}'</pre>`
        );

        //Create new math block element
        const mathBlock = new MathfieldElement();

        //set initial value and options. Changing this will
        //change what the initial math equation looks like upon adding
        //Currently empty
        mathBlock.setValue("");

        //Chunk of code setting math block options and attributes
        mathBlock.setOptions({
            virtualKeyboardMode: "manual",
            virtualKeyboards: "all",
            virtualKeyboardTheme: "",
            virtualKeyboardLayout: "auto",
            virtualKeyboardToolbarOptions: "default",
            smartMode: true,
            smartFence: true,
            resetStyle: true,
            selectionMode: "beforeend",
        });
        mathBlock.setAttribute("resetStyle", "true");
        mathBlock.setAttribute("id",
            `mathBlock-${document.getElementsByClassName('mathBlock').length + 1}`);
        const id = mathBlock.id;
        mathBlock.setAttribute("class", 'mathBlock');

        //Added event listener for when you exit out of math block using arrow
        //key
        mathBlock.addEventListener('focus-out', (ev) => {
            if (ev.detail.direction === "forward") {

                document.getElementById('editor').focus();
                var next_line = document.getElementById('editor');
                format(
                    'insert',
                    `<pre class='editor' id='${target}'</pre>`
                );
            } else if (ev.detail.direction === "backward") {
                document.getElementById('editor').focus();
            }
        });

        //Event Listener to change math block value when there is user input
        mathBlock.addEventListener('input', (ev) => {
            mathBlock.setValue(ev.target.value);
        })

        const target = document.getSelection();

        //Checking if valid location to place a math block
        if (
            target.focusNode.nodeName.includes('#text') ||
            target.focusNode.classList.contains('title') ||
            target.focusNode.className.includes('mathBlock')
        ) {
            return
        }

        //Focuses back on editor, and then inserts a block at
        //the cursor using added function insertBlockAtCursor
        const ellie = document.getElementById('editor');
        document.getElementById('editor').focus();
        insertBlockAtCursor(mathBlock, target);

        /*
            //Block of comments to test out different methods of inserting
            //blocks and text elements

            //const texty = document.createTextNode("hello world!");
            //const spanny = document.createElement('span');
            //const t = document.createTextNode("This is a span element");
            //spanny.appendChild(t);
            //ellie.appendChild(spanny);
            //document.body.appendChild(spanny);
            //insertTextAtCaret(spanny);

        */
        document.getElementById(id).focus();
        /* Original format/executeCommand function. Does not appear to
            be functional in the context of a <math-field> element
        format('insert',
                    `<pre class="mathBlock" id="${id}">${target}</pre>`
                );
        */

        //If you comment out this line suddenly allows text editing to
        //the right of the math field. Will hold off on text to side of
        //until inline equation is figured out
        addLineAfterBlock(id);

    }


    //Method to handle Tab and Enter button press (Emily)
    function keyHandle(evt) {
        const key = evt.keyCode;
        switch (key) {
            case 9: //Tab
                insertTextAtCursor('\t');
                evt.preventDefault();
                break;
            case 13: //Enter
                insertTextAtCursor('\n');
                evt.preventDefault();
                break;
        }
    }

    //Inserts text block at current cursor position (Emily)
    function insertTextAtCursor(text) {
        var sel, range;
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
    }

    //Inserts an inline-block element at current cursor position (Emily)
    function insertBlockAtCursor(block, target) {
        var range;
        range = target.getRangeAt(0);
        range.deleteContents();
        range.insertNode(block);
    }

    //Experiment method to perform a different text insertion at cursor (Emily)
    function insertTextAtCaret(text) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(text));
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
    }

    //Save selection before you insert an element (Emily)
    function saveSelection(sel) {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }

    //Restore the previously saved selection (Emily)
    function restoreSelection(range, sel) {
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    }

    //Insert HTML directly at caret position. Basically another
    //experimental method to test out insertion of elements at
    //cursor in doc (Emily)
    function pasteHtmlAtCaret(html, selectPastedContent) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    } else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if ((sel = document.selection) && sel.type !== "Control") {
            // IE < 9
            var originalRange = sel.createRange();
            originalRange.collapse(true);
            sel.createRange().pasteHTML(html);
            if (selectPastedContent) {
                range = sel.createRange();
                range.setEndPoint("StartToStart", originalRange);
                range.select();
            }
        }
    }
        function changeFont(fontName) {
        const selectedFont = fontName.target.value;
        document.execCommand("fontName", false, selectedFont);
    }

    function changeFSize(Size){
        const FSize = Size.target.value;
        document.execCommand("fontSize", false, FSize);
    }


    //
    //
    //
    //
    //
    //
    //
    //


    return (
            <div className='toolbar'>
                <div class="tooltip container">
                    <span class="tooltiptext">Bold</span>
                    <button class={"bar"} onClick={e => format('bold')}>
                        <FormatBoldIcon/>
                    </button>
                </div>
                <div class="tooltip container">
                    <span class="tooltiptext">Italicize</span>
                    <button class={"bar"} onClick={e => format('italic')}>
                        <FormatItalicIcon/>
                    </button>
                </div>
                <div class="tooltip container">
                    <span class="tooltiptext">List</span>
                    <button class={"bar"} onClick={e => bulletPoint()}>
                        <FormatListBulletedIcon/>
                    </button>
                </div>
                     <div className="container">
        <select onChange={changeFont}>
            <option value="Arial">Arial</option>
            <option value="Calibri">Calibri</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Times New Roman">Times New Roman</option>
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

                <div class="tooltip container">
                    <span class="tooltiptext">Hyperlink</span>
                    <button class={"bar"} onClick={e => addLink()}>
                        <InsertLinkIcon/>
                    </button>
                </div>

                <div id='url-input' className='hidden container'>
                    <input id='textFormatUrl' placeholder='url' />
                    <button class={"bar"} onClick={e => setUrl(e)}>
                        <CheckIcon/>
                    </button>
                </div>
                <div class="tooltip container">
                    <span class="tooltiptext">Header</span>
                    <button class={"bar"} onClick={e => setHeader()}>
                        <TextFieldsIcon/>
                    </button>
                </div>
                <div class="tooltip container">
                <span class="tooltiptext">Code Block</span>
                <button class={"bar"} onClick={e => openMenu()}>
                    <CodeIcon />
                    <ul id="dropdown">
                    <li onClick={e => addCodeBlock("javascript")} >Javascript</li>
                    <li onClick={e => addCodeBlock("java")}>Java</li>
                    <li onClick={e => addCodeBlock("python")}>Python</li>
                    <li onClick={e => addCodeBlock("c_cpp")}>C++</li>
                </ul>
                </button>
            </div>
                <div class="tooltip container">
                    <span class="tooltiptext">Equation</span>
                    <button class={"bar"} onClick={e => addEquation()}>
                        <FunctionsIcon/>
                    </button>
                </div>
                <div class="tooltip container">
                    <span class="tooltiptext">Save</span>
                    <button class={"bar"} onClick={e => handleSave()}>
                        <SaveAltIcon/>
                    </button>
                </div>
            </div>
    )
}