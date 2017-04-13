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

