import React from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import Pins from './Pins';

import coordinates from "../../assets/coordinates.json";

const PIN = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

export default class MapPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 40.346760,
        longitude: -74.655187,
        zoom: 16,
        width: 1025,
        height:700
      },
      popup: null
    };
  }

  onViewportChange = viewport => this.setState({ viewport });

  onClickPin = post => {
    this.setState({ popup: post });
  };

  renderPopup(index) {
    const post = this.props.post;
    if (post === undefined) {
      return;
    }
    else {
      return (
        <Popup tipSize={5}
          anchor="bottom-right"
          longitude={coordinates[post.building][1]}
          latitude={coordinates[post.building][0]}
          onMouseLeave={() => this.setState({popupInfo: null})}
          closeOnClick={true}>
          <div>food</div>
        </Popup>
      );
    }
  }

  render() {
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={this.onViewportChange}
        mapStyle="mapbox://styles/ibby/ck4s4lknb3ozs1crzpsxv5r4e"
        mapboxApiAccessToken="pk.eyJ1IjoiaWJieSIsImEiOiJjazRpYm5sb3Ywa3UxM2VudGZsNmxrZDE2In0.v08PMm1hYXIQo6led-GbmQ"
      >
        <Pins
          posts={this.props.posts}
          onClick={this.onClickPin}
        />
        <div id="nav">
          <NavigationControl onViewportChange={this.onViewportChange} />
        </div>
      </ReactMapGL>
    );
  }
}
