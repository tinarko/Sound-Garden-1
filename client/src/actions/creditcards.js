require('es6-promise').polyfill();
require('isomorphic-fetch');

export const fetchingCreditcards = () => {
  return {
    type: 'FETCHING_CREDITCARDS'
  };
};

export const receivedCreditcards = (creditcards) => {
  return {
    type: 'RECEIVED_CREDITCARDS',
    creditcards: creditcards
  };
};

 export const fetchCreditcardsError = (error) => {
  return {
    type: 'FETCH_CREDITCARDS_ERROR',
    creditcards: error
  };
};

export const toggleCashbackSetup = () => {
  return {
    type: 'TOGGLE_CASHBACK_SETUP'
  };
};

export const getCreditcards = (userid) => {
  userid = userid || 2;
  return (dispatch) => {
    dispatch(fetchingCreditcards());
    fetch(`/creditcards/getcreditcards/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then((json) => {
      dispatch(receivedCreditcards(json));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(fetchCreditcardsError(err));
    });
  };
};



