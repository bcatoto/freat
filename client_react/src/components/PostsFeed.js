import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Post from "./Post"

export default class PostsFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.description}
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
