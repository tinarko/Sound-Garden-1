
const cashbackpercent = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT_CASHBACK_PERCENT':
    return state + 0.5;
  case 'DECREMENT_CASHBACK_PERCENT':
    return state - 0.5;
  default:
    return state;
  }
};

export default cashbackpercent;

