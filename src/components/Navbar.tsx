import React from 'react'
import { Children } from '../utils/types'

interface INavbar extends React.FC {
  children?: Children
  Container: React.FC<Children>
  Title: React.FC<{ children: string }>
  Logo: React.FC<Children>
}

const Navbar: INavbar = ({ children }) => {
  return <nav>{children}</nav>
}

Navbar.Container = function NavbarContainer({ children }) {
  return <div className='nav-container'>{children}</div>
}

Navbar.Title = function NavbarTitle({ children }) {
  return <>{children}</>
}

Navbar.Logo = function NavbarLogo({ children }) {
  return <>{children}</>
}

export default Navbar
