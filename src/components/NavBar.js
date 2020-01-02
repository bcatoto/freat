import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

export default class NavBar extends React.Component {
  handleNewPost = event => {
    this.props.openForm(true, null);
  }

  handleHelp = event => {
    const url = "https://docs.google.com/document/d/1ZcYP3hfcf65dW5c_q96ewH-gWtcj4WHrgK-nxapdxes/edit?usp=sharing"
    window.open(url, '_blank');
  }

  handleFeedback = event => {
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSe2XUCkr4xcpSsqwmo2cEHwrBPaI7G7Dh8kmoWjAo7r7uo4Gw/viewform"
    window.open(url, '_blank');
  }

  handleLogOut = event => {
    window.location.pathname = "/logout";
    window.reload();
  }

  render() {
    return (
      <Navbar className="p-2" variant="dark" expand="lg">
        <Navbar.Brand as={Link} className="ml-2" to="/home">
          Freat
        </Navbar.Brand>
        <Button className="mr-auto" variant="navbar"
          onClick={this.handleNewPost}
        >
          <i className="fas fa-plus mr-2"></i>
          New Post
        </Button>
        <Button variant="navbar-icon" onClick={this.handleHelp}>
          <i className="far fa-question-circle"></i>
        </Button>
        <Button variant="navbar-icon" onClick={this.handleFeedback}>
          <i className="far fa-comment-dots"></i>
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
