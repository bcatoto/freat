import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import berries from "./../assets/images/berries.png"

class Post extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: null,
      room: null,
      building: null,
      image: null,
      body: null,
      tags: [],
      feedNum: null
    };
  }

  render() {
    return (
      <Card className="post">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <Card.Title>{this.props.title}</Card.Title>
        </Accordion.Toggle>
        <Accordion.Toggle as={Card.Img} eventKey="0" src={berries} />
        <Accordion.Collapse eventKey="0">
          <Accordion.Toggle as={Card.Body} eventKey="0">
            {this.props.body}
          </Accordion.Toggle>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Footer} eventKey="0">
        </Accordion.Toggle>
      </Card>
    );
  }
}

export default Post
