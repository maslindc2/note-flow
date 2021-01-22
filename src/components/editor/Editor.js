import React from 'react';
import Toolbar from '../toolbar/Toolbar'
import './Editor.css';

//Editor function
export default function Editor() {
    
    //This will be our own function for pasting default pasting keeps styling of what you are copying
    function paste(e) { }

    //Return the content from Toolbar and Editor this goes to App.js
    return (
        <React.Fragment>
            <Toolbar />
            <div
                id='title'
                contentEditable='true'
                data-placeholder='Title...'
                className='title'
            ></div>
            <div
                className='editor'
                id='editor'
                contentEditable='true'
                data-placeholder='Body...'
                onPaste={(e) => paste(e)}
            ></div>
        </React.Fragment>
    )
}