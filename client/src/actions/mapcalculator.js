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
      // dispatch(setPinAndBusinessData(lat, long, name, categories));
      dispatch(getAllUserCategories(categories));
    })
    .catch((err) => {
      dispatch(setPinAndBusinessDataError(err));
    });
  }
}

export const getAllUserCategories = (bizCats) => {
  return (dispatch) => {
    fetch('/cashback/getallusercategories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
    .then(response => {
      return response.json();
    })
    .then(userCats => {
      console.log('userCats at actions', userCats);
      dispatch(calculateMaxBenefits(userCats, bizCats));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(getAllUserCategoriesError(err));
    });
  };
};

export const calculateMaxBenefits = (userCats, bizCats) => {
  return (dispatch) => {
    fetch('/cashback/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userCats: userCats,
        bizCats: bizCats
      })
    })
    .then( response => {
      return response.json();
    })
    .then (json => {
      console.log(json);
    })
    .catch((err) => {
      console.log('error calculating', err);
      dispatch(calculateMaxBenefitsError(err));
    })
  }

};

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

export const getAllUserCategoriesError = (error) => {
  return {
    type: 'GET_ALL_USER_CATEGORIES_ERROR',
    error: error
  }
};

export const calculateMaxBenefitsError = (error) => {
  return {
    type: 'CALUCLATE_MAX_BENEFITS_ERROR',
    error: error
  }
};









