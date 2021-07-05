import React from 'react'

interface NavbarComposition {
  Container: React.FC
  Title: React.FC
  Logo: React.FC
}

const Navbar: React.FC & NavbarComposition = ({ children }) => {
  return <nav>{children}</nav>
}

const NavbarContainer: React.FC = ({ children }) => {
  return <div className='nav-container'>{children}</div>
}

const NavbarTitle: React.FC = ({ children }) => {
  return <>{children}</>
}

const NavbarLogo: React.FC = ({ children }) => {
  return <>{children}</>
}

Navbar.Container = NavbarContainer
Navbar.Title = NavbarTitle
Navbar.Logo = NavbarLogo

export default Navbar
