import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./components/Landing"
import Home from "./components/Home"
import Profile from "./components/Profile"

import axios from "axios";

import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

// For CSRF token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:[],
      userPosts: []
    };
  }

  componentDidMount() {
    this.getPosts();
    this.getUserPosts();
  }

  getPosts() {
    axios.get("https://my-json-server.typicode.com/bcatoto/freat/posts")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      });
  }

  getUserPosts() {
    axios.get("https://my-json-server.typicode.com/bcatoto/freat/posts")
      .then(res => {
        const userPosts = res.data;
        this.setState({ userPosts });
      });
  }

  addPost(post) {
    axios.post("https://my-json-server.typicode.com/bcatoto/freat/posts", { post })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return(
      <div id="app">
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <Landing {...props} />
            )}
          />
          <Route
            path="/home"
            render={(props) => (
              <Home {...props} posts={this.state.posts} />
            )}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Profile {...props} posts={this.state.userPosts} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
