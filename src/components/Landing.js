import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Image, Transformation } from "cloudinary-react";
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
    window.addEventListener("scroll", this.scrollEvent)
  }

  handleLogin = event => {
    window.location.pathname = "/home";
    window.reload();
  }

  handleHelp = event => {
    const url = "https://drive.google.com/file/d/1h7bcr-OdTgCEofncoa2L4irlYLuJ-HZS/view?usp=sharing"
    window.open(url, "_blank");
  }

  handleFeedback = event => {
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSfWzDUR2hwCOXG_Rep556ZftmB1X_aAhcXhEllW-V_umJLNjQ/viewform"
    window.open(url, "_blank");
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
    let arrow = 1 - (this.state.scroll - 200) / 150;

    if (window.innerWidth < 576) {
      tagline = 1 - this.state.scroll / 30;
      button = 1 - (this.state.scroll - 40) / 40;
    }

    if (window.innerWidth < 350) {
      arrow = 1 - (this.state.scroll - 150) / 125;
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
          <Container fluid id="arrow" className="center"
            style={{ opacity: arrow }}
          >
            <i className="fas fa-angle-double-down"></i>
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
        <Container fluid id="desktop">
          <Row noGutters={true}>
            <Col sm={8} className="center">
              <Image
                id="desktop-image"
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId="assets/desktop_qwffih.png"
              >
                <Transformation
                  quality="auto:best"
                  flags="progressive"
                />
              </Image>
            </Col>
            <Col sm={4}>
              <ul id="features">
                <li>Get rid of leftover food by posting location, picture, amount, and more</li>
                <li>Find fresh free food by browsing through posts ordered by most recent</li>
                <li>See locations of all current free food listings all at once</li>
                <li>Filter food by dietary restriction</li>
                <li>Know how many people are "going" to grab free food</li>
                <li>Indicate to others you're "going" to grab food</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container fluid id="mobile">
          <Row noGutters={true}>
            <Col sm={6} id="mobile-text" className="center">
              Swipe between views on mobile!
            </Col>
            <Col sm={6} className="center">
              <Image
                className="mobile-image"
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId="assets/mobile_posts-iphone8plus_sp1hcq.png"
              >
                <Transformation
                  quality="auto:best"
                  flags="progressive"
                />
              </Image>
              <Image
                className="mobile-image"
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId="assets/mobile_map-iphone8plus_i3oucm.png"
              >
                <Transformation
                  quality="auto:best"
                  flags="progressive"
                />
              </Image>
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
