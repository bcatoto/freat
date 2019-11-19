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
    const res = await axios.get(`/api/v1/posting/`)
      .catch(err => console.log(err));

    const posts = res.data;
    this.setState({ posts });
  }

  getUserPosts = async () => {
    const res = await axios.get(`/api/v1/posting/`)
      .catch(err => console.log(err));

    const userPosts = res.data;
    this.setState({ userPosts });
  }

  addPost = async (post) => {
    const res = await axios.post(`/api/v1/posting/`, { post })
      .catch(err => console.log(err));

    const posts = this.state.posts;
    const userPosts = this.state.userPosts;
    posts.unshift(res.data);
    userPosts.unshift(res.data);
    this.setState({ posts, userPosts });
  }

  editPost = async (postid, post) => {
    console.log(postid)
    console.log(post)
    const res = await axios.put(`api/v1/posting/${postid}`, { post })
      .catch(err => console.log(err));

    // TODO: update posts
    console.log(res)
  }

  deletePost = async (postid) => {
    const res = await axios.delete(`/api/v1/posting/${postid}`)
      .catch(err => console.log(err));

    console.log(res)
    let posts = this.state.posts;
    posts = posts.filter(post => post.id !== postid);
    let userPosts = this.state.userPosts;
    userPosts = userPosts.filter(post => post.id !== postid);
    this.setState({ posts, userPosts });
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
            <>
              <NavBar {...props}
                user={this.state.user}
                openForm={this.handleOpenForm}
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
            </>
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
      </div>
    );
  }
}
