import React from 'react';
import ReactDOM from 'react-dom';

// import Map, {GoogleApiWrapper} from '../../src/index'
import GoogleMapReact from 'google-maps-react';

export default class GoogleMap extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lat: null,
  //     lng: null
  //   };
  //   window.markers = [];
  // }

  // getCurrentLocation(cb) {
  //   var options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   };
  //   navigator.geolocation.getCurrentPosition((location) => {
  //     this.setState({
  //       lat: location.coords.latitude,
  //       lng: location.coords.longitude
  //     });

  //     if (cb) {
  //       cb('Done fetching location, ready.');
  //     }
  //   }, (err) => {
  //     console.log('error occurred: ', err);
  //   }, options);
  // }

  // componentDidMount() {
  //   this.getCurrentLocation((ready) => {
  //     if (ready) {
  //       // one time map render on page ready
  //       this.renderMap();
  //     }
  //   });
  // }

  // renderMap() {
  //   let currLoc = {lat: this.state.lat, lng: this.state.lng};
  //   // save map to window to be able to redraw as current location changes
  //   window.map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 15,
  //     center: currLoc

  //   });
  //   window.marker = new google.maps.Marker({
  //     position: currLoc,
  //     map: map
  //   });

  //   marker.setAnimation(google.maps.Animation.BOUNCE);
  // }

  render() {
    return (
      <div>
        <div id="map"></div>
        <script>
          var map;
          {function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -34.397, lng: 150.644},
              zoom: 8
            });
          }}
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBiOV6kWR0gDT-oDu4wcp_P-3M3J1biHzc&callback=initMap"
                async defer></script>
      </div>
    );
  }

}
