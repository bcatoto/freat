import React from "react";
import Container from "react-bootstrap/Container";
import UserPostsFeed from "./profile/UserPostsFeed";

export default function Profile(props) {
  return (
    <Container fluid id="profile" className="p-0">
      <h3 id="profile-name">{props.user.name}</h3>
      <h4 id="profile-text">Active Posts</h4>
      <UserPostsFeed
        deletePost={props.deletePost}
        posts={props.posts}
      />
    </Container>
  );
}
