import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.emptyPost = {
      title: "",
      room: "",
      building: "",
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

    this.initialValid = {
      title: false,
      room: false,
      building: false,
      feeds: true
    }

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
        feeds: true
      },
      validForm: false
    };

    // // Checks if initial values are valid
    // this.validate("title");
    // this.validate("room");
    // this.validate("building");
    // this.validate("image")
    // this.validate("feeds")
  }

  // Validates input
  validate(name) {
    const valid = this.state.valid;
    const post = this.state.post

    switch (name) {
      case "title":
        valid.title = post.title.length > 0;
        break;
      case "room":
        valid.room = post.room.length > 0;
        break;
      case "building":
        valid.building = post.building !== "-- Select building --";
        break;
      case "image":
        break;
      case "feeds":
        valid.feeds = post.feeds == "" || post.feeds > 0;
        break;
      default:
        break;
    }

    // Checks if entire form is valid
    const validForm = valid.title && valid.room && valid.building &&
      valid.feeds;
    this.setState({ validForm })
  }

  // Keeps track of field changes
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const post = this.state.post;
    post[name] = value;
    this.setState({ post });

    // Validate input
    this.validate(name)
  }

  // Keeps track of diet options selected
  handleDietChange = event => {
    const name = event.target.name;
    const post = this.state.post;
    post.diet[name] = !post.diet[name];
    this.setState({ post });
  }

  // Closes and resets form
  close() {
    this.props.handleClose();
    this.setState({
      post: this.emptyPost,
      valid:  this.initialValid,
      validForm: false
    });
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

    // Creates POST request data
    const post = {
      title: this.state.post.title,
      room: this.state.post.room,
      building: this.state.post.building,
      desc: this.state.post.description,
      diet: diet,
      feeds: this.state.post.feeds,
      // userid: this.props.user.id
    };

    this.props.addPost(post);
    this.close();
  }

  renderRequired(label) {
    return (
      <Form.Label>{label}<span className="red">*</span></Form.Label>
    );
  }

  // Renders building options
  renderBuildings() {
    return this.buildings.sort()
      .map((building, index) =>
        <option key={index}>{building}</option>
      );
  }

  // Renders diet options
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
              {this.renderRequired("Title")}
              <Form.Control type="text" name="title" placeholder="Enter title"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                {this.renderRequired("Room")}
                <Form.Control type="text" name="room" placeholder="Enter room"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="input-building">
                {this.renderRequired("Building")}
                <Form.Control as="select" name="building"
                  onChange={this.handleChange}
                >
                  {this.renderBuildings()}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a building.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="input-image">
              {this.renderRequired("Image")}
              <Form.Control type="file" />
              <Form.Control.Feedback type="invalid">
                Please upload an image.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="input-desc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" rows="3"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="input-diet">
              <Form.Label>Dietary Options</Form.Label>
              <Form.Text className="text-muted">
                Please select if any food fits a dietary option.
              </Form.Text>
              {this.renderDietOptions()}
            </Form.Group>

            <Form.Group controlId="input-feeds">
              <Form.Label>Feeds approximately...</Form.Label>
              <Form.Control type="number" name="feeds" placeholder="1"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="reset" variant="cancel" className="mr-1"
              onClick={() => this.close()}>
              Cancel
            </Button>
            <Button type="submit" variant="submit"
              disabled={!this.state.validForm}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
