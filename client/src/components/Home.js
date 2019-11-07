import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavBar from "./NavBar";
import Searchbar from "./main/Searchbar";
import PostsFeed from "./main/PostsFeed";
import MapPane from "./main/MapPane";

import axios from "axios";

// For CSRF token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get("https://my-json-server.typicode.com/bcatoto/freat/posts")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  render() {
    return(
      <>
        <NavBar />
        <Row fluid="true" noGutters="true">
          <Col id="post-pane" xs={12} sm={5}>
            <Searchbar />
            <PostsFeed posts={this.state.posts} />
          </Col>
          <Col id="map-pane">
            <MapPane />
          </Col>
        </Row>
      </>
    );
  }
}
