import React from "react";
import Container from "react-bootstrap/Container";
import Notification from "./notifications/Notification";

export default class Notifications extends React.Component {
  renderNotifications() {
    return this.props.notifs.map(notif =>
      <Notification
        id={notif.id}
        show={notif.show}
        success={notif.success}
        message={notif.message}
        closeNotif={this.props.closeNotif}
      />
    )
  }

  render() {
    return (
      <Container id="toast-container" className="p-0">
        {this.renderNotifications()}
      </Container>
    );
  }
}
