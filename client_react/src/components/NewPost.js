import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export default function NewPost(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group controlId="input-title">
          <Form.Label>Title</Form.Label>
          <Form.Control required type="text" placeholder="Enter title" />
          <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="input-room">
            <Form.Label>Room</Form.Label>
            <Form.Control required type="text" placeholder="Enter room" />
            <Form.Control.Feedback type="invalid"> Please enter a room.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="input-building">
            <Form.Label>Building</Form.Label>
            <Form.Control as="select">
              <option>-- Select building --</option>
              <option>Bloomberg Hall</option>
              <option>Dod Hall</option>
              <option>Colonial</option>
              <option>Friend Center</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">Please select a building.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="input-image">
          <Form.Label>Image</Form.Label>
          <Form.Control required type="file" />
          <Form.Control.Feedback type="invalid">Please upload an image.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="input-desc">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Form.Group controlId="input-diet">
          <Form.Label>Dietary Options</Form.Label>
          <Form.Check type="checkbox" id="diet-vegetarian" label="Vegetarian" />
          <Form.Check type="checkbox" id="diet-vegan" label="Vegan" />
          <Form.Check type="checkbox" id="diet-kosher" label="Kosher" />
          <Form.Check type="checkbox" id="diet-halal" label="Halal" />
          <Form.Check type="checkbox" id="diet-noglut" label="Gluten-Free" />
          <Form.Check type="checkbox" id="diet-norest" label="None" />
        </Form.Group>

        <Form.Group controlId="input-feeds">
          <Form.Label>Feeds approximately...</Form.Label>
          <Form.Control type="number" placeholder="1"/>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleClose}>Cancel</Button>
        <Button variant="outline-primary" onClick={props.handleClose}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
