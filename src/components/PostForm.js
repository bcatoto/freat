import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import buildings from "./assets/buildings.json";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialDiet = {
      "vegetarian": false,
      "vegan": false,
      "kosher": false,
      "halal": false,
      "gluten": false,
    }

    this.initialPost = {
      title: "",
      room: "",
      building: "-- Select building --",
      images: [],
      desc: "",
      diet: this.initialDiet,
      feeds: "",
      netid: ""
    };

    this.initialValid = {
      title: false,
      room: false,
      building: false,
      images: false,
      feeds: true
    };

    this.diets = [
      {
        id: 0,
        name: "vegetarian",
        label: "Vegetarian"
      },
      {
        id: 1,
        name: "vegan",
        label: "Vegan"
      },
      {
        id: 2,
        name: "kosher",
        label: "Kosher"
      },
      {
        id: 3,
        name: "halal",
        label: "Halal"
      },
      {
        id: 4,
        name: "gluten",
        label: "Gluten-Free"
      }
    ];

    this.state = {
      post: this.cleanPost(),
      valid: this.initialValid,
      validForm: false,
      prevProps: this.props
    };
  }

  componentDidUpdate() {
    if (this.state.prevProps !== this.props && this.props.show) {
      if (!this.props.isNew) {
        const post = this.props.values;
        post.diet = this.dietToDict(this.props.values.diet);

        const valid = this.initialValid;
        valid.title = true;
        valid.room = true;
        valid.building = true;
        valid.images = true;

        this.setState({
          post,
          valid,
          validForm: true
        });
      }
      this.setState({ prevProps: this.props });
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const post = this.state.post;
    post[name] = value;
    this.setState({ post });
    this.validate()
  }

  handleImageChange = event => {
    const post = this.state.post;
    post.images = event.target.files;
    this.setState({ post });
    this.validate();
  }

  handleDietChange = event => {
    const name = event.target.name;
    const post = this.state.post;
    post.diet[name] = !post.diet[name];
    this.setState({ post });
  }

  close = () => {
    this.props.handleClose();
    this.setState({
      post: this.cleanPost(),
      valid:  this.initialValid,
      validForm: false
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    event.returnValue = false;

    const post = this.state.post;
    post.diet = this.dietToList(this.state.post.diet);
    post.netid = this.props.netid;

    if (this.props.isNew) {
      this.props.addPost(post);
    }
    else {
      this.props.editPost(post.id, post);
    }

    this.close();
  }

  validate() {
    const valid = this.state.valid;
    const post = this.state.post;

    valid.title = post.title.length > 0;
    valid.room = post.room.length > 0;
    valid.building = post.building !== "-- Select building --";
    valid.images = post.images.length > 0;
    valid.feeds = post.feeds > 0;

    const validForm = valid.title && valid.room && valid.building &&
      valid.images && valid.feeds;
    this.setState({ validForm });
  }

  dietToDict(diet) {
    const dict = Object.assign({}, this.initialDiet);
    diet.forEach(i => dict[this.diets[i].name] = true);
    return dict;
  }

  dietToList(diet) {
    const list = [];
    for (let i = 0; i < this.diets.length; i++) {
      if (diet[this.diets[i].name]) {
        list.push(i);
      }
    }
    return list;
  }

  cleanPost() {
    const post = Object.assign({}, this.initialPost)
    post.diet = Object.assign({}, this.initialDiet)
    return post;
  }

  renderRequired(label) {
    return (
      <Form.Label>{label}<span className="red">*</span></Form.Label>
    );
  }

  renderBuildings() {
    return buildings.sort()
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
        checked={this.state.post.diet[diet.name]}
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
              <Form.Control type="text" name="title"
                placeholder="Enter title"
                value={this.state.post.title}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                {this.renderRequired("Room")}
                <Form.Control type="text" name="room"
                  placeholder="Enter room"
                  value={this.state.post.room}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="input-building">
                {this.renderRequired("Building")}
                <Form.Control as="select" name="building"
                  value={this.state.post.building}
                  onChange={this.handleChange}
                >
                  {this.renderBuildings()}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="input-image">
              {this.renderRequired("Image")}
              <Form.Control type="file" multiple
                accept="image/png, image/jpeg"
                onChange={this.handleImageChange}
              />
              <Form.Text className="text-muted mt-1">
                Please center your photo. All images will automatically be cropped to a square.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="input-desc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="desc" rows="3"
                value={this.state.post.desc}
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
              {this.renderRequired("Feeds approximately...")}
              <Form.Control type="number" name="feeds" placeholder="1"
                value={this.state.post.feeds}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="cancel" className="mr-1"
              onClick={this.close}>
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
