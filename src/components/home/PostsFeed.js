import React from "react";
import Container from "react-bootstrap/Container"
import Filter from "./Filter"
import Post from "./Post"

export default class PostsFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        likePost={this.props.likePost}
        likes={this.props.likes}
        netid={this.props.netid}
        post={post}
        setPopupSelect={this.props.setPopupSelect}
        unlikePost={this.props.unlikePost}
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
    if (window.innerWidth < 576) {
      return (
        <>
          <Filter changeFilter={this.props.changeFilter} />
          <Container fluid id="mobile-msg" className="center">
            Swipe left for the map view
          </Container>
          {this.renderFeed()}
        </>
      );
    }
    else {
      return (
        <>
          <Filter changeFilter={this.props.changeFilter} />
          {this.renderFeed()}
        </>
      );
    }
  }
}
