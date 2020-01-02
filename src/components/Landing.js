import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Image, Transformation } from 'cloudinary-react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  handleLogin = event => {
    window.location.pathname = "/home";
    window.reload();
  }

  handleHelp = event => {
    const url = "https://docs.google.com/document/d/1ZcYP3hfcf65dW5c_q96ewH-gWtcj4WHrgK-nxapdxes/edit?usp=sharing"
    window.open(url, '_blank');
  }

  handleFeedback = event => {
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSe2XUCkr4xcpSsqwmo2cEHwrBPaI7G7Dh8kmoWjAo7r7uo4Gw/viewform"
    window.open(url, '_blank');
  }

  scrollEvent = event => {
    if (window.scrollY < 500) {
      this.setState({ scroll: window.scrollY });
    }
  }

  render() {
    let tagline = 1 - this.state.scroll / 40;
    let button = 1 - (this.state.scroll - 65) / 50;
    const dropdown = (this.state.scroll - 90) / 200;

    if (window.innerWidth < 576) {
      tagline = 1 - this.state.scroll / 30;
      button = 1 - (this.state.scroll - 40) / 40;
    }

    return (
      <Container fluid className="p-0">
        <Container fluid id="landing-image" className="p-0">
          <Container fluid id="landing-title">
            <Image
              id="logo"
              cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
              publicId="assets/logo_gqeug8.png"
            >
              <Transformation
                quality="auto:best"
                flags="progressive"
              />
            </Image>
            Freat
          </Container>
          <Container fluid id="tagline" style={{ opacity: tagline }}>
            Find free food fast.
          </Container>
          <Container fluid id="login-container">
            <Button variant="landing"
              style={{ opacity: button }}
              onClick={this.handleLogin}
            >
              Log in through CAS
            </Button>
          </Container>
          <Dropdown as={ButtonGroup} alignRight className="landing-dropdown"
            style={{ opacity: dropdown }}
          >
            <Button variant="landing-navbar" onClick={this.handleLogin}>
              Login
            </Button>
            <Dropdown.Toggle split variant="landing-navbar-dropdown"/>
            <Dropdown.Menu className="landing-dropdown-menu">
              <Dropdown.Item className="landing-dropdown-item"
                onClick={this.handleHelp}
              >
                Help
              </Dropdown.Item>
              <Dropdown.Item className="landing-dropdown-item"
                onClick={this.handleFeedback}
              >
                Feedback
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
        <Container fluid id="info">
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
          <Row noGutters={true}>
            <Col sm={8} className="center">
              <Image
                id="app-image"
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId="assets/app_xhwzwd.png"
              >
                <Transformation
                  quality="auto:best"
                  flags="progressive"
                />
              </Image>
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
        <Container fluid id="developers">
          <Container fluid id="dev-title" className="center">
            Developers
          </Container>
          <Container fluid className="p-0">
            <Row className="center">
              <Col sm className="dev-col center" >
                <Image
                  className="dev"
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                  publicId="assets/bianca_circle_vqtti9.png"
                >
                  <Transformation
                    quality="auto:best"
                    flags="progressive"
                  />
                </Image>
                <strong>Bianca Catoto</strong>
                <span className="dev-info">BSE Computer Science '21</span>
              </Col>
              <Col sm className="dev-col center">
                <Image
                  className="dev"
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                  publicId="assets/claire_circle_nlx3ru.png"
                >
                  <Transformation
                    quality="auto:best"
                    flags="progressive"
                  />
                </Image>
                <strong>Claire Dong</strong>
                <span className="dev-info">BSE Electrical Engineering '21</span>
              </Col>
              <Col sm className="dev-col center">
                <Image
                  className="dev"
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                  publicId="assets/ibrahim_circle_mnsfhq.png"
                >
                  <Transformation
                    quality="auto:best"
                    flags="progressive"
                  />
                </Image>
                <strong>Ibrahim Hashmi</strong>
                <span className="dev-info">BSE Electrical Engineering '21</span>
              </Col>
              <Col sm className="dev-col center">
                <Image
                  className="dev"
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                  publicId="assets/gilron_circle_dvmqvd.png"
                >
                  <Transformation
                    quality="auto:good"
                    flags="progressive"
                  />
                </Image>
                <strong>Gilron Tsabkevich</strong>
                <span className="dev-info">BSE Computer Science '21</span>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid id="credits">
          &copy; Freat 2019. All Rights Reserved.<br/>
          Photo credits to Hongkongfoodlover123 [<a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>], <a href="https://commons.wikimedia.org/wiki/File:New_Punjab_Club_food_spread.jpg">via Wikimedia Commons</a>
        </Container>
      </Container>
    );
  }
}
