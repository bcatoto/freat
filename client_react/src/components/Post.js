import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"

import berries from "./../assets/images/berries.png"

export default class Post extends React.Component {
  renderDietOptions() {
    const diets_info = [
      {
        "name": "Vegetarian",
        "color": "vegetarian",
      },
      {
        "name": "Vegan",
        "color": "vegan",
      },
      {
        "name": "Kosher",
        "color": "kosher",
      },
      {
        "name": "Halal",
        "color": "halal",
      },
      {
        "name": "Gluten-Free",
        "color": "gluten",
      }
    ];

    const diets = this.props.posts.diet_options.map(i => diets_info[i]);
    return diets.map(diet =>
      <Badge pill varient={diet.color}>{diet.name}</Badge>
    );
  }

  render() {
    return (
      <Accordion.Toggle as={Card} eventKey={this.props.id}>
        <Card.Header>
          <Card.Title>{this.props.title}</Card.Title>
        </Card.Header>
        <Card.Img src={berries} />
        <Accordion.Collapse eventKey={this.props.id}>
          <Card.Body>
            {this.props.body}
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          {this.renderDietOptions()}
        </Card.Footer>
      </Accordion.Toggle>
    );
  }
}
