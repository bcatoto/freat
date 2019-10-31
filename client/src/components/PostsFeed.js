import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Post from "./Post"

export default class PostsFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        post={post}
      />
    );
  }

  render() {
    return (
      <Accordion>
        {this.renderPosts()}
      </Accordion>
    );
  }
}
