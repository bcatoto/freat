import React from "react";
import { GoogleMap, Marker,InfoWindow, withScriptjs, withGoogleMap } from "react-google-maps"

import coordinates from "./../assets/coordinates.json"

require('dotenv').config()

export default class MapPane extends React.Component {
  generateLink() {
    return "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" +
      process.env.REACT_APP_GOOGLE_MAPS_API
  }

  renderMarkers() {
    return this.props.posts.map(post =>
      <Marker
        key={post.id}
        position={{
          lat:coordinates[post.building][0],
          lng:coordinates[post.building][1]
        }}
        onClick = {() =>(
          <InfoWindow
          position = {{
            lat:coordinates[post.building][0],
            lng:coordinates[post.building][1]
          }}
          >
          <div>post.title</div>
          </InfoWindow>

        )}
      />
    );
  }

  render() {
    const WrappedMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{lat:40.346760, lng:-74.655187}}
      >
        {this.renderMarkers()}
      </GoogleMap>
    )));

    return (
      <WrappedMap className="h-100 w-100"
        googleMapURL={this.generateLink()}
        loadingElement={<div style={{height : "100%"}} />}
        containerElement={<div style={{height : "100%"}} />}
        mapElement={<div style={{height : "100%"}} />}
      />
    );
  }
}
