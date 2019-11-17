import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import berries from "./../assets/berries.png";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.diets = [
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
  }

  // Converts time difference to minutes/hours
  getTime() {
    const min = 60 * 1000;
    const hour = min * 60;

    const now = Date.now();
    const time = new Date(this.props.post.created_at);
    const diff = now - time;

    if (diff > 2 * hour) {
      return Math.floor(diff / hour) + " hours ago";
    }
    else if (diff > hour) {
      return "1 hour ago";
    }
    else if (diff > min){
      return Math.floor(diff / min) + " minutes ago";
    }
    else {
      return "1 minute ago";
    }
  }

  renderDietOptions() {
    const diets = this.props.post.diet.map(i => this.diets[i]);
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
              <span className="post-time">{this.getTime()}</span>
            </Row>
            <Row noGutters="true" className="mt-1">
              <Button variant="location">
                <i className="fas fa-map-marker-alt mr-1"></i>{this.props.post.room} {this.props.post.building}
              </Button>
            </Row>
          </Container>
        </Card.Header>
        <Card.Img src={berries} />
        <Accordion.Collapse eventKey={this.props.post.id}>
          <Card.Body>
            {this.props.post.desc}
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
