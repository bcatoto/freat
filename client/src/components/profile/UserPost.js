import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import berries from "./../assets/berries.png";

export default class UserPost extends React.Component {
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
      <Card>
        <Card.Header>
          <Container fluid className="p-0">
            <Row noGutters="true">
              <Card.Title className="mr-auto">{this.props.post.title}</Card.Title>
              <span className="post-time">15 minutes ago</span>
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
