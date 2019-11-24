import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

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
        <Dropdown alignRight>
          <Dropdown.Toggle as={Button} variant="navbar">
            <i class="fas fa-user p-0 m-0"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="account-dropdown-menu">
            <Dropdown.Item>
              <Link className="btn-profile" to="/profile">
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  }
}
