export const getLocation = () => {
  return (dispatch) => {
    // obtain geolocation
    fetch('/google/geolocate', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      response.json()
      .then((geolocation) => {
        // obtain nearby stores
        console.log('geolocation', geolocation);
        dispatch(getPlace(geolocation));
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((error) => {
      // TODO: error handle
      console.log(error);
    });
  };
};


export const getPlace = (geolocation) => {
  return (dispatch) => {
    fetch('/google/places', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: geolocation,
      })
    })
    .then((response) => {
      response.json()
      .then((placesData) => {
        dispatch(fetchedLocationPlaces(geolocation.location, placesData.results));
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export const fetchedLocationPlaces = (location, places) => {
  return {
    type: 'FETCHED_GOOGLE_DATA', 
    payload: 
    {
      geolocation: location,
      places: places
    }
  }
}



