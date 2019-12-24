import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import Notifications from "./components/Notifications";
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

    this.notifMsg = {
      "edit-succ": "Your post was successfully edited!",
      "del-succ": "Your post was successfully deleted!",
      "post-fail" : "Whoops! Your post was not successfully made.",
      "edit-fail": "Whoops! Your post was not successfully edited.",
      "del-fail" : "Whoops! Your post was not successfully deleted"
    }

    this.state = {
      netid: "",
      posts: [],
      userPosts: [],
      likes: [],
      notifs: [],
      notifCount: 0,
      showForm: false,
      form: {
        isNew: true,
        values: null
      }
    };
  }

  getUserData = async () => {
    await this.getUser();
    this.getUserPosts();
    this.getUserLikes();
  }

  getUser = async () => {
    await axios.get(`api/v1/user/getCurrentUser`)
      .then(res => {
        const netid = res.data.netid;
        this.setState({ netid });
      })
      .catch(err => console.log(err));
  }

  getUserLikes = async () => {
    await axios.get(`api/v1/attendance?userid=${this.state.netid}`)
      .then(res => {
        const likes = res.data;
        this.setState({ likes });
      })
      .catch(err => console.log(err));
  }

  getPosts = async () => {
    await axios.get(`/api/v1/posting/`)
      .then(res => {
        const posts = res.data;
        if (posts !== this.state.posts) {
          this.setState({ posts });
        }
      })
      .catch(err => console.log(err));
  }

  getUserPosts = async () => {
    await axios.get(`/api/v1/posting/getByUser/${this.state.netid}`)
      .then(res => {
        const userPosts = res.data;
        this.setState({ userPosts });
      })
      .catch(err => console.log(err));
  }

  newPost = (post) => {
    this.addPost(post);
    const skPost = {
      id: "sk",
      building: post.building
    }
    const posts = this.state.posts;
    const userPosts = this.state.userPosts;
    posts.unshift(skPost);
    userPosts.unshift(skPost);
    this.setState({ posts, userPosts });
  }

  addPost = async (post) => {
    post.images = await this.getImageUrls(post.images);

    await axios.post(`/api/v1/posting/`, { post })
      .then(res => {
        if (res.status === 201) {
          const posts = this.state.posts.filter(post => post.id !== "sk");
          const userPosts = this.state.userPosts.filter(post => post.id !== "sk");
          posts.unshift(res.data);
          userPosts.unshift(res.data);
          this.setState({ posts, userPosts });
        }
      })
      .catch(err => this.addNotification("post-fail", false));
  }

  editPost = async (postid, post) => {
    if ("images" in post) {
      post.images = await this.getImageUrls(post.images);
    }

    await axios.put(`api/v1/posting/${postid}`, { post })
      .then(res => {
        if (res.status === 200) {
          let posts = this.state.posts;
          posts = this.replacePost(posts, postid, post)
          let userPosts = this.state.userPosts;
          userPosts = this.replacePost(userPosts, postid, post)
          this.setState({ posts, userPosts });
          this.addNotification("edit-succ", true);
        }
      })
      .catch(err => this.addNotification("edit-fail", false));
  }

  deletePost = async (postid) => {
    await axios.delete(`/api/v1/posting/${postid}`)
      .then(res => {
        if (res.status === 202 || res.status === 204) {
          let posts = this.state.posts;
          posts = posts.filter(post => post.id !== postid);
          let userPosts = this.state.userPosts;
          userPosts = userPosts.filter(post => post.id !== postid);

          this.setState({ posts, userPosts });
          this.addNotification("del-succ", true);
        }
      })
      .catch(err => this.addNotification("del-fail", false));
  }

  likePost = async (postid) => {
    const data = {
      "user_id" : this.state.netid,
      "post_id": postid
    }

    await axios.post(`/api/v1/attendance/`, { data })
      .then(res => {
        if (res.status === 200) {
          let posts = this.state.posts;
          let post = posts.find(post => post.id === postid);
          post.num_going += 1;
          posts = this.replacePost(posts, postid, post);

          let likes = this.state.likes;
          likes.push(data);

          this.setState({ posts, likes });
        }
      })
      .catch(err => console.log(err));
  }

  unlikePost = async (postid) => {
    const data = {
      "user_id" : this.state.netid,
      "post_id": postid
    }

    await axios.delete(`/api/v1/attendance/`, { data: { data } })
      .then(res => {
        if (res.status === 202 || res.status === 204) {
          let posts = this.state.posts;
          let post = posts.find(post => post.id === postid);
          post.num_going -= 1;
          posts = this.replacePost(posts, postid, post);

          let likes = this.state.likes;
          likes = likes.filter(like => like.post_id !== postid);

          this.setState({ posts, likes });
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

  getImageUrls = async (images) => {
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const url = await this.uploadImage(images.item(i));
      urls.push(url);
    }
    return urls;
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

  handleCloseNotif = (id) => {
    let notifs = this.state.notifs;
    notifs.forEach(notif => {
      if (notif.id === id) {
        notif.show = false;
      }
    })
    this.setState({ notifs });
  }

  addNotification(mode, success) {
    const notifs = this.state.notifs.filter(notif => notif.show === true);
    const notif = {
      id: this.state.notifCount,
      show: true,
      success: success,
      message: this.notifMsg[mode]
    };
    notifs.push(notif);
    this.setState({
      notifs,
      notifCount: this.state.notifCount + 1
    });
  }

  replacePost(posts, postid, newPost) {
    const newPosts = [];
    posts.forEach(post => {
      if (post.id === postid) {
        newPosts.push(newPost);
      }
      else {
        newPosts.push(post);
      }
    });
    return newPosts;
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
                newPost={this.newPost}
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
              likePost={this.likePost}
              likes={this.state.likes}
              netid={this.state.netid}
              posts={this.state.posts}
              unlikePost={this.unlikePost}
            />
          )}
        />
        <Route path="/profile"
          render={(props) => (
            <Profile {...props}
              deletePost={this.deletePost}
              getUserData={this.getUserData}
              likePost={this.likePost}
              likes={this.state.likes}
              openForm={this.handleOpenForm}
              netid={this.state.netid}
              posts={this.state.userPosts}
              unlikePost={this.unlikePost}
            />
          )}
        />
        <Route path={["/home", "/profile"]}
          render={(props) => (
            <Notifications
              closeNotif={this.handleCloseNotif}
              notifs={this.state.notifs}
            />
          )}
        />
      </div>
    );
  }
}
