import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class Landing extends React.Component {
  handleClick = event => {
    window.location.pathname = "/home";
    window.reload();
  }

  render() {
    return (
      <>
        <Container fluid id="landing-image" className="p-0">
          <Container fluid id="title-container" className="p-0">
            <span className="title">Freat</span>
          </Container>
        </Container>
        <Container fluid id="login-container" className="center p-0">
          <Button variant="landing" size="lg" onClick={this.handleClick}>
            Log in through CAS
          </Button>
        </Container>
        <Container className="info-container">
          <Row>
            <Col className="center">
              <Row>
                <i className="fas fa-map-marked-alt"></i>
              </Row>
              <Row>
              </Row>
            </Col>
            <Col className="center">
              <i className="far fa-plus-square"></i>
            </Col>
          </Row>
        </Container>
        <Container fluid id="test" className="vh-100">
        </Container>
      </>
    );
  }
}
