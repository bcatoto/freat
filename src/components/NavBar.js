import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

export default class NavBar extends React.Component {
  handleNewPost = event => {
    this.props.openForm(true, null);
  }

  handleLogOut = event => {
    window.location.pathname = "/logout";
    window.reload();
  }

  render() {
    return (
      <Navbar className="p-2" variant="dark" expand="lg">
        <Link to="/home"><Navbar.Brand className="ml-2">Freat</Navbar.Brand></Link>
        <Button
          className="mr-auto" variant="navbar"
          onClick={this.handleNewPost}
        >
          <i className="fas fa-plus mr-2"></i>
          New Post
        </Button>
        <Dropdown alignRight>
          <Dropdown.Toggle as={Button} variant="navbar">
            <i className="fas fa-user p-0 m-0"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="account-dropdown-menu">
            <Dropdown.Item as={Link} className="btn-profile" to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={this.handleLogOut}>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  }
}
