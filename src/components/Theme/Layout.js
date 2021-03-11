import React, { useContext } from "react"
import AppBarDrawer from "../Navigation/AppBarDrawer"
import ThemeContext from "./ThemeContext"
import darkTheme from "./darkTheme"

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext)
  
  return (
    <>
      <AppBarDrawer />
      {children}
    </>
  )
}

export default Layout