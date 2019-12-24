import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import coordinates from "../../assets/coordinates.json";

export default class MapPane extends React.Component {
  constructor(props) {
      super(props);
  }

  renderMarkers(selectedPark, setSelectedPark) {
    return this.props.posts.map(post => (
      <>
        <Marker
          key={post.id}
          latitude={coordinates[post.building][0]}
          longitude={coordinates[post.building][1]}
        >
          <button
            className="marker-btn"
            onClick={e => {
              e.preventDefault();
              setSelectedPark(selectedPark);
            }}
          >
          </button>
        </Marker>
        {selectedPark ? (
          <Popup
            latitude={coordinates[post.building][0]}
            longitude={coordinates[post.building][0]}
            onClose={() => setSelectedPark(null)}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </>
    ));
  }

  render() {
    const [viewport, setViewport] = useState({
      latitude: 40.346760,
      longitude: -74.655187,
      zoom: 16
    });

    const [selectedPark, setSelectedPark] = useState(null);

    return (
      <>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => setViewport(viewport)}
        >
          {this.renderMarkers(selectedPark, setSelectedPark)}
        </ReactMapGL>
        <WrappedMap className="h-100 w-100"
          loadingElement={<div style={{height : "100%"}} />}
          containerElement={<div style={{height : "100%"}} />}
          mapElement={<div style={{height : "100%"}} />}
        />
      </>
    );
  }
}
