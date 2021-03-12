import React, { Component, useContext } from 'react'
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
import { makeStyles } from '@material-ui/core/styles';
import AppBarDrawer from "../Navigation/AppBarDrawer";
import App from "../../App";

import { useTheme } from '@material-ui/core/styles';

//saving
import { withFirebase } from '../Firebase';
import Firebase from '../Firebase/firebase.js';
import firebase from 'firebase';
import userInner from '../UserInfo/userInfo';
import SaveDialog from '../UserFiles/dialogSave';
import ToolbarBackend from '../toolbar/Toolbar-backend';
//embedding
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

//Test Mui Button
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';

//Test Mui Link Insert
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//MUI Test Button Group
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FilledInput from '@material-ui/core/FilledInput';
import { Menu } from '@material-ui/core'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ThemeContext from '../Theme/ThemeContext'

//Text Style Imports
//<style>
//@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Roboto&family=Roboto+Mono&display=swap');
//</style> 

const useStyles = makeStyles((theme) => ({

    /* Gets rid of the border for the buttons so its just icons only*/
    //Bar class also addresses hover properties
    //CHECK WITH MASLIN BEFORE PUSH
    bar: {
        '&:hover': {
            //backgroundColor: fade('#1b94da', theme.palette.action.hoverOpacity),
            //color: 'blue',
            backgroundColor: fade(theme.palette.grey[400], .30),
            },
        size: 'medium',
        color: theme.palette.secondary,
        borderRadius: '10%',
    },

    /* bulletList class is Used for the list function */ 
    bulletedList: {
        '&>hover' : {
            '&>not(.active)': {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'black',
            },
        },
    },

    container: {
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 1,
    },
    
    drawer: {
        color: theme.palette.common,
    },

    dropDownClass: {
        color: theme.palette.common,
        listStyleType: 'none',
    },

    hidden: {
        display: 'none',
    },
      
    fontColorForm: {
        width: 105,
        display: 'flex',
        padding: '0em',
        color: theme.palette.primary,
        backgroundColor: theme.palette.common,
        margin: 'dense',
        boxSizing: 'border-box',
    },

    formControl: {
        width: 85,
        size: 'small',
        display: 'flex',
        padding: '0em',
        color: theme.palette.primary,
        backgroundColor: theme.palette.common,
        margin: 'dense',
        boxSizing: 'border-box',
    },


    linkSelector: {
        width: 50,
        size: "small",
        borderColor: theme.palette.common,
        color: theme.palette.common,
        backgroundColor: theme.palette.common,
        margin: 'dense',
    },

    mathBlock: {
        fontSize: 16,
        display: 'inline-block',
        width: 'fit-content',
        paddingInlineEnd: 20,
        paddingInlineStart: 8,
        paddingBottom: 8,
        paddingTop: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        border: theme.palette.secondary,
    },

    popover: {
        pointerEvents: 'none',
        anchorOrigin: {
            vertical: 'bottom', 
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        disableRestoreFocus: true,
    },

    root: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },

    testToolbarItem: {
        padding: '1em',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
    },

    toolbar: {
        padding: 4,
        position: 'fixed',
        marginTop: 64,
        top: 0,
        height: 55,
        marginLeft: 'fill',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary,
    },
      
    toolbarshift: {
        padding: 5,
        position: 'fixed',
        marginRight: 240,
        marginTop: 64,
        top: 0,
        height: 50,
        width: 'auto',
        marginLeft: 240,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.common,
    },

    urlInput: { 
        width: 200,
        size: 'small',
        display: 'flex',
        boxSizing: 'border-box',
        backgroundColor: theme.palette.common,
        margin: 'dense',
        outlineColor: theme.palette.common,
    },

}));

//Function to load content from code block
//Test MUI Dropdown Menu
const linkSelections = [
    {
        value: 'Select',
      label: ' ',
    },
    {
      label: 'Link',
      value: 'Link',
    },
    {
      label: 'Image',
      value: 'Image'
    },
    {
      label: 'Video',
      value: 'video',
    },
  ];
  ////

export default function ToolbarInner() {
    const theme = useTheme();
    //const theme = useTheme();
    const classes = useStyles(theme);

    //Test MUI Dropdown
    const [linkType, setLinkType] = React.useState('Select');
    const handleSelectChange = (event) => {
        setLinkType(event.target.value);
    };

    /////// CODE BLOCK MENU TEST
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleCodeClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCodeClose = () => {
        setAnchorEl(null);
    };
//////////////////////////////////////////////////
////TEST WITH POPOVERS//////
    const [anchor, setAnchor] = React.useState(null);
    const [boldPop, setBoldPop] = React.useState(null);
    const [italicPop, setItalicPop] = React.useState(null);
    const [listPop, setListPop] = React.useState(null);
    const [leftAlignPop, setLeftAlignPop] = React.useState(null);
    const [centerAlignPop, setCenterAlignPop] = React.useState(null);
    const [rightAlignPop, setRightAlignPop] = React.useState(null);
    const [justAlignPop, setJustAlignPop] = React.useState(null);
    const [urlPop, setUrlPop] = React.useState(null);
    const [headerPop, setHeaderPop] = React.useState(null);
    const [codePop, setCodePop] = React.useState(null);
    const [mathPop, setMathPop] = React.useState(null);
    const [savePop, setSavePop] = React.useState(null);

    const handleBoldPopOpen = (event) => {
        setBoldPop(event.currentTarget);
    };
    const handleBoldPopClose = () => {
        setBoldPop(null);
    };
    const handleItalicPopOpen = (event) => {
        setItalicPop(event.currentTarget);
    };
    const handleItalicPopClose = () => {
        setItalicPop(null);
    };
    const handleListPopOpen = (event) => {
        setListPop(event.currentTarget);
    };
    const handleListPopClose = () => {
        setListPop(null);
    }
    const handleLeftAlignPopOpen = (event) => {
        setLeftAlignPop(event.currentTarget);
    };
    const handleLeftAlignPopClose = () => {
        setLeftAlignPop(null);
    }
    const handleCenterAlignPopOpen = (event) => {
        setCenterAlignPop(event.currentTarget);
    };
    const handleCenterAlignPopClose = () => {
        setCenterAlignPop(null);
    };
    const handleRightAlignPopOpen = (event) => {
        setRightAlignPop(event.currentTarget);
    };
    const handleRightAlignPopClose = () => {
        setRightAlignPop(null);
    }
    const handleJustAlignPopOpen = (event) => {
        setJustAlignPop(event.currentTarget);
    };
    const handleJustAlignPopClose = () => {
        setJustAlignPop(null);
    }
    const handleUrlPopOpen = (event) => {
        setUrlPop(event.currentTarget);
    };
    const handleUrlPopClose = () => {
        setUrlPop(null);
    }
    const handleHeaderPopOpen = (event) => {
        setHeaderPop(event.currentTarget);
    };
    const handleHeaderPopClose = () => {
        setHeaderPop(null);
    }
    const handleCodePopOpen = (event) => {
        setCodePop(event.currentTarget);
    };
    const handleCodePopClose = () => {
        setCodePop(null);
    }
    const handleMathPopOpen = (event) => {
        setMathPop(event.currentTarget);
    };
    const handleMathPopClose = () => {
        setMathPop(null);
    }
    const handleSavePopOpen = (event) => {
        setSavePop(event.currentTarget);
    };
    const handleSavePopClose = () => {
        setSavePop(null);
    }
    //const open = Boolean(anchor);

 ////////////////////////////

    function format(com, val) {
        
        document.getElementById('editor').focus();
        document.execCommand(com, false, val);
    }

    function bulletPoint() {
        format('insertHTML', `<ul><li className="bulletedList"></li></ul>`);
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
        if (show.style.display == 'none') {
            show.style.display = 'flex';
        } else {
            show.style.display = 'none';
        }
        //Original
        //if (show.classList.contains('hidden')) {
        //    show.classList.remove('hidden');
        //} else {
        //    show.classList.add('hidden');
        //}
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
         * Checks to see if anchorNode.data is not the same as the selected text his is how firefox handles selections.  
         * The left side is there to make sure no false positives occur.  
         * A hyperlink is created by first clicking the url button, then paste your url in the input box,
         * then highlight the text you want to turn into a hyperlink and then press the check mark button. 
         */
        if (text.anchorNode.data !== text || (text.baseNode === undefined && text.anchorNode.data !== text)) {
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

    /*openmenu for code block
    function openMenu(id) {
        document.getElementById(id).classList.toggle("active");
    }*/

    function confirmLink(linkType) {
        if (linkType == 'Link') {
            setUrl();
        } else if (linkType == 'Image') {
            insertImage();
        } else if (linkType == 'Video') {
            embedVideo();
        } else {}
    }

    //Main function to create new code block
    function addCodeBlock(lang,id) {
        setAnchorEl(null);
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
    
    //
    
    
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
    

    /*
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
    */

    function addLineAfterBlock(id) {
        const block = document.getElementById(`${id}`);
        const div = document.createElement('span');
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
        

        //Event Listener to change math block value when there is user input
        //May be beneficial when saving documents, since value itself is changed
        mathBlock.addEventListener('input', (ev) => {
            mathBlock.setValue(ev.target.value);
        })
        
        

        //Target is where selection/cursor is
        const target= document.getSelection();

        //Insert that math block
        insertBlockAtCursor(mathBlock, target);
        addLineAfterBlock(id);
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
    
    //open close dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    
    //
    //
    //
    //
    //
    //
    //
    //

    return (
        <div className={classes.toolbar} backgroundColor="secondary">
            <div className={classes.testToolbarItem} >
                <ButtonGroup color="secondary" variant='text' aria-label="Format" lineHeight={1.5} >
                    <IconButton className={classes.bar} onClick={e => format('bold')} 
                    aria-owns={Boolean(boldPop) ? 'bold-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleBoldPopOpen}
                    onMouseLeave={handleBoldPopClose}
                    >    
                        <FormatBoldIcon fontSize="inherit" />
                    </IconButton>
                    
                    <IconButton borderColor='white' className={classes.bar} onClick={e => format('italic')}
                    aria-owns={Boolean(italicPop) ? 'italic-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleItalicPopOpen}
                    onMouseLeave={handleItalicPopClose}>
                        <FormatItalicIcon fontSize='inherit'/>
                    </IconButton>
                    
                </ButtonGroup>
            </div>
            <div className={classes.testToolbarItem}>
                <FormControl variant="filled" className={classes.urlInput} size="small">
                    <InputLabel id="fontSelect">Font</InputLabel>
                    <Select
                    id="font_dropdown"
                    onChange={changeFont}
                    >
                    <MenuItem value={"Arial"}>Arial</MenuItem>
                    <MenuItem value={"Calibri"}>Calibri</MenuItem>
                    <MenuItem value={"Comic Sans MS"}>Comic Sans MS</MenuItem>
                    <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
                    <MenuItem value={"Roboto"}>Roboto</MenuItem>
                    <MenuItem value={"Roboto Mono"}>Roboto Mono</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" className={classes.formControl} size="small">
                    <InputLabel id="fontSizeSelect">Size</InputLabel>
                    <Select
                    id="fontsize_dropdown"
                    onChange={changeFSize}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div className={classes.testToolbarItem}>
                <FormControl variant="filled" className={classes.fontColorForm} width={140} size="small">
                    <InputLabel id="fontHighlightSelect">Highlight</InputLabel>
                    <Select
                    id="fontHighlight_dropdown"
                    onChange={highlightText}
                >
                        <MenuItem value ="#ffffff">None</MenuItem>
                        <MenuItem value ="Black">Black</MenuItem>
                        <MenuItem value="#99c2ff">Blue</MenuItem>
                        <MenuItem value="Orange">Orange</MenuItem>
                        <MenuItem value="#ff9999">Red</MenuItem>
                        <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" className={classes.fontColorForm} size="small">
                    <InputLabel id="fontColorSelect">Color</InputLabel>
                    <Select
                    id="fontColor_Dropdown"
                    onChange={changeFColor}
                    >
                        <MenuItem value ="Black">Black</MenuItem>
                        <MenuItem value ="#ffffff">White</MenuItem>
                        <MenuItem value="#99c2ff">Blue</MenuItem>
                        <MenuItem value="Orange">Orange</MenuItem>
                        <MenuItem value="#ff9999">Red</MenuItem>
                        <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <div className={classes.testToolbarItem}>
                <IconButton className={classes.bar} onClick={e => bulletPoint()}
                aria-owns={Boolean(listPop) ? 'list-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleListPopOpen}
                onMouseLeave={handleListPopClose}
                >
                    <FormatListBulletedIcon />
                </IconButton>
            </div>
            <div className={classes.testToolbarItem}>
                <ButtonGroup color="secondary" variant="text"  aria-label="Format">
                    <IconButton className={classes.bar} onClick={e => document.execCommand('justifyLeft', false)}
                    aria-owns={Boolean(leftAlignPop) ? 'align-left-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleLeftAlignPopOpen}
                    onMouseLeave={handleLeftAlignPopClose}
                    >
                        <FormatAlignLeftIcon />
                    </IconButton>
            
                    <IconButton className={classes.bar} onClick={e => document.execCommand('justifyCenter', false)}
                    aria-owns={Boolean(centerAlignPop) ? 'align-center-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleCenterAlignPopOpen}
                    onMouseLeave={handleCenterAlignPopClose}
                    >
                        <FormatAlignCenterIcon />
                    </IconButton>

                    <IconButton className={classes.bar} onClick={e => document.execCommand('justifyRight', false)}
                    aria-owns={Boolean(rightAlignPop) ? 'align-right-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleRightAlignPopOpen}
                    onMouseLeave={handleRightAlignPopClose}
                    >
                        <FormatAlignRightIcon />
                    </IconButton>

                    <IconButton className={classes.bar} onClick={e => document.execCommand('justifyFull', false)}
                    aria-owns={Boolean(justAlignPop) ? 'align-justified-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleJustAlignPopOpen}
                    onMouseLeave={handleJustAlignPopClose}
                    >
                        <FormatAlignJustifyIcon />
                    </IconButton>
                </ButtonGroup>
            </div>
            <div className={classes.testToolbarItem}>
                <div className={classes.testToolbarItem}>
                    <IconButton className={classes.bar} onClick={e => addLink()}
                    aria-owns={Boolean(urlPop) ? 'url-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleUrlPopOpen}
                    onMouseLeave={handleUrlPopClose}
                    >
                        <InsertLinkIcon />
                    </IconButton>
                </div>
                <div id='url-input' className={classes.testToolbarItem} display='none' >
                    <FormControl className={classes.urlInput} variant="filled" size="small" >
                        <InputLabel htmlFor="textFormatUrl">URL</InputLabel>
                        <FilledInput id="textFormatUrl" placeholder="URL"/>
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="dropdownMenu">Type*</InputLabel>
                        <Select padding={'1em'}
                        size="small"
                        margin="dense"
                        labelId="dropdownMenu"
                        id="ddMenuLink"
                        value={linkType}
                        onChange={handleSelectChange}
                        label="Type"
                        required={true}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Link'}>Link</MenuItem>
                        <MenuItem value={'Image'}>Image</MenuItem>
                        <MenuItem value={'Video'}>Video</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton className={classes.bar} onClick={e => confirmLink(linkType)}>
                        <CheckIcon />
                    </IconButton>
                </div>   
            </div>

            <div className={classes.testToolbarItem}>
                <IconButton className={classes.bar} onClick={e => setHeader()}
                aria-owns={Boolean(headerPop) ? 'header-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleHeaderPopOpen}
                onMouseLeave={handleHeaderPopClose}
                >
                    <TextFieldsIcon />
                </IconButton>
            </div>=
            <div className={classes.testToolbarItem}>
                <IconButton className={classes.bar} onClick={handleCodeClick}
                aria-owns={Boolean(codePop) ? 'code-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleCodePopOpen}
                onMouseLeave={handleCodePopClose}
                >
                    <CodeIcon />
                </IconButton>
                <Menu
                    id="code_languge_dropdown"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCodeClose}
                >
                    <MenuItem onClick={e => addCodeBlock("ace/mode/javascript")}>JavaScript</MenuItem>
                    <MenuItem onClick={e => addCodeBlock("ace/mode/java")}>Java</MenuItem>
                    <MenuItem onClick={e => addCodeBlock("ace/mode/python")}>Python</MenuItem>
                    <MenuItem onClick={e => addCodeBlock("ace/mode/c_cpp")}>C++</MenuItem>
                </Menu>
            </div>
            <div className={classes.testToolbarItem}>
                <IconButton className={classes.bar} onClick={e => addEquation()}
                aria-owns={Boolean(mathPop) ? 'math-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleMathPopOpen}
                onMouseLeave={handleMathPopClose}
                >
                    <FunctionsIcon />
                </IconButton>
            </div>
            <div className={classes.testToolbarItem}>
                <IconButton className={classes.bar} onClick={e => handleClickOpen()}
                aria-owns={Boolean(savePop) ? 'save-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleSavePopOpen}
                onMouseLeave={handleSavePopClose}
                >
                    <SaveAltIcon />
                </IconButton>
                <SaveDialog
                open={open}
                handleClickOpen= {handleClickOpen}
                handleClose={handleClose}
                ></SaveDialog>
            </div>
            <Popover
                id="bold-popover"
                className={classes.popover}
                open={Boolean(boldPop)}
                anchorEl={boldPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleBoldPopClose}
            >
                <Typography>Bold</Typography>
            </Popover>
            <Popover
                id="italic-popover"
                className={classes.popover}
                open={Boolean(italicPop)}
                anchorEl={italicPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleItalicPopClose}
            >
                <Typography>Italic</Typography>
            </Popover>
            <Popover
                id="list-popover"
                className={classes.popover}
                open={Boolean(listPop)}
                anchorEl={listPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleListPopClose}
            >
                <Typography>Bulleted List</Typography>
            </Popover>
            <Popover
                id="align-left-popover"
                className={classes.popover}
                open={Boolean(leftAlignPop)}
                anchorEl={leftAlignPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleLeftAlignPopClose}
            >
                <Typography>Left Align</Typography>
            </Popover>
            <Popover
                id="align-center-popover"
                className={classes.popover}
                open={Boolean(centerAlignPop)}
                anchorEl={centerAlignPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleCenterAlignPopClose}
            >
                <Typography>Center Align</Typography>
            </Popover>
            <Popover
                id="align-right-popover"
                className={classes.popover}
                open={Boolean(rightAlignPop)}
                anchorEl={rightAlignPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleRightAlignPopClose}
            >
                <Typography>Right Align</Typography>
            </Popover>
            <Popover
                id="align-justified-popover"
                className={classes.popover}
                open={Boolean(justAlignPop)}
                anchorEl={justAlignPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleJustAlignPopClose}
            >
                <Typography>Justified</Typography>
            </Popover>
            <Popover
                id="url-popover"
                className={classes.popover}
                open={Boolean(urlPop)}
                anchorEl={urlPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleUrlPopClose}
            >
                <Typography>Insert URL</Typography>
            </Popover>
            <Popover
                id="header-popover"
                className={classes.popover}
                open={Boolean(headerPop)}
                anchorEl={headerPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleHeaderPopClose}
            >
                <Typography>Heading</Typography>
            </Popover>
            <Popover
                id="code-popover"
                className={classes.popover}
                open={Boolean(codePop)}
                anchorEl={codePop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleCodePopClose}
            >
                <Typography>Code Block</Typography>
            </Popover>
            <Popover
                id="math-popover"
                className={classes.popover}
                open={Boolean(mathPop)}
                anchorEl={mathPop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleMathPopClose}
            >
                <Typography>Equation</Typography>
            </Popover>
            <Popover
                id="save-popover"
                className={classes.popover}
                open={Boolean(savePop)}
                anchorEl={savePop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleSavePopClose}
            >
                <Typography>Save</Typography>
            </Popover>
        </div>
    )
    
}