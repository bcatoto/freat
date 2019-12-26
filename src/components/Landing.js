import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import app from "../assets/app.png"; // with import

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollEvent)
  }

  handleClick = event => {
    window.location.pathname = "/home";
    window.reload();
  }

  scrollEvent = event => {
    if (window.scrollY < 500) {
      this.setState({ scroll: window.scrollY });
    }
  }

  renderNavbarButton() {
    const button = (this.state.scroll - 90) / 200;

    if (window.innerWidth < 576) {
      return (
        <Button variant="landing-navbar"
          style={{ opacity: button }}
          onClick={this.handleClick}
        >
          <i className="fas fa-sign-in-alt"></i>
        </Button>
      );
    }
    else {
      return (
        <Button variant="landing-navbar"
          style={{ opacity: button }}
          onClick={this.handleClick}
        >
          Log in through CAS
        </Button>
      );
    }
  }

  render() {
    const tagline = 1 - this.state.scroll / 40;
    const button = 1 - (this.state.scroll - 65) / 50;

    return (
      <Container fluid className="p-0">
        <Container fluid id="landing-image" className="p-0">
          <Container fluid id="title">
            Freat
          </Container>
          <Container fluid id="tagline" style={{ opacity: tagline }}>
            Find free food fast.
          </Container>
          <Container fluid id="login-container">
            <Button variant="landing"
              style={{ opacity: button }}
              onClick={this.handleClick}
            >
              Log in through CAS
            </Button>
          </Container>
          {this.renderNavbarButton()}
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
        <Container fluid>
          <Row>
            <Col sm={8} className="center">
              <img id="app-image" src={app} />
            </Col>
            <Col sm={4}>
              <ul id="features">
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container fluid id="dev-container">
          <Container fluid id="dev" className="center">
            Developers
          </Container>
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
      </Container>
    );
  }
}
