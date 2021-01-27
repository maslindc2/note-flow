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


export default function Toolbar() {

    //TODO: Populate these methods
    function format(com, val) {
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


    function setUrl(e) {
        e.preventDefault()
        const url = document.getElementById('txtFormatUrl').value;
        const show = document.getElementById('url-input');
        const text = document.getSelection();
        format(
            'insertHTML',
            `<a href='${url}' target='_blank'>${text}
            </a>`
        );
        document.getElementById('txtFormatUrl').value = '';
        show.classList.add('hidden');
    }

    function setHeader() {
        const target = document.getSelection();
        format('insertHTML', `<h2>${target}</h2>`);
    }

    //Vito's working on this method
    function addCodeBlock() {
        try {
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
            addLineAfterBlock(id)
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

    //Someone is researching this one I think
    function addEquation() { }

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
                <button onClick="setUrl(e)">
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