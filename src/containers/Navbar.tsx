import { Navbar } from '../components'

const NavbarContainer = () => {
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
