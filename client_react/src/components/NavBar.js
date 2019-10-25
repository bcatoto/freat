import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar className="p-2 bg-primary" variant="dark" expand="lg">
      <Navbar.Brand className="ml-2" href="#home">Freat</Navbar.Brand>
      <Button
        className="mr-auto" variant="navbar"
      >
        New post
      </Button>
      <Button variant="navbar">Login</Button>
    </Navbar>
  );
}
