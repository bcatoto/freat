import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./components/Landing"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Profile from "./components/Profile"
import PostForm from "./components/PostForm";

import axios from "axios";
import FormData from "form-data"

import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App.css";

require('dotenv').config()

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        netid: "bcatoto"
      },
      posts:[],
      userPosts: [],
      showAlert: false,
      showForm: false,
      form: {
        isNew: true,
        values: null
      }
    };
  }

  componentDidMount() {
    this.authenticate()
    this.getPosts();
    this.getUserPosts();
  }

  authenticate = async () => {

  }

  getPosts = async () => {
    axios.get(`/api/v1/posting/`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
      .catch(err => console.log(err));
  }

  getUserPosts = async () => {
    axios.get(`/api/v1/posting/`)
      .then(res => {
        const userPosts = res.data;
        this.setState({ userPosts });
      })
      .catch(err => console.log(err));
  }

  addPost = async (post) => {
    const urls = [];
    for (let i = 0; i < post.images.length; i++) {
      const url = await this.uploadImage(post.images.item(i));
      urls.push(url);
    }
    post.images = urls;

    axios.post(`/api/v1/posting/`, { post })
      .then(res => {
        if (res.status === 201) {
          const posts = this.state.posts;
          const userPosts = this.state.userPosts;
          posts.unshift(res.data);
          userPosts.unshift(res.data);
          this.setState({ posts, userPosts });
        }
      })
      .catch(err => console.log(err));
  }

  editPost = async (postid, post) => {
    axios.put(`api/v1/posting/${postid}`, { post })
      .then(res => {
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
      })
      .catch(err => console.log(err));
  }

  deletePost = async (postid) => {
    axios.delete(`/api/v1/posting/${postid}`)
      .then(res => {
        if (res.status === 202 || res.status === 204) {
          let posts = this.state.posts;
          posts = posts.filter(post => post.id !== postid);
          let userPosts = this.state.userPosts;
          userPosts = userPosts.filter(post => post.id !== postid);
          this.setState({ posts, userPosts });

          this.handleOpenAlert();
        }
      })
      .catch(err => console.log(err));
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
                user={this.state.user}
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
              closeAlert={this.handleCloseAlert}
              deletePost={this.deletePost}
              openAlert={this.handleOpenAlert}
              openForm={this.handleOpenForm}
              posts={this.state.userPosts}
              show={this.state.showAlert}
              user={this.state.user}
            />
          )}
        />
      </div>
    );
  }
}
