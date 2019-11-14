import React from "react";
import Container from "react-bootstrap/Container"
import UserPost from "./UserPost"

export default class UserPostsFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(post =>
      <UserPost
        key={post.id}
        deletePost={this.props.deletePost}
        post={post}
      />
    );
  }

  render() {
    return (
      <Container id="user-feed" className="p-0">
        {this.renderPosts()}
      </Container>
    );
  }
}
