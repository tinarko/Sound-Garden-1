import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

//import actions
// import * as googlemap from './../actions/googlemap.js';
import { getLocation, yelpQuery } from './../actions/mapcalculator.js'

// import crimeImg from '../img/security.png';

class MapCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.createMap = this.createMap.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
  }

  componentWillMount() {
    this.props.getLocation();
    console.log('props', this.props);
    
  }

  componentDidMount() {
    console.log('props DID MOUNT', this.props);
      
    if (this.props.geolocation) {
      console.log('geolocation!');
      const directionsDisplay = new google.maps.DirectionsRenderer();
      this.map = this.createMap();
      // this.map.addListener('click', (e) => {
      //   console.log(e)
      //   console.log('lat', e.latLng.lat(), e.latLng.lng())
      // })
      directionsDisplay.setMap(this.map);
      this.createMarkers(this.map);
    } 
  }

  createMap() {
    const geolocation = new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.long);
    const mapOptions = {
      zoom: 15,
      center: geolocation,
    };
    return new google.maps.Map(this.refs.map, mapOptions);
  }

  createMarkers(map) {
    if (this.props.geolocation) {
      const marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.long),
        map: this.map,
        draggable: true,
        tile: 'You!',
      });
      google.maps.event.addListener(marker, 'dragend', (e) => {
        var lat = e.latLng.lat();
        var long = e.latLng.lng();
        this.props.yelpQuery(lat, long);
      })
    }
  }

  render() {
    return (
      <div className="google-map">
        <div ref="map" className="map" />
      </div>);
  }
}

export default connect((state) => {
  return {
    geolocation: state.mapcalculator.geolocation
  };
}, (dispatch) => {
  return {
    yelpQuery: (lat, long) => { dispatch(yelpQuery(lat, long)) },
    getLocation: () => { dispatch(getLocation()); }
  }
})(MapCalculator);
