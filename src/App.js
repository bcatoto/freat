import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./components/Landing"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Profile from "./components/Profile"
import PostForm from "./components/PostForm";

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
      userPosts: [],
      showForm: false,
      form: {
        isNew: true,
        values: null
      }
    };
  }

  componentDidMount() {
    this.getPosts();
    this.getUserPosts();
  }

  getPosts = async () => {
    await axios.get(`/api/v1/posting/`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
      .catch((err) => console.log(err));
  }

  getUserPosts = async () => {
    await axios.get(`/api/v1/posting/`)
      .then(res => {
        const userPosts = res.data;
        this.setState({ userPosts });
      })
      .catch((err) => console.log(err));
    // TODO: update posts
  }

  addPost = async (post) => {
    await axios.post(`/api/v1/posting/`, { post })
      .catch((err) => console.log(err));
    this.getPosts();
  }

  editPost = async (post) => {
    console.log(post)
    await axios.put(`api/vi/posting/${post.id}`, { post })
      .then(res => console.log(res))
      .catch((err) => console.log(err));
    console.log(post)
    // TODO: update posts
  }

  deletePost = async (postid) => {
    await axios.delete(`/api/v1/posting/${postid}`)
      .then(res => console.log(res))
      .catch((err) => console.log(err))

    // TODO: update posts
  }

  handleOpenForm = (isNew, values) => {
    const form = {
      isNew: isNew,
      values: values
    };
    this.setState({
      showForm: true,
      form
    });
  }

  handleCloseForm = () => {
    this.setState({ showForm: false });
  }

  render() {
    return(
      <div id="app">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route render={(props) => (
            <NavBar {...props}
              user={this.state.user}
              openForm={this.handleOpenForm}
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
              openForm={this.handleOpenForm}
              posts={this.state.userPosts}
              user={this.state.user}
            />
          )}
        />
        <PostForm
          show={this.state.showForm}
          addPost={this.addPost}
          editPost={this.editPost}
          handleClose={this.handleCloseForm}
          isNew={this.state.form.isNew}
          values={this.state.form.values}
          user={this.props.user}
        />
      </div>
    );
  }
}
