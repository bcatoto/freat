import React from "react";
import Map from "./Map"
import { withScriptjs, withGoogleMap } from "react-google-maps"

export default class MapPane extends React.Component {
  constructor(props) {
    super(props);
  }

  generateLink() {
    return "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" +
      process.env.REACT_APP_API_KEY
  }

  render() {
    const WrappedMap = withScriptjs(withGoogleMap(Map))

    return (
      <WrappedMap className="h-100 w-100"
        googleMapURL = {this.generateLink()}
        loadingElement = {<div style ={{height : "100%"}} />}
        containerElement = {<div style ={{height : "100%"}} />}
        mapElement = {<div style ={{height : "100%"}} />}
      />
    );
  }
}
