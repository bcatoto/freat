import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Image, Transformation } from 'cloudinary-react';
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      this.props.deletePost(this.props.post.id)
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

  renderImages() {
    if (this.props.post.images == null) {
      return;
    }

    return this.props.post.images.map(id =>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
          publicId={id}
        />
      </Carousel.Item>
    );
  }

  renderCarousel() {
    let controls = false;
    if (this.props.post.images.length > 1) {
      controls = true;
    }

    return(
      <Carousel controls={controls} indicators={false} interval={null}>
        {this.renderImages()}
      </Carousel>
    );
  }

  renderDietOptions() {
    const diets = this.props.post.diet.map(i => this.diets[i]);
    return diets.map(diet =>
      <Badge pill key={diet.key} variant={diet.color}>{diet.name}</Badge>
    );
  }

  render() {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={this.props.post.id}>
          <Container fluid className="p-0">
            <Row noGutters="true">
              <Col className="card-title-container mr-auto p-0">
                <Card.Title>{this.props.post.title}</Card.Title>
              </Col>
              <Col className="card-time p-0" xs={3} sm={3}>
                {this.getTime()}
              </Col>
            </Row>
            <Row noGutters="true" className="mt-1">
              <Button variant="location">
                <i className="fas fa-map-marker-alt mr-1"></i>
                {this.props.post.room}, {this.props.post.building}
              </Button>
            </Row>
          </Container>
        </Accordion.Toggle>
        {this.renderCarousel()}
        <Accordion.Collapse eventKey={this.props.post.id}>
          <Accordion.Toggle as={Card.Body} eventKey={this.props.post.id}>
            {this.props.post.desc}
            <br/>
            <em>Feeds approximately: {this.props.post.feeds}</em>
          </Accordion.Toggle>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Footer} eventKey={this.props.post.id}>
          {this.renderDietOptions()}
        </Accordion.Toggle>
      </Card>
    );
  }
}
