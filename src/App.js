import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./components/Landing"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Profile from "./components/Profile"

import axios from "axios";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 12345,
        name: "Test User"
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
    axios.get("/api/v1/posting/")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      });
  }

  getUserPosts() {
    axios.get("/api/v1/posting/")
      .then(res => {
        const userPosts = res.data;
        this.setState({ userPosts });
      });
  }

  addPost(post) {
    axios.post("/api/v1/posting/", { post })
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
