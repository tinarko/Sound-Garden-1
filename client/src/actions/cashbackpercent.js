module.exports = {

  incrementCashbackPercent: () => {
    return {
      type: 'INCREMENT_CASHBACK_PERCENT'
    };
  },

  decrementCashbackPercent: () => {
    return {
      type: 'DECREMENT_CASHBACK_PERCENT'
    };
  }

}