require('es6-promise').polyfill();
require('isomorphic-fetch');

export const fetchingCreditcards = () => {
  return {
    type: 'FETCHING_CREDITCARDS'
  };
};

export const receivedCreditcards = (creditcards) => {
  var results = setCC(creditcards);
  return {
    type: 'RECEIVED_CREDITCARDS',
    cc: results
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
      console.log('error in get', err);
      dispatch(createCreditcardsError(err));
    });
  }
};

export const getCreditcards = () => {
  // userid = userid || 2;
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
      console.log('json from getCreditcards in action', json);
      dispatch(receivedCreditcards(json));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(fetchCreditcardsError(err));
    });
  };
};


// reorganize the db results to a format that makes more sense on state
var setCC = function (array) {
  var results = [];

  if (array.length > 0) {

    var ccid = array[0].ccid;
    results[0] = {
      ccid: ccid, 
      ccname: array[0].ccname,
      categories: []
    };

    var resultsIndex = 0;

    for (var i = 0; i < array.length; i++) {
      
      if (array[i].ccid !== ccid) {
        ccid = array[i].ccid;
        resultsIndex++;
        results[resultsIndex] = {
          ccid: ccid,
          ccname: array[i].ccname,
          categories: []
        };
      }
      
      results[resultsIndex].categories.push({
        name: array[i].categoryname,
        percent: array[i].value, 
        catid: array[i].catid
      });
    }
  }

  return results;
};




