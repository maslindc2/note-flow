import React from 'react'
import './Toolbar.css'
export default function Toolbar() {

    //TODO: Populate these methods
    function format() { }
    function addLink() { }
    function setUrl() { }
    function setHeader() { }

    //Vito's working on this method
    function addCodeBlock() { }

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
            <button onClick={e => format('bold')}>Bold</button>
            <button onClick={e => format('italic')}>Italics</button>
            <button onClick={e => format('insertUnorderedList')}>
                List
            </button>

            <button onClick={e => addLink()}>Link</button>
            <div id='url-input' className='hidden'>
                <input id='txtFormatUrl' placeholder='url' />
                <button onClick={e => setUrl()}>Header</button>
            </div>
            <button onClick={e => setHeader()}>Header</button>
            <button onClick={e => addCodeBlock()}>CodeBlock</button>
            <button onClick={e => addEquation()}>Equation</button>
            <button onClick={e => handleSave()}>Save</button>
        </div>
    )
}