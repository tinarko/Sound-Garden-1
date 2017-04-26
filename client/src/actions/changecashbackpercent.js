require('es6-promise').polyfill();
require('isomorphic-fetch');

export const incrementCashbackPercent = (ccindex, catindex) => {
  return {
    type: 'INCREMENT_CASHBACK_PERCENT',
    ccindex: ccindex,
    catindex: catindex
  };
};

export const decrementCashbackPercent = (ccindex, catindex) => {
  return {
    type: 'DECREMENT_CASHBACK_PERCENT',
    ccindex: ccindex,
    catindex: catindex
  };
};

export const changeCashbackPercentError = () => {
  return {
    type: 'CHANGE_CASHBACK_PERCENT_ERROR'
  };
};

export const changeCashbackPercent = (ccindex, catindex, percent, action, catid) => {
  return (dispatch) => {
    fetch('/cashback/', {
      method: 'PUT',
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
        dispatch(incrementCashbackPercent(ccindex, catindex));
      } else {
        dispatch(decrementCashbackPercent(ccindex, catindex));
      }
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(changeCashbackPercentError(err));
    });
  };
};
