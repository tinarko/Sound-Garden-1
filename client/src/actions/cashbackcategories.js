require('es6-promise').polyfill();
require('isomorphic-fetch');


export const fetchingCashbackCategories = () => {
  return {
    type: 'FETCHING_CASHBACK_CATEGORIES'
  };
};

export const receivedCashbackCategories = (cashbackcategories) => {
  return {
    type: 'RECEIVED_CASHBACK_CATEGORIES',
    cc: cashbackcategories
  };
};

 export const fetchCashbackCategoriesError = (error) => {
  return {
    type: 'FETCH_CASHBACK_ERROR',
    cc: error
  };
};


export const getCashbackCategories = (ccid) => {
  return (dispatch) => {

    dispatch(fetchingCashbackCategories());
    fetch(`/creditcards/getcashbackcategories/${ccid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      dispatch(receivedCashbackCategories(json));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(fetchCashbackCategoriesError(err));
    });
  };
};

