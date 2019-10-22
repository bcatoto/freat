import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBar from './components/NavBar'
import PostPane from './components/PostPane'
import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

class App extends React.Component {
  render() {
      return (
        <div className="App">
          <NavBar />
          <div className="no-padding container-col" fluid={true}>
            <Row className="container-row">
              <Col>
                <PostPane />
              </Col>
              <Col className="container-row">
                right
              </Col>
            </Row>
          </div>
        </div>
      );
  }
}

export default App;
