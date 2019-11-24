import React from "react";
import ReactDOM from "react-dom";

class Landing extends React.Component {
  handleClick = event => {
    window.location.pathname = '/home'
  }
  
  render() {
    return (
      <Container fluid id="profile" className="p-0">
        <Link to="/home">
          <Button variant="navbar"
            onChange={this.handleClick}>
            Freat
          </Button>
        </Link>
      </Container>
    );
  }
}

ReactDOM.render((
  <Landing />
), document.getElementById("root"));
