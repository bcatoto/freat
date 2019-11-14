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

  getPosts = async () => {
    await axios.get("/api/v1/posting/")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
      .catch((err) => console.log(err));
  }

  getUserPosts = async () => {
    await axios.get("/api/v1/posting/")
      .then(res => {
        const userPosts = res.data;
        this.setState({ userPosts });
      })
      .catch((err) => console.log(err));
  }

  addPost = async (post) => {
    await axios.post("/api/v1/posting/", { post })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const posts = this.state.posts;
        posts.push(post)
        this.setState({ posts });
      })
      .catch((err) => console.log(err));
  }

  deletePost = async (postid) => {
    axios.delete("/api/v1/posting/${postid}")
      .then(res => {
        console.log(res);
      })
      .catch((err) => console.log(err))

      // TODO: update posts and user's posts without refreshing page
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
              deletePost={this.deletePost}
              posts={this.state.userPosts}
              user={this.state.user}
            />
          )}
        />
      </div>
    );
  }
}
