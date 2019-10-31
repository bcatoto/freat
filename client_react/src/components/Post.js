import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import berries from "./../assets/images/berries.png"

export default class Post extends React.Component {
  renderDietOptions() {
    const info = [
      {
        "key": 0,
        "name": "Vegetarian",
        "color": "vegetarian",
      },
      {
        "key": 1,
        "name": "Vegan",
        "color": "vegan",
      },
      {
        "key": 2,
        "name": "Kosher",
        "color": "kosher",
      },
      {
        "key": 3,
        "name": "Halal",
        "color": "halal",
      },
      {
        "key": 4,
        "name": "Gluten-Free",
        "color": "gluten",
      }
    ];

    const diets = this.props.post.diet.map(i => info[i]);
    return diets.map(diet =>
      <Badge pill key={diet.key} variant={diet.color}>{diet.name}</Badge>
    );
  }

  render() {
    return (
      <Accordion.Toggle as={Card} eventKey={this.props.post.id}>
        <Card.Header>
          <Container fluid className="p-0">
            <Row noGutters="true">
              <Card.Title className="mr-auto">{this.props.post.title}</Card.Title>
              <span className="post-time">15 minutes ago</span>
            </Row>
            <Row noGutters="true" className="mt-1 post-location">
              <i className="fas fa-map-marker-alt mr-1"></i> {this.props.post.room} {this.props.post.building}
            </Row>
          </Container>
        </Card.Header>
        <Card.Img src={berries} />
        <Accordion.Collapse eventKey={this.props.post.id}>
          <Card.Body>
            {this.props.post.description}
            <br/>
            <em>Feeds approximately: {this.props.post.feeds}</em>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          {this.renderDietOptions()}
        </Card.Footer>
      </Accordion.Toggle>
    );
  }
}
