import { Navbar, Container } from 'react-bootstrap';
import '../../assets/Nav.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import LogoutButton from './LogoutButton.jsx';

const Nav = () => (
  <Navbar bg="white" className="p-3 shadow">
    <Container>
      <Navbar.Brand>
        <Link to="/" className="brand-link">MyChat</Link>
      </Navbar.Brand>
      <LogoutButton />
    </Container>
  </Navbar>
);

export default Nav;
