import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostsFeed from "./main/PostsFeed";
import MapPane from "./main/MapPane";

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
    return(
      <Row fluid="true" noGutters="true">
        <Col id="post-pane" xs={12} sm={5}>
          <PostsFeed
            deletePost={this.props.deletePost}
            likePost={this.props.likePost}
            likes={this.props.likes}
            netid={this.props.netid}
            posts={this.props.posts}
            unlikePost={this.props.unlikePost}
          />
        </Col>
        <Col id="map-pane">
          <MapPane posts={this.props.posts} />
        </Col>
      </Row>
    );
  }
}
