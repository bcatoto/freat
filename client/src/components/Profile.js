import React from "react";
import Container from "react-bootstrap/Container";

import NavBar from "./NavBar";
import UserPostsFeed from "./profile/UserPostsFeed";

import axios from "axios";

export default function Profile(props) {
  return (
    <>
      <NavBar />
      <Container fluid id="profile" className="p-0">
        <h3 id="profile-name">Bianca Catoto</h3>
        <h4 id="profile-text">Active Posts</h4>
        <UserPostsFeed posts={props.posts}/>
      </Container>
    </>
  );
}
