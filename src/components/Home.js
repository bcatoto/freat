import React from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostsFeed from "./home/PostsFeed";
import Map from "./home/Map";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupSelect: null
    };
  }

  componentDidMount() {
    this.props.getUserData();
    this.refreshPosts();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshPosts);
  }

  refreshPosts = async () => {
    await this.props.getPosts();
    setTimeout(this.refreshPosts, 60 * 1000);
  }

  setPopupSelect = state => {
    if (state === this.state.popupSelect) {
      this.setState({ popupSelect: null });
    }
    else {
      this.setState({ popupSelect: state });
    }
  }

  render() {
    if (window.innerWidth < 576) {
      return (
        <SwipeableViews enableMouseEvents className="h-100 w-100">
          <Container fluid id="post-pane" className="p-0">
            <PostsFeed
              deletePost={this.props.deletePost}
              changeFilter={this.props.changeFilter}
              likePost={this.props.likePost}
              likes={this.props.likes}
              netid={this.props.netid}
              posts={this.props.posts}
              unlikePost={this.props.unlikePost}
            />
          </Container>
          <Container fluid id="map-pane" className="p-0">
            <Map
              popupSelect={this.popupSelect}
              posts={this.props.posts}
            />
          </Container>
        </SwipeableViews>
      );
    }
    else {
      return (
        <Row fluid="true" noGutters="true">
          <Col id="post-pane" xs={12} sm={5}>
            <PostsFeed
              deletePost={this.props.deletePost}
              changeFilter={this.props.changeFilter}
              likePost={this.props.likePost}
              likes={this.props.likes}
              netid={this.props.netid}
              posts={this.props.posts}
              setPopupSelect={this.setPopupSelect}
              unlikePost={this.props.unlikePost}
            />
          </Col>
          <Col id="map-pane">
            <Map
              popupSelect={this.state.popupSelect}
              posts={this.props.posts}
              setPopupSelect={this.setPopupSelect}
            />
          </Col>
        </Row>
      );
    }
  }
}
