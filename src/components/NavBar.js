import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NewPost from "./main/NewPost";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <NewPost
          show={this.state.showModal}
          handleClose={() => this.handleCloseModal()}
          addPost={this.props.addPost}
          user={this.props.user}
        />
        <Navbar className="p-2" variant="dark" expand="lg">
          <Link to="/home"><Navbar.Brand className="ml-2">Freat</Navbar.Brand></Link>
          <Button
            className="mr-auto" variant="navbar"
            onClick={() => this.handleOpenModal()}
          >
            New post
          </Button>
          <Link to="/profile"><Button variant="navbar">Account</Button></Link>
        </Navbar>
      </>
    );
  }
}
