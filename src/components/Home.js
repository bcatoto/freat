import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostsFeed from "./main/PostsFeed";
import MapPane from "./main/MapPane";

export default class Home extends React.Component {
  render() {
    return(
      <Row fluid="true" noGutters="true">
        <Col id="post-pane" xs={12} sm={5}>
          <PostsFeed posts={this.props.posts} />
        </Col>
        <Col id="map-pane">
          <MapPane posts={this.props.posts} />
        </Col>
      </Row>
    );
  }
}
