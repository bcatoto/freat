import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PostForm from "./components/PostForm";

import axios from "axios";
import FormData from "form-data";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App.css";

require("dotenv").config();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      netid: "",
      posts: [],
      userPosts: [],
      showAlert: false,
      showForm: false,
      form: {
        isNew: true,
        values: null
      }
    };
  }

  getUserData = async () => {
    const res = await axios.get(`api/v1/user/getUser`)
      .catch(err => console.log(err));
    const netid = res.data.netid;
    await this.setState({ netid });
    this.getUserPosts();
  }

  getPosts = async () => {
    const res = await axios.get(`/api/v1/posting/`)
      .catch(err => console.log(err));
    const posts = res.data;
    this.setState({ posts });
  }

  getUserPosts = async () => {
    const res = await axios.get(`/api/v1/posting/getByUser/${this.state.netid}`)
      .catch(err => console.log(err));
    const userPosts = res.data;
    this.setState({ userPosts });
  }

  addPost = async (post) => {
    const urls = [];
    for (let i = 0; i < post.images.length; i++) {
      const url = await this.uploadImage(post.images.item(i));
      urls.push(url);
    }
    post.images = urls;

    const res = await axios.post(`/api/v1/posting/`, { post })
      .catch(err => console.log(err));

    if (res.status === 201) {
      const posts = this.state.posts;
      const userPosts = this.state.userPosts;
      posts.unshift(res.data);
      userPosts.unshift(res.data);
      this.setState({ posts, userPosts });
    }
  }

  editPost = async (postid, post) => {
    const res = await axios.put(`api/v1/posting/${postid}`, { post })
      .catch(err => console.log(err));
    const posts = this.state.posts;
    const userPosts = this.state.userPosts;

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postid) {
        posts[i] = Object.assign(posts[i], post);
      }
    }

    for (let i = 0; i < userPosts.length; i++) {
      if (userPosts[i].id === postid) {
        userPosts[i] = Object.assign(userPosts[i], post);
      }
    }

    this.setState({ posts, userPosts });
  }

  deletePost = async (postid) => {
    const res = await axios.delete(`/api/v1/posting/${postid}`)
      .catch(err => console.log(err));

    if (res.status === 202 || res.status === 204) {
      let posts = this.state.posts;
      posts = posts.filter(post => post.id !== postid);
      let userPosts = this.state.userPosts;
      userPosts = userPosts.filter(post => post.id !== postid);
      this.setState({ posts, userPosts });

      this.handleOpenAlert();
    }
  }

  uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const res = await axios({
        url: process.env.REACT_APP_CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).catch(err => console.log(err));

    return res.data.public_id;
  }

  handleOpenAlert = () => {
    this.setState({ showAlert: true });
    setTimeout(this.handleCloseAlert, 5000);
  }

  handleCloseAlert = () => {
    this.setState({ showAlert: false });
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
                openForm={this.handleOpenForm}
              />
              <PostForm
                show={this.state.showForm}
                addPost={this.addPost}
                editPost={this.editPost}
                handleClose={this.handleCloseForm}
                isNew={this.state.form.isNew}
                netid={this.state.netid}
                values={this.state.form.values}
              />
            </>
            )}
          />
        </Switch>
        <Route path="/home"
          render={(props) => (
            <Home {...props}
              deletePost={this.deletePost}
              getPosts={this.getPosts}
              getUserData={this.getUserData}
              posts={this.state.posts}
            />
          )}
        />
        <Route path="/profile"
          render={(props) => (
            <Profile {...props}
              closeAlert={this.handleCloseAlert}
              deletePost={this.deletePost}
              getUserData={this.getUserData}
              openAlert={this.handleOpenAlert}
              openForm={this.handleOpenForm}
              netid={this.state.netid}
              posts={this.state.userPosts}
              show={this.state.showAlert}
            />
          )}
        />
      </div>
    );
  }
}
