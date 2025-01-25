import React from "react";
import { Navbar, Container } from "react-bootstrap";

const MoviesNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mx-3 rounded">
      <Container>
        <Navbar.Brand href="/dashboard">Glance Care</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default MoviesNavbar;
