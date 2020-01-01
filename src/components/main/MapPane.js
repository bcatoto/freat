import React, {Component} from 'react';
import ReactMapGL, {NavigationControl, Marker,Popup} from 'react-map-gl';
import { Icon } from 'semantic-ui-react';

import coordinates from "../../assets/coordinates.json";

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

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
        }
      };
    }

    renderPopup(index){
      return  (
        <Popup tipSize={5}
          anchor="bottom-right"
          longitude={coordinates[post.building][1]}
          latitude={coordinates[post.building][0]}
          onMouseLeave={() => this.setState({popupInfo: null})}
          closeOnClick={true}>
          <div>food</div>
        </Popup>
        )
      }

    

    render() {
      const {viewport} = this.state;

    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle= "mapbox://styles/ibby/ck4s4lknb3ozs1crzpsxv5r4e"
        mapboxApiAccessToken="pk.eyJ1IjoiaWJieSIsImEiOiJjazRpYm5sb3Ywa3UxM2VudGZsNmxrZDE2In0.v08PMm1hYXIQo6led-GbmQ" >
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={(viewport) => this.setState({viewport})}/>
              {this.props.posts.map((post, index) =>{
                 return(
                   <div key ={index}>
                   <Marker  
                      longitude={coordinates[post.building][1]} 
                      latitude={coordinates[post.building][0]}>
                      <Icon name='hospital' size='big' onMouseEnter={()=>this.setState({popupInfo: true})} onMouseLeave={()=>this.setState({popupInfo: null})}/>
                   </Marker>  
                   {this.renderPopup(index)}
                   </div>
                  );
                 }
               ) }
       </div>
      </ReactMapGL>
    );
  }
}
