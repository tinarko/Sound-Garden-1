require('es6-promise').polyfill();
require('isomorphic-fetch');

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
    .then( json => {
      console.log('cards', json);
      dispatch(calculateMaxBenefits(json, bizCats));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(getAllUserCategoriesError(err));
    });
  };
};

export const calculateMaxBenefits = (cards, bizCats) => {
  return (dispatch) => {
    fetch('/calculate/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        cards: cards,
        bizCats: bizCats
      }
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


