import React from "react";
import Container from "react-bootstrap/Container"
import Post from "./Post"

export default class PostsFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        deletePost={this.props.deletePost}
        post={post}
      />
    );
  }

  renderFeed() {
    if (this.props.posts.length > 0) {
      return (
        <Container id="post-feed">
          {this.renderPosts()}
        </Container>
      );
    }
    else {
      return (
        <Container id="no-food">
          <i id="heart-broken" className="fas fa-heart-broken"></i>
          <h4>Sorry, no free food on campus</h4>
        </Container>
      );
    }
  }

  render() {
    return (
      <>
        {this.renderFeed()}
      </>
    );
  }
}
