import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";

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
      building: "",
      image: null,
      desc: "",
      diet: this.initialDiet,
      feeds: ""
    };

    this.initialValid = {
      title: false,
      room: false,
      building: false,
      feeds: true
    };

    this.buildings = ["-- Select building --", "Bloomberg Hall", "Dod Hall", "Colonial", "Friend Center"];

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
        console.log(post)
        post.diet = this.dietToDict(this.props.values.diet);

        const valid = this.initialValid;
        valid.title = true;
        valid.room = true;
        valid.building = true;

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

    const post = {
      title: this.state.post.title,
      room: this.state.post.room,
      building: this.state.post.building,
      desc: this.state.post.desc,
      diet: this.dietToList(this.state.post.diet),
      feeds: this.state.post.feeds,
      // userid: this.props.user.id
    };

    if (this.props.isNew) {
      this.props.addPost(post);
    }
    else {
      this.props.editPost(post);
    }

    this.close();
  }

  validate() {
    const valid = this.state.valid;
    const post = this.state.post;

    valid.title = post.title.length > 0;
    valid.room = post.room.length > 0;
    valid.building = post.building != "" &&
      post.building !== "-- Select building --";
    valid.feeds = post.feeds === "" || post.feeds > 0;

    const validForm = valid.title && valid.room && valid.building &&
      valid.feeds;
    this.setState({ validForm });
  }

  dietToDict(diet) {
    console.log(diet)
    const dict = Object.assign({}, this.initialDiet);
    console.log(dict);
    diet.forEach(i => dict[this.diets[i].name] = true);
    console.log(dict);
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
              <Form.Label>Feeds approximately...</Form.Label>
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
