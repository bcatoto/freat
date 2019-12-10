import React from "react";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";

export default class Notifications extends React.Component {
  handleClose = event => {
    this.props.closeNotif(this.props.id);
  }

  render() {
    if (this.props.success) {
      return (
        <Toast autohide
          show={this.props.show}
          onClose={this.handleClose}
          delay={4000}
          className="toast-success"
        >
          <Toast.Header closeButton="true" className="toast-header-success">
            <span className="mr-auto">{this.props.message}</span>
          </Toast.Header>
        </Toast>
      );
    }
    else {
      return (
        <Toast autohide
          show={this.props.show}
          onClose={this.handleClose}
          delay={4000}
          className="toast-fail"
        >
          <Toast.Header closeButton="true" className="toast-header-fail">
            <span className="mr-auto">{this.props.message}</span>
          </Toast.Header>
        </Toast>
      );
    }
  }
}
