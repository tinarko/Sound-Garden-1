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
    cc: creditcards
  };
};

export const fetchCreditcardsError = (error) => {
  return {
    type: 'FETCH_CREDITCARDS_ERROR',
    cc: error
  };
};

export const createCreditcardsError = (error) => {
  return {
    type: 'CREATE_CREDITCARDS_ERROR',
    cc: error
  };
};

export const toggleCashbackSetup = () => {
  return {
    type: 'TOGGLE_CASHBACK_SETUP'
  };
};

export const createCreditcardsKickoff = () => {
  return (dispatch) => {
    fetch('/creditcards/createcreditcards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    }).then(response => {
      dispatch(getCreditcards());
    })
    .catch((err) => {
      dispatch(createCreditcardsError(err));
    });
  }
};

export const getCreditcards = () => {
  return (dispatch) => {
    dispatch(fetchingCreditcards());
    fetch('/creditcards/getcreditcards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      // console.log('json from getCreditcards in action', json);
      dispatch(receivedCreditcards(json));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(fetchCreditcardsError(err));
    });
  };
};


