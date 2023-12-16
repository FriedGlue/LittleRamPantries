import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navbar.css'

import LRPLogo from '../../assets/ram-pantry.png'

function NavbarScroll() {
  return (
    <Navbar sticky="top" expand="lg" >
      <Container>
        <Navbar.Brand href="#home" >
              <img
              alt="LRP logo"
              src={LRPLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            /> Little Ram Pantries</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="https://news.vcu.edu/article/2021/10/little-ram-pantries-will-provide-emergency-food-assistance-to-vcu-students">Learn More</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
 }

export default NavbarScroll;
