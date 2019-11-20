import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  handleClick = event => {
    window.location.pathname = '/home'
  }

  render() {
    return (
      <Container fluid id="profile" className="p-0">
        <Link to="/home">
          <Button variant="navbar"
            onChange={this.handleClick}>
            Freat
          </Button>
        </Link>
      </Container>
    );
  }
}
