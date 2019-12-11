import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostsFeed from "./main/PostsFeed";
import MapPane from "./main/MapPane";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts
    };
  }

  componentDidMount() {
    this.props.getUserData();
    this.refreshPosts();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshPosts);
  }

  refreshPosts = async () => {
    await this.props.getPosts();
    if (this.props.posts !== this.state.posts) {
      await this.setState({ posts: this.props.posts });
    }
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
            posts={this.state.posts}
            unlikePost={this.props.unlikePost}
          />
        </Col>
        <Col id="map-pane">
          <MapPane posts={this.state.posts} />
        </Col>
      </Row>
    );
  }
}
