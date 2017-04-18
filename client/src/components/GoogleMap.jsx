import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

//import actions
import * as googlemap from './../actions/googlemap.js';

// import crimeImg from '../img/security.png';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.createMap = this.createMap.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(googlemap.getLocation());
  }

  componentDidUpdate() {
    // originally in componentDidMount
    if (this.props.geolocation) {
      const directionsDisplay = new google.maps.DirectionsRenderer();
      this.map = this.createMap();
      this.map.addListener('click', (e) => {
        console.log(e)
        console.log('lat', e.latLng.lat(), e.latLng.lng())
      })
      directionsDisplay.setMap(this.map);
      this.createMarkers(this.map);
    }
  }

  createMap() {
    const geolocation = new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.lng);
    const mapOptions = {
      zoom: 15,
      center: geolocation,
    };
    return new google.maps.Map(this.refs.map, mapOptions);
  }

  createMarkers(map) {
    // if (this.props.places.length) {
    //   this.props.places.forEach((value) => {
    //     console.log(value)
    //     const infowindow = new google.maps.InfoWindow({
    //       content: 
    //       `<div>
    //         <p>${value.name}</p>
    //         <p>${value.types[0]}</p>
    //       </div>`,
    //     });
    //     const marker = new google.maps.Marker({
    //       animation: google.maps.Animation.DROP,
    //       position: new google.maps.LatLng(value.geometry.location.lat, value.geometry.location.lng),
    //       map: this.map,
    //       icon: new google.maps.MarkerImage(
    //         value.icon,
    //         null,
    //         null,
    //         null,
    //         new google.maps.Size(40, 40)
    //       )
    //     });
    //     google.maps.event.addListener(marker, 'mouseover', () => {
    //       infowindow.open(map, marker);
    //       setTimeout(() => { infowindow.close(); }, '1000');
    //     });
    //   });
    // }
    if (this.props.geolocation) {
      const marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.lng),
        map: this.map,
        draggable: true,
        tile: 'You!',
      });
      google.maps.event.addListener(marker, 'dragend', (e) => {
        console.log('lat', e.latLng.lat(), e.latLng.lng())        
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
    places: state.googlemap.places,
    geolocation: state.googlemap.geolocation
  };
})(GoogleMap);
