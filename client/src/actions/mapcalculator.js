export const getLocation = () => {
  return (dispatch) => {
    fetch('/google', {
      method: 'GET',
      credentials: 'same-origin',
    })
    .then((response) => {
      response.json()
      .then((geolocation) => {
        dispatch(yelpQuery(geolocation.location.lat, geolocation.location.lng));
      })
      .catch((err) => {
        dispatch(getLocationError(error));
      });
    })
    .catch((error) => {
      dispatch(getLocationRequestError(error));
    });
  };
};

export const yelpQuery = (lat, long) => {
  var url = `/yelp/${lat}/${long}`;
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
      var business = yelp.businesses[0];
      var bizName = business.name;
      var bizCats = business.categories;
      dispatch(getAllUserCategories(bizCats, lat, long, bizName));
    })
    .catch((err) => {
      dispatch(setPinAndBusinessDataError(err));
    });
  }
}

export const getAllUserCategories = (bizCats, lat, long, bizName) => {
  return (dispatch) => {
    fetch('/cashback', {
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
      dispatch(calculateMaxBenefits(userCats, bizCats, lat, long, bizName));
    })
    .catch((err) => {
      dispatch(getAllUserCategoriesError(err));
    });
  };
};

export const calculateMaxBenefits = (userCats, bizCats, lat, long, bizName) => {
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
      var ccName = json[0];
      var cashbackPercent = json[1];
      var cashbackCategory = json[2];
      dispatch(setPinAndBusinessData(lat, long, ccName, cashbackPercent, cashbackCategory, bizName));
    })
    .catch((err) => {
      dispatch(calculateMaxBenefitsError(err));
    })
  }
};


export const setPinAndBusinessData = (lat, long, ccName, cashbackPercent, cashbackCategory, bizName) => {
  var bank = ccName.split('-')[0].slice(0,-1);
  return {
    type: 'SET_PIN_AND_BUSINESS_DATA',
    lat: lat,
    long: long,
    ccName: ccName,
    cashbackPercent: cashbackPercent,
    cashbackCategory: cashbackCategory,
    bizName: bizName,
    bank: bank
  }
}

export const setPinAndBusinessDataError = (error) => {
  return {
    type: 'SET_PIN_AND_BUSINESS_DATA_ERROR',
    error: error
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

export const getLocationError = (error) => {
  return {
    type: 'GET_LOCATION_ERROR',
    error: error
  }
};

export const getLocationRequestError = (error) => {
  return {
    type: 'GET_LOCATION_REQUEST_ERROR',
    error: error
  }
};







