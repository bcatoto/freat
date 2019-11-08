import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavBar from "./NavBar";
import Searchbar from "./main/Searchbar";
import PostsFeed from "./main/PostsFeed";
import MapPane from "./main/MapPane";

export default function Home(props) {
  return(
    <Row fluid="true" noGutters="true">
      <Col id="post-pane" xs={12} sm={5}>
        <Searchbar />
        <PostsFeed posts={props.posts} />
      </Col>
      <Col id="map-pane">
        <MapPane />
      </Col>
    </Row>
  );
}
