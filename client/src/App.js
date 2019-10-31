import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavBar from "./components/NavBar";
import PostPane from "./components/PostPane";
import MapPane from "./components/MapPane";
import NewPost from "./components/NewPost";

import axios from "axios";

import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      posts: []
    };
  }

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/bcatoto/freat/posts')
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
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
        <Container fluid className="h-90 p-0">
          <Row fluid="true" noGutters="true" className="h-100">
            <Col id="post-pane">
              <PostPane posts={this.state.posts}/>
            </Col>
            <Col>
              <MapPane />
            </Col>
          </Row>
        </Container>
        <NewPost show={this.state.showModal} handleClose={() => this.handleCloseModal()}/>
      </div>
    );
  }
}

export default App;
