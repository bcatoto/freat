import React from "react";
import Post from "./../main/Post"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Skeleton from "react-loading-skeleton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class UserPost extends Post {
  handleEdit = event => {
    this.props.openForm(false, Object.assign({}, this.props.post));
  }

  handleDelete = event => {
    this.props.deletePost(this.props.post.id);
  }

  render() {
    if (this.props.post.id === "sk") {
      return (
        <Card>
          <Card.Header>
            <Skeleton width={100}/>
          </Card.Header>
          <Skeleton height={250} />
          <Card.Body>
            <Skeleton />
          </Card.Body>
          <Card.Footer>
            <Skeleton />
          </Card.Footer>
        </Card>
      );
    }
    else {
      return (
        <Card>
          <Card.Header>
            <Container fluid className="p-0">
              <Row noGutters="true" className="flex-nowrap" >
                <Col className="card-title-container mr-auto p-0">
                  <Card.Title>{this.props.post.title}</Card.Title>
                </Col>
                <Col className="card-time p-0" xs={3} sm={3}>
                  {this.getTime()}
                </Col>
                <Col className="p-0 card-edit-container" xs={1} sm={1}>
                  <Dropdown>
                    <Dropdown.Toggle as={Button} variant="edit"
                      className="card-dropdown-toggle"
                    >
                      <i className="fas fa-ellipsis-v p-0 m-0"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="card-dropdown-menu">
                      <Dropdown.Item onClick={this.handleEdit}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item className="red"
                        onClick={this.handleDelete}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row noGutters="true" className="mt-1 user-location">
                <i className="fas fa-map-marker-alt mr-1"></i>
                {this.props.post.room}, {this.props.post.building}
              </Row>
            </Container>
          </Card.Header>
          {this.renderCarousel()}
          <Card.Body>
            <Row noGutters="true">
              <Col className="mr-auto">
                {this.renderDietOptions()}
              </Col>
              <Col className="card-num p-0" xs={1} sm={1}>
                {this.props.post.num_going}
              </Col>
              <Col className="card-going p-0" xs={2}>
                {this.renderGoing()}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            {this.renderDietOptions()}
          </Card.Footer>
        </Card>
      );
    }
  }
}
