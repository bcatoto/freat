import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default class NavBar extends React.Component {
  handleClick = event => {
    this.props.openForm(true, null);
  }

  render() {
    return (
      <Navbar className="p-2" variant="dark" expand="lg">
        <Link to="/home"><Navbar.Brand className="ml-2">Freat</Navbar.Brand></Link>
        <Button
          className="mr-auto" variant="navbar"
          onClick={this.handleClick}
        >
          New post
        </Button>
        <Link to="/profile"><Button variant="navbar">Account</Button></Link>
      </Navbar>
    );
  }
}
