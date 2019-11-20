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
          if (posts[i].id == postid) {
            posts[i] = Object.assign(posts[i], post);
          }
        }

        for (let i = 0; i < userPosts.length; i++) {
          if (userPosts[i].id == postid) {
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
        }
      })
      .catch(err => console.log(err));
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
