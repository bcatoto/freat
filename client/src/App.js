import React from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import NewPost from './components/NewPost';

import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    return(
      <div id="app">
        <NavBar handleNewPost={() => this.setState({ showModal: true })}/>
        <Routes />
        <NewPost show={this.state.showModal} handleClose={() => this.setState({ showModal: false })} />
      </div>
    );
  }
}
