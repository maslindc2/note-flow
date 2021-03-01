import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Firebase, { FirebaseContext } from './components/Firebase';
import App from './App';



//top level of our app
//Firebase is provided at the top level and all components have access to it. 
//This way we avoid it being provided more than once

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
   <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
