import React, { useContext } from 'react';
import ToolbarInner from '../toolbar/Toolbar'
import './Editor.css';
import AppBarDrawer from "../Navigation/AppBarDrawer";
import userInner from "../UserInfo/userInfo"
import ThemeContext from '../Theme/ThemeContext';

//Editor function
export default function Editor() {
    function paste(e) {
        e.preventDefault();
        const open = new RegExp('<', 'gi');
        const close = new RegExp('>', 'gi');
        const text = (e.originalEvent || e).clipboardData
            .getData('text/plain')
            .replace(open, '&lt')
            .replace(close, '&gt');
        document.execCommand('insertHTML', false, text)

    }
    

    //Return the content from Toolbar and Editor this goes to App.js
    return (
        <React.Fragment>

            <div class={"wrap"}>
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

            </div>

        </React.Fragment>
    )
}

