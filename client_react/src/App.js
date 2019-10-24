import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import NavBar from './components/NavBar'
import PostPane from './components/PostPane'
import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

import map from './assets/images/map.png'

class App extends React.Component {
  render() {
      return (
        <div id="app" className="vw-100 vh-100">
          <NavBar />
          <Container fluid className="h-100 p-0">
            <Row fluid noGutters className="h-100">
              <Col id="post-pane">
                <PostPane />
              </Col>
              <Col id="map">
                <Container fluid >
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
}

export default App;
