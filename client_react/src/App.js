import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import NavBar from "./components/NavBar"
import PostPane from "./components/PostPane"
import NewPost from "./components/NewPost"
import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

import map from "./assets/images/map.png"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div id="app" className="vw-100 vh-100">
        <NavBar handleNewPost={() => this.handleOpenModal()}/>
        <Container fluid className="h-100 p-0">
          <Row fluid="true" noGutters="true" className="h-100">
            <Col id="post-pane">
              <PostPane />
            </Col>
            <Col id="map">
              <Container fluid="true" >
              </Container>
            </Col>
          </Row>
        </Container>
        <NewPost show={this.state.showModal} handleClose={() => this.handleCloseModal()}/>
      </div>
    );
  }
}

export default App;