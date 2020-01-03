import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Image, Transformation } from "cloudinary-react";
import Badge from "react-bootstrap/Badge";
import Skeleton from "react-loading-skeleton";
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

    const likes = this.props.likes;

    this.state = {
      liked: likes !== undefined &&
        likes.find(item => item.post_id === this.props.post.id) !== undefined,
      prevLikes: []
    };
  }

  componentDidUpdate() {
    const likes = this.props.likes;
    if (likes !== undefined && likes !== this.state.prevLikes) {
      const liked = likes.find(item => item.post_id === this.props.post.id) !== undefined;
      this.setState({
        liked,
        prevLikes: likes
      })
    }
  }

  handleGoing = async event => {
    const liked = this.state.liked;
    if (liked) {
      await this.props.unlikePost(this.props.post);
    }
    else {
      await this.props.likePost(this.props.post);
    }
    await this.setState({ liked: !liked })
  }

  getCreatedDate(date) {
    const year = date.substring(0, 4)
    const month = parseInt(date.substring(5, 7)) - 1;
    const day = date.substring(8, 10);
    const hour = date.substring(11, 13);
    const min = date.substring(14, 16);
    const sec = date.substring(17, 19);
    const milli = date.substring(20, 22);

    return Date.UTC(year, month, day, hour, min, sec, milli);
  }

  getTime() {
    const min = 60 * 1000;
    const hour = min * 60;

    const now = Date.now();
    const time = this.getCreatedDate(this.props.post.created_at);
    const diff = now - time;

    console.log("----")
    console.log(now)
    console.log(new Date(now))
    console.log(this.props.post.created_at)
    console.log(time)
    console.log(new Date(time))
    console.log(diff)

    if (diff > 2 * hour) {
      return "2 hours ago"
    }
    else if (diff > hour) {
      return "1h " + Math.floor((diff - hour) / min) + "m ago";
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
        >
          <Transformation
            quality="auto:best"
            flags="progressive"
            aspectRatio="1:1"
            crop="crop"
          />
        </Image>
      </Carousel.Item>
    );
  }

  renderCarousel() {
    let controls = false;
    if (this.props.post.images !== undefined &&
      this.props.post.images.length > 1) {
      controls = true;
    }

    return(
      <Carousel controls={controls} indicators={false} interval={null}>
        {this.renderImages()}
      </Carousel>
    );
  }

  renderDesc() {
    if (this.props.post.desc === "") {
      return;
    }
    else {
      return (
        <>
          {this.props.post.desc}
          <br/>
        </>
      );
    }
  }

  renderDietOptions() {
    const diets = this.props.post.diet.map(i => this.diets[i]);
    return diets.map(diet =>
      <Badge pill key={diet.key} variant={diet.color}>{diet.name}</Badge>
    );
  }

  renderGoing() {
    if (this.state.liked) {
      return (
        <Button variant="going-on" onClick={this.handleGoing}>
          <span className="card-num">{this.props.post.num_going}</span>
          <i className="fas fa-heart"></i>
          Going
        </Button>
      );
    }
    else {
      return (
        <Button variant="going-off" onClick={this.handleGoing}>
          <span className="card-num">{this.props.post.num_going}</span>
          <i className="far fa-heart"></i>
          Going
        </Button>
      );
    }
  }

  renderSkeleton() {
    return(
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

  render() {
    if (this.props.post.id === "sk") {
      return (
        <>
          {this.renderSkeleton()}
        </>
      );
    }
    else {
      return (
        <Card>
          <Card.Header>
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
          </Card.Header>
          {this.renderCarousel()}
          <Card.Body>
            {this.renderDesc()}
            <em>Feeds approximately: {this.props.post.feeds}</em>
          </Card.Body>
          <Card.Footer>
            <Row noGutters="true">
              <Col className="mr-auto">
                {this.renderDietOptions()}
              </Col>
              <Col className="card-going p-0">
                {this.renderGoing()}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      );
    }
  }
}
