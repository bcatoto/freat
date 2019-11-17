import React from "react";
import Post from "./../main/Post"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import berries from "./../assets/berries.png";

export default class UserPost extends Post {
  handleEdit = event => {
    this.props.openForm(false, Object.assign({}, this.props.post));
  }

  handleDelete = event => {
    this.props.deletePost(this.props.post.id);
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Container fluid className="p-0">
            <Row noGutters="true">
              <Card.Title className="mr-auto">{this.props.post.title}</Card.Title>
              <span className="post-time">{this.getTime()}</span>
              <Dropdown>
                <Dropdown.Toggle as={Button} variant="edit">
                  <i className="fas fa-ellipsis-v p-0 m-0"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.handleEdit()}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="red"
                    onClick={() => this.handleDelete()}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Row noGutters="true" className="mt-1">
              <Button variant="location">
                <i className="fas fa-map-marker-alt mr-1"></i>
                {this.props.post.room}, {this.props.post.building}
              </Button>
            </Row>
          </Container>
        </Card.Header>
        <Card.Img src={berries} />
        <Card.Body>
          {this.props.post.desc}
          <br/>
          <em>Feeds approximately: {this.props.post.feeds}</em>
        </Card.Body>
        <Card.Footer>
          {this.renderDietOptions()}
        </Card.Footer>
      </Card>
    );
  }
}
