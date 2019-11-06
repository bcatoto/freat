import React from "react";
import Container from "react-bootstrap/Container";
import UserPostsFeed from "./UserPostsFeed";

import axios from "axios";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get("https://my-json-server.typicode.com/bcatoto/freat/posts")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  render() {
    return (
      <Container fluid id="profile" className="p-0">
        <h2 id="profile-name">Bianca Catoto</h2>
        <h4 id="profile-text">Current Active Posts</h4>
        <UserPostsFeed posts={this.state.posts}/>
      </Container>
    );
  }
}
