import { Navbar, Container } from 'react-bootstrap';
import '../../assets/Nav.scss';
import { Link } from 'react-router-dom';
import React from 'react';

const Nav = () => (
  <Navbar bg="white" fixed="top" className="p-3 shadow">
    <Container>
      <Navbar.Brand>
        <Link to="/" className="brand-link">MyChat</Link>
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Nav;
