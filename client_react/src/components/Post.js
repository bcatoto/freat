import React from "react";
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import berries from "./../assets/images/berries.png"

export default function Post(props) {
  return (
    <Card className="post">
      <Accordion.Toggle as={Card.Header} eventKey={props.id}>
        <Card.Title>{props.title}</Card.Title>
      </Accordion.Toggle>
      <Accordion.Toggle as={Card.Img} eventKey={props.id} src={berries} />
      <Accordion.Collapse eventKey={props.id}>
        <Accordion.Toggle as={Card.Body} eventKey={props.id}>
          {props.body}
        </Accordion.Toggle>
      </Accordion.Collapse>
      <Accordion.Toggle as={Card.Footer} eventKey={props.id}>
      </Accordion.Toggle>
    </Card>
  );
}
