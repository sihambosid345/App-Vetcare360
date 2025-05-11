import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './global.css'; 

const Layout = () => {
  return (
    <>
      {/* Navbar shared */}
      {/* Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <Navbar.Brand as={Link} to="/">
                <img
        src="/images/oh regarde ca.png"
        alt="Spring Logo"
        height="30"
        className="d-inline-block align-top"
      />
      {' '}
                  spring
                </Navbar.Brand>
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/">HOME</Nav.Link>
                  <Nav.Link as={Link} to="/owner-search">FIND OWNERS</Nav.Link>
                  <Nav.Link as={Link} to="/vets">VETERINARIANS</Nav.Link>
                  <Nav.Link as={Link} to="/error">ERROR</Nav.Link>
                  

                </Nav>
              </Container>
            </Navbar>

      {/* Page content will appear here */}
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
