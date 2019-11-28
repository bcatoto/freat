import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  handleClick = event => {
    window.location.pathname = '/home'
  }

  render() {
    return (
      <>
        <Container fluid id="landing-image" className="p-0">
          <Container fluid id="title-container" className="p-0">
            <span className="title">Freat</span>
          </Container>
        </Container>
        <Container fluid id="login-container" className="p-0">
          <Button as={Link} to="/home" variant="landing" size="lg"
            onChange={this.handleClick}>
            Log in through CAS
          </Button>
        </Container>
        <Row>
          <Col>
            <i className="fas fa-map-marked-alt"></i>
          </Col>
          <Col>
          </Col>
        </Row>
        <Container fluid id="test" className="vh-100">
        </Container>
      </>
    );
  }
}
