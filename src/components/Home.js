import React from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostsFeed from "./home/PostsFeed";
import Map from "./home/Map";

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getUserData();
    this.refreshPosts();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshPosts);
  }

  refreshPosts = async () => {
    await this.props.getPosts();
    setTimeout(this.refreshPosts, 60 * 1000);
  }

  render() {
    if (window.innerWidth < 576) {
      return (
        <SwipeableViews enableMouseEvents className="h-100 w-100">
          <Container fluid className="p-0">
            <PostsFeed
              deletePost={this.props.deletePost}
              changeFilter={this.props.changeFilter}
              likePost={this.props.likePost}
              likes={this.props.likes}
              netid={this.props.netid}
              posts={this.props.posts}
              unlikePost={this.props.unlikePost}
            />
          </Container>
          <Container fluid id="map-pane" className="p-0">
            <Map posts={this.props.posts} />
          </Container>
        </SwipeableViews>
      );
    }
    else {
      return (
        <Row fluid="true" noGutters="true">
          <Col id="post-pane" xs={12} sm={5}>
            <PostsFeed
              deletePost={this.props.deletePost}
              changeFilter={this.props.changeFilter}
              likePost={this.props.likePost}
              likes={this.props.likes}
              netid={this.props.netid}
              posts={this.props.posts}
              unlikePost={this.props.unlikePost}
            />
          </Col>
          <Col id="map-pane">
            <Map posts={this.props.posts} />
          </Col>
        </Row>
      );
    }
  }
}
