require('es6-promise').polyfill();
require('isomorphic-fetch');

export const incrementCashbackPercent = () => {
  return {
    type: 'INCREMENT_CASHBACK_PERCENT'
  };
};

export const decrementCashbackPercent = () => {
  return {
    type: 'DECREMENT_CASHBACK_PERCENT'
  };
}

export const changeCashbackPercentError = () => {
  return {
    type: 'CHANGE_CASHBACK_PERCENT_ERROR'
  };
}

export const changeCashbackPercent = (catid, percent, action) => {
  return (dispatch) => {
    fetch('/creditcards/changecashbackpercent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      data: {
        catid: catid,
        percent: percent,
        action: action
      }
    })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      if (action === 'increment'){
        dispatch(incrementCashbackPercent(json));
      } else {
        dispatch(decrementCashbackPercent(json));
      }
      // results = setCC(json);
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(changeCashbackPercentError(err));
    });
  };
};

