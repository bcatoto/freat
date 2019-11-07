import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import axios from "axios";

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.emptyPost = {
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

    this.buildings = ["-- Select building --", "Bloomberg Hall", "Dod Hall", "Colonial", "Friend Center"];

    this.diets = [
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
    ];

    this.state = {
      post: this.emptyPost,
      valid: {
        title: false,
        room: false,
        building: false,
        feeds: false
      }
    };
  }

  validate(name, value) {
    const valid = this.state.valid;
    switch (name) {
      case "title":
        valid.title = value.length > 0;
        break;
      case "room":
        valid.room = value.length > 0;
        break;
      default:
        break;
    }
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

  // Closes and resets form
  close() {
    this.setState({ post: this.emptyPost });
    this.props.handleClose();
  }

  // Handles submission of new post form
  handleSubmit = event => {
    event.preventDefault();

    // Creates diet options array
    const diet = [];
    for (let i = 0; i < this.diets.length; i++) {
      if (this.state.post.diet[this.diets[i].name]) {
        diet.push(i);
      }
    }

    // Gets timestamp
    const time = new Date().getTime();

    const post = {
      "title": this.state.post.title,
      "room": this.state.post.room,
      "building": this.state.post.building,
      "description": this.state.post.description,
      "diet": diet,
      "feeds": this.state.post.feeds,
      "time": time
    };

    axios.post("https://my-json-server.typicode.com/bcatoto/freat/posts", { post })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    this.close();
  }

  // Converts time difference to minutes/hours
  getTime() {
    const min = 60 * 1000;
    const hour = min * 60;

    const time = 2700;

    if (time > 2 * hour) {
      return Math.floor(time / hour) + " hours ago";
    }
    else if (time > hour) {
      return "1 hour ago";
    }
    else if (time > min){
      return Math.floor(time / min) + " minutes ago";
    }
    else {
      return "1 minute ago";
    }
  }

  renderBuildings() {
    return this.buildings.sort()
      .map((building, index) =>
        <option key={index}>{building}</option>
      );
  }

  renderDietOptions() {
    return this.diets.map(diet =>
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
