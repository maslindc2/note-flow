/*Provides a Firebase provider instance at the
  top-level of our component hierarchy to avoid
  making duplicate instances
*/

import React from 'react';
 
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
 
export default FirebaseContext;