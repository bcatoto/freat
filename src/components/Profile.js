import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import UserPost from "./profile/UserPost";

export default class Profile extends React.Component {

  componentDidMount() {
    this.props.getUserData();
  }

  handleClose = event => {
    this.props.closeAlert();
  }

  renderAlert() {
    if (this.props.show) {
      return (
        <Alert variant="delete" dismissible onClose={() => this.handleClose()}>
          <i className="far fa-trash-alt mr-2"></i>
          Your post was successfully deleted!
        </Alert>
      );
    }
  }

  renderText() {
    if (this.props.posts.length === 0) {
      return "No Active Posts"
    }
    else {
      return "Active Posts"
    }
  }

  renderPosts() {
    return this.props.posts.map(post =>
      <UserPost
        key={post.id}
        deletePost={this.props.deletePost}
        openAlert={this.props.openAlert}
        openForm={this.props.openForm}
        post={post}
      />
    );
  }

  render() {
    return (
      <Container fluid id="profile" className="p-0">
        {this.renderAlert()}
        <h4 id="profile-name">{this.props.netid}</h4>
        <h5 id="profile-text">{this.renderText()}</h5>
        <Container id="user-feed" className="p-0">
          {this.renderPosts()}
        </Container>
      </Container>
    );
  }
}
