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

