import React from "react";
import { Link } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function NavBar(props) {
  return (
    <Navbar className="p-2 bg-primary" variant="dark" expand="lg">
      <Link to='/'><Navbar.Brand className="ml-2">Freat</Navbar.Brand></Link>
      <Button
        className="mr-auto" variant="navbar"
        onClick={props.handleNewPost}
      >
        New post
      </Button>
      <Link to='/profile'><Button variant="navbar">Account</Button></Link>
    </Navbar>
  );
}
