import React from "react";
import { GoogleMap, Marker } from "react-google-maps"

export default function Map(props) {
  return (
    <GoogleMap
      defaultZoom = {17}
      defaultCenter = {{lat:40.3487,lng:-74.6593}}
    >
      <Marker
        key = {1}
        position = {{lat:40.3487,lng:-74.6593}}
      />
      <Marker
        key = {2}
        position = {{lat:40.3479,lng:-74.6579}}
        />
    </GoogleMap>
  );
}
