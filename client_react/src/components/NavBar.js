import React from "react";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
  return (
    <Navbar className="bg-primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Freat</Navbar.Brand>
      <Button className="mr-auto" variant="primary">New post</Button>
      <Button variant="primary">Login</Button>
    </Navbar>
  );
}
