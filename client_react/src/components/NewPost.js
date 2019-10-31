import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import axios from "axios";

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "",
        room: "",
        building: null,
        image: null,
        description: "",
        diet: {
          "vegetarian": false,
          "vegan": false,
          "kosher": false,
          "halal": false,
          "gluten": false,
        },
        feeds: ""
      },
      buildings: ["-- Select building --", "Bloomberg Hall", "Dod Hall", "Colonial", "Friend Center"],
      diets: [
        {
          "id": 0,
          "name": "vegetarian",
          "label": "Vegetarian"
        },
        {
          "id": 1,
          "name": "vegan",
          "label": "Vegan"
        },
        {
          "id": 2,
          "name": "kosher",
          "label": "Kosher"
        },
        {
          "id": 3,
          "name": "halal",
          "label": "Halal"
        },
        {
          "id": 4,
          "name": "gluten",
          "label": "Gluten-Free"
        }
      ]
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const post = this.state.post;
    post[name] = value;
    this.setState({ post });
  }

  handleDietChange = event => {
    const name = event.target.name;
    const post = this.state.post;
    post.diet[name] = !post.diet[name];
    this.setState({ post });
  }

  close() {
    const post = {
      title: "",
      room: "",
      building: null,
      image: null,
      description: "",
      diet: {
        "vegetarian": false,
        "vegan": false,
        "kosher": false,
        "halal": false,
        "gluten": false,
      },
      feeds: ""
    };
    this.setState({ post });
    this.props.handleClose();
  }

  handleSubmit = event => {
    event.preventDefault();

    // Creates diet options array
    const diet = [];
    for (let i = 0; i < this.state.diets.length; i++) {
      if (this.state.post.diet[this.state.diets[i].name]) {
        diet.push(i);
      }
    }

    const post = {
      "title": this.state.title,
      "room": this.state.room,
      "building": this.state.building,
      "description": this.state.description,
      "diet": diet,
      "feeds": this.state.feeds
    };

    axios.post('https://my-json-server.typicode.com/bcatoto/freat/posts', { post })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    this.close();
  }

  renderBuildings() {
    return this.state.buildings.sort()
      .map((building, index) =>
        <option key={index}>{building}</option>
      );
  }

  renderDietOptions() {
    return this.state.diets.map(diet =>
      <Form.Check
        key={diet.id}
        type="checkbox"
        name={diet.name}
        label={diet.label}
        onChange={this.handleDietChange}
      />
    );
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>New post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" onChange={this.handleChange}/>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Room</Form.Label>
                <Form.Control type="text" name="room" placeholder="Enter room" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="input-building">
                <Form.Label>Building</Form.Label>
                <Form.Control as="select" name="building" onChange={this.handleChange}>
                  {this.renderBuildings()}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="input-image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
              <Form.Control.Feedback type="invalid">Please upload an image.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="input-desc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" rows="3" onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="input-diet">
              <Form.Label>Dietary Options</Form.Label>
              {this.renderDietOptions()}
            </Form.Group>

            <Form.Group controlId="input-feeds">
              <Form.Label>Feeds approximately...</Form.Label>
              <Form.Control type="number" name="feeds" placeholder="1" onChange={this.handleChange}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="reset" variant="danger" className="mr-1" onClick={() => this.close()}>Cancel</Button>
            <Button type="submit" variant="outline-primary">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
