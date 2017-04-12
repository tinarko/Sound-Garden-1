require('es6-promise').polyfill();
require('isomorphic-fetch');


export const fetchingCashbackCategories = () => {
  return {
    type: 'FETCHING_CASHBACK_CATEGORIES'
  };
};

export const receivedCashbackCategories = (cccategories) => {
  return {
    type: 'RECEIVED_CASHBACK_CATEGORIES',
    cccategories: cccategories
  };
};

 export const fetchCashbackCategoriesError = (error) => {
  return {
    type: 'FETCH_CREDITCARDS_ERROR',
    cccategories: error
  };
};


export const getCashbackCategories = (ccid) => {
  return (dispatch) => {

    dispatch(fetchingCreditcards());
    fetch(`/creditcards/getcashbackcategories/${ccid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
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

