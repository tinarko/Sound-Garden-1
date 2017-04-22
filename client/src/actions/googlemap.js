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
        console.log('geolocation after getting location', geolocation);
        dispatch(yelpQuery(geolocation.location.lat, geolocation.location.lng));
        // dispatch(getPlace(geolocation));
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


// export const getPlace = (geolocation) => {
//   return (dispatch) => {
//     fetch('/google/places', {
//       method: 'POST',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         location: geolocation,
//       })
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((placesData) => {
//       dispatch(fetchedLocationPlaces(geolocation.location, placesData.results));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   }
// }

// export const fetchedLocationPlaces = (location, places) => {
//   return {
//     type: 'FETCHED_GOOGLE_DATA', 
//     payload: 
//     {
//       geolocation: location,
//       places: places
//     }
//   }
// }


export const yelpQuery = (lat, long) => {
  var url = `/yelp/businesses/${lat}/${long}`;
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      return response.json();
    })
    .then (json => {
      var yelp = JSON.parse(json);
      console.log('yelp returns', yelp);
      var business = yelp.businesses[0];
      var name = business.name;
      var categories = business.categories;

      dispatch(setPinAndBusinessData(lat, long, name, categories));
    })
    .catch((err) => {
      dispatch(setPinAndBusinessDataError(err));
    });
  }
}

export const setPinAndBusinessData = (lat, long, name, categories) => {
  return {
    type: 'SET_PIN_AND_BUSINESS_DATA',
    lat: lat,
    long: long,
    bizName: name,
    bizCats: categories
  }
}

export const setPinAndBusinessDataError = (err) => {
  return {
    type: 'SET_PIN_AND_BUSINESS_DATA_ERROR',
    error: err
  }
}









