import React from 'react'
import HomeContent from './homePageContent'
import './Homepage.css'
//What user sees as the home page of our app

class HomePage extends React.Component {
  render() {
    return (
      <div id="homeWrapper">
        <h1 id={"homeTitle"}>Home Page</h1>
        <h3 id={"homeSubtitle"}>Welcome to Note Flow!</h3>
        <HomeContent />
      </div>
    )
  }
}export default HomePage