require('es6-promise').polyfill();
require('isomorphic-fetch');

export const incrementCashbackPercent = (ccid, catid) => {
  return {
    type: 'INCREMENT_CASHBACK_PERCENT',
    ccid: ccid,
    catid: catid
  };
};

export const decrementCashbackPercent = (ccid, catid) => {
  return {
    type: 'DECREMENT_CASHBACK_PERCENT',
    ccid: ccid,
    catid: catid
  };
}

export const changeCashbackPercentError = () => {
  return {
    type: 'CHANGE_CASHBACK_PERCENT_ERROR'
  };
}


export const changeCashbackPercent = (catid, percent, action, ccid) => {
  return (dispatch) => {
    fetch('/creditcards/changecashbackpercent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        catid: catid,
        percent: percent,
        action: action
      })
    })
    .then(response => {
      if (action === 'increment'){
        dispatch(incrementCashbackPercent(ccid, catid));
      } else {
        dispatch(decrementCashbackPercent(ccid, catid));
      }
      // results = setCC(json);
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(changeCashbackPercentError(err));
    });
  };
};

export const createCashbackCategoryError = () => {
  return {
    type: 'CREATE_CASHBACK_CATEGORY_ERROR'
  };
}

export const createCashbackCategory = (ccid, name, percent, catid) => {
  return {
    type: 'CREATE_CASHBACK_CATEGORY',
    ccid: ccid, 
    name: name,
    percent: percent,
    catid: catid
  };
}

export const createCashbackCategoryKickoff = (ccid, name, percent) => {
  return (dispatch) => {
    fetch('/creditcards/createcashbackcategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        ccid: ccid, 
        name: name, 
        percent: percent
      })
    })
    .then(response => {
      console.log('response', response);
      var catid = response.insertId;
      dispatch(createCashbackCategory(ccid, name, percent, catid));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(createCashbackCategoryError(err));
    });
  };
};
