import React from "react";
import Container from "react-bootstrap/Container";
import UserPost from "./profile/UserPost";

export default class Profile extends React.Component {
  renderPosts() {
    return this.props.posts.map(post =>
      <UserPost
        key={post.id}
        deletePost={this.props.deletePost}
        openForm={this.props.openForm}
        post={post}
      />
    );
  }

  render() {
    return (
      <Container fluid id="profile" className="p-0">
        <h3 id="profile-name">{this.props.user.name}</h3>
        <h4 id="profile-text">Active Posts</h4>
        <Container id="user-feed" className="p-0">
          {this.renderPosts()}
        </Container>
      </Container>
    );
  }
}
