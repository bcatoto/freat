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
        <Container fluid id="login-container" className="center">
          <Button variant="landing" size="lg" onClick={this.handleClick}>
            Log in through CAS
          </Button>
        </Container>
        <Container fluid>
          <Row className="center">
            <Col sm className="info-col center" >
              <i className="fas fa-utensils"></i>
              Be the first to find out about free food on campus!
            </Col>
            <Col sm className="info-col center">
              <i className="fas fa-map-marked-alt"></i>
              Know where all free food is located in an instant!
            </Col>
            <Col sm className="info-col center">
              <i className="far fa-plus-square"></i>
              Have leftovers? Simply make a post and share your food with hungry students!
            </Col>
          </Row>
        </Container>
        <Container fluid id="dev-container">
          <Container fluid className="p-0">
            <Row className="center">
              <Col sm className="dev-col center" >
                <span className="center">
                  <strong>Bianca Catoto</strong><br/>
                  BSE Computer Science '21
                </span>
              </Col>
              <Col sm className="dev-col center">
                <span className="center">
                  <strong>Claire Dong</strong><br/>
                  BSE Electrical Engineering '21
                </span>
              </Col>
              <Col sm className="dev-col center">
                <span className="center">
                  <strong>Ibrahim Hashmi</strong><br/>
                  BSE Electrical Engineering '21
                </span>
              </Col>
              <Col sm className="dev-col center">
                <strong>Gilron Tsabkevich</strong><br/>
                BSE Computer Science '21
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}
