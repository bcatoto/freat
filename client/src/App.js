import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./components/Landing"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Profile from "./components/Profile"

import axios from "axios";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "./css/custom.css";

// For CSRF token
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        name: ""
      },
      posts:[],
      userPosts: []
    };
  }

  componentDidMount() {
    this.getPosts();
    this.getUserPosts();
  }

  getPosts() {
    axios.get("http://localhost:5000/api/v1/posting/")
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
          <Route exact path="/" component={Landing} />
          <Route render={(props) => (
            <NavBar {...props}
              addPost={this.addPost}
              user={this.state.user}
            />
            )}
          />
        </Switch>
        <Route path="/Home"
          render={(props) => (
            <Home {...props}
              posts={this.state.posts}
              user={this.state.user}
            />
          )}
        />
        <Route path="/profile"
          render={(props) => (
            <Profile {...props}
              posts={this.state.userPosts}
              user={this.state.user}
            />
          )}
        />
      </div>
    );
  }
}
