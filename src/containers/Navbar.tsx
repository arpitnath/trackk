import React from 'react'
import { Navbar } from '../components'

const NavbarContainer: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Container>
        <Navbar.Logo>
          <span
            className='iconify'
            data-icon='emojione:pen'
            data-inline='false'></span>
        </Navbar.Logo>
        <Navbar.Title>trackk</Navbar.Title>
      </Navbar.Container>
    </Navbar>
  )
}

export default NavbarContainer
