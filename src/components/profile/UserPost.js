import React from "react";
import Post from "./../main/Post"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import berries from "./../assets/berries.png";

export default class UserPost extends Post {
  render() {
    return (
      <Card>
        <Card.Header>
          <Container fluid className="p-0">
            <Row noGutters="true">
              <Card.Title className="mr-auto">{this.props.post.title}</Card.Title>
              <span className="post-time">{this.getTime()}</span>
              <Button variant="edit"><i className="fas fa-ellipsis-v p-0 m-0"></i></Button>
            </Row>
            <Row noGutters="true" className="mt-1">
              <Button variant="location">
                <i className="fas fa-map-marker-alt mr-1"></i>{this.props.post.room} {this.props.post.building}
              </Button>
            </Row>
          </Container>
        </Card.Header>
        <Card.Img src={berries} />
        <Card.Body>
          {this.props.post.description}
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
