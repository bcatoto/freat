import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Searchbar from "./Searchbar";
import PostsFeed from "./PostsFeed";
import MapPane from "./MapPane";

import axios from "axios";

import "bootswatch/dist/custom/bootstrap.min.css";
import "./../css/custom.css";

export default class Main extends React.Component {
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
    return (
      <Row fluid="true" noGutters="true">
        <Col id="post-pane" xs={12} sm={5}>
          <Searchbar />
          <PostsFeed posts={this.state.posts} />
        </Col>
        <Col id="map-pane">
          <MapPane />
        </Col>
      </Row>
    );
  }
}
