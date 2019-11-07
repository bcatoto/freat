import React from 'react';
import Routes from './components/Routes';

import "bootswatch/dist/custom/bootstrap.min.css";
import "./css/custom.css";

export default class App extends React.Component {
  render() {
    return(
      <div id="app">
        <Routes />
      </div>
    );
  }
}
