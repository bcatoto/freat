import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import app from "../assets/app.png";
import bianca from "../assets/bianca_circle.png";
import claire from "../assets/claire_circle.png";
import ibrahim from "../assets/ibrahim_circle.png";
import gilron from "../assets/gilron_circle.png";

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
              <img alt="Freat app" id="app-image" src={app} />
            </Col>
            <Col sm={4}>
              <ul id="features">
                <li>Get rid of leftover food by posting its location, picture, amount, and more</li>
                <li>Find fresh free food by browsing through posts ordered by most recent post</li>
                <li>See locations of all current free food listings all at once</li>
                <li>Know how many people are "going" to grab free food</li>
                <li>Indicate to others you're "going" to grab food</li>
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
                <img alt="Bianca Catoto" src={bianca} />
                <strong>Bianca Catoto</strong>
                <span className="dev-info">BSE Computer Science '21</span>
              </Col>
              <Col sm className="dev-col center">
                <img alt="Claire Dong" src={claire} />
                <strong>Claire Dong</strong>
                <span className="dev-info">BSE Electrical Engineering '21</span>
              </Col>
              <Col sm className="dev-col center">
                <img alt="Ibrahim Hashmi" src={ibrahim} />
                <strong>Ibrahim Hashmi</strong>
                <span className="dev-info">BSE Electrical Engineering '21</span>
              </Col>
              <Col sm className="dev-col center">
                <img alt="Gilron Tsabkevich" src={gilron} />
                <strong>Gilron Tsabkevich</strong>
                <span className="dev-info">BSE Computer Science '21</span>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid id="users-guide" className="center">
          <a href="empty">User's Guide</a>
        </Container>
      </Container>
    );
  }
}
