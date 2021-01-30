import React from 'react'
import './Toolbar.css'

import Icon from 'react-icons-kit'
import { bold } from 'react-icons-kit/iconic/bold'
import { italic } from 'react-icons-kit/iconic/italic'
import { list } from 'react-icons-kit/iconic/list'
import { link } from 'react-icons-kit/iconic/link'
import { check } from 'react-icons-kit/iconic/check'
import { header } from 'react-icons-kit/iconic/header'
import { code } from 'react-icons-kit/iconic/code'
import { plus } from 'react-icons-kit/iconic/plus'
import { download } from 'react-icons-kit/iconic/download'

import { MathfieldComponent } from 'react-mathlive'
import Mathlive from 'mathlive'
import {Mathfield, MathfieldElement} from 'mathlive'



export default function Toolbar() {

    //TODO: Populate these methods
    function format(com, val) {
        document.getElementById('editor').focus();
        document.execCommand(com, false, val);
    }

    function addLink() {
        const show = document.getElementById('url-input');
        if (show.classList.contains('hidden')) {
            show.classList.remove('hidden');
        } else {
            show.classList.add('hidden');
        }
    }

    function setUrl() {

        var inputVal = document.getElementById('textFormatUrl').value;
        const text = document.getSelection();
        const show = document.getElementById('url-input');
        
        
        //Creates hyperlink
        format(
            'insertHTML', `<a href='${inputVal}' target='_blank'>${text}</a>`
        );

        //This makes the url input tag blank again. I could use "" or '' but JS thinks strings are the same as null
        inputVal = "";
        document.getElementById('textFormatUrl').value = " ";

        //hides the input tag again 
        show.classList.add('hidden');
    }

    function setHeader() {
        const target = document.getSelection();
        format('insertHTML', `<h2>${target}</h2>`);
    }

    function addCodeBlock() {
        try {
            var next_line= document.getElementById('editor');
            format(
                'insertParagraph',
                `<pre class='editor' id='${next_line}'</pre>`
            );
            const codeBlock = document.createElement('pre');
            const target = document.getSelection();
            if (
                target.focusNode.nodeName.includes('#text') ||
                target.focusNode.classList.contains('title') ||
                target.focusNode.className.includes('codeBlock')
            ) {
                return
            }
            const id = `codeBlock-${document.getElementsByClassName('codeBlock').length + 1}`;           
             codeBlock.classList.add('codeBlock')

            format(
                'insertHTML',
                `<pre class='codeBlock' id='${id}'>${target}</pre>`
            );
            addLineAfterBlock(id);     
        } catch {
            document.getElementById('editor').innerHTML = "Please select the editor area before using this function!"
        }
    }
    

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

    //Emily working on this. Uses the Mathlive library and API
    function addEquation() {

        //Focus on editor, insert line
        document.getElementById('editor').focus();
        var next_line= document.getElementById('editor');
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
            virtualKeyboardMode: "off",
            //virtualKeyboards: "all",
            //virtualKeyboardTheme: "",
            //virtualKeyboardLayout: "auto",
            //virtualKeyboardToolbarOptions: "default",
            smartMode: true,
            smartFence: true,
            resetStyle: true,
            selectionMode: "beforeendr",
        });
        mathBlock.setAttribute("resetStyle", "true");
        mathBlock.setAttribute("id",
            `mathBlock-${document.getElementsByClassName('mathBlock').length + 1}`);
        const id = mathBlock.id;
        mathBlock.setAttribute("class", 'mathBlock');

        //Added event listener for when you exit out of math block using arrow
        //key
        mathBlock.addEventListener('focus-out', (ev) => {
            if (ev.detail.direction == "forward") {

                document.getElementById('editor').focus();
                var next_line= document.getElementById('editor');
                format(
                    'insert',
                    `<pre class='editor' id='${next_line}'</pre>`
                );
            } else if (ev.detail.direction == "backward") {
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
                range.insertNode( document.createTextNode(text) );
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
                while ( (node = el.firstChild) ) {
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
        } else if ( (sel = document.selection) && sel.type != "Control") {
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


    //
    //
    //
    //
    //
    //
    //
    //



    //Temporary code for storing title and content into a txt file
    function handleSave() {
        const content = document.getElementById('editor').innerHTML;
        const title = document.getElementById('title').textContent;

        let data =
            '\r' + title + ' \r\n' +
            '\r\n' + content + ' \r\n';
        const textToBLOB = new Blob([data], { type: 'text/plain' });
        const sFileName = 'noteOutput.txt';

        let newLink = document.createElement("a");
        newLink.download = sFileName;
        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click();
    }

    //Zach handling saving method
    function handleSave() { }
    /**
     * Use icons from react-icons-kit for the toolbar instead of win98 buttons for the toolbar
     * this will require npm add react-icons-kit
     */

    return (
        <div className='toolbar'>
            <button onClick={e => format('bold')}>
                <Icon icon={bold} />
            </button>
            <button onClick={e => format('italic')}>
                <Icon icon={italic} />
            </button>
            <button onClick={e => format('insertUnorderedList')}>
                <Icon icon={list} />
            </button>

            <button onClick={e => addLink()}>
                <Icon icon={link} />
            </button>
            <div id='url-input' className='hidden'>
                <input id='textFormatUrl' placeholder='url' />
                <button onClick={e => setUrl(e)}>
                    <Icon icon={check} />
                </button>
            </div>
            <button onClick={e => setHeader()}>
                <Icon icon={header} />
            </button>
            <button onClick={e => addCodeBlock()}>
                <Icon icon={code} />
            </button>


            <button onClick={e => addEquation()}>
                <Icon icon={plus} />
            </button>


            <button onClick={e => handleSave()}>
                <Icon icon={download} />
            </button>
        </div>
    )
}