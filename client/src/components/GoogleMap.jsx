import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as googlemap from './../actions/googlemap.js';

// import crimeImg from '../img/security.png';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(googlemap.getLocation());
    if (this.props.geolocation) {
      const directionsDisplay = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService;
      this.map = this.createMap();
      directionsDisplay.setMap(this.map);
    }

    // this.createMarkers(this.map);
  }

  createMap() {
    const geolocation = new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.lng);
    const mapOptions = {
      zoom: 14,
      center: geolocation,
    };
    return new google.maps.Map(this.refs.map, mapOptions);
  }

  createMarkers(map) {
    // const pinIcon = new google.maps.MarkerImage(
    //     crimeImg,
    //     null, /* size is determined at runtime */
    //     null, /* origin is 0,0 */
    //     null, /* anchor is bottom center of the scaled image */
    //     new google.maps.Size(40, 40),
    // );
    if (this.props.crimeData.length) {
      this.props.crimeData.forEach((value) => {
        const infowindow = new google.maps.InfoWindow({
          content: `<div>${value.type}</div>`,
        });
        const marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(value.lat, value.lon),
          map,
          icon: pinIcon,
        });
        google.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
          setTimeout(() => { infowindow.close(); }, '1500');
        });
      });
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="google-map">
        <div ref="map" className="map" />
      </div>);
  }
}

export default connect((state) => {
  return {
    places: state.googlemap.places,
    geolocation: state.googlemap.geolocation
  };
})(GoogleMap);
