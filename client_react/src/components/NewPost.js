import React from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function NewPost() {
  console.log(this.props.show)
  return (
    <Modal show={this.props.show} onHide={this.props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you"re reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
