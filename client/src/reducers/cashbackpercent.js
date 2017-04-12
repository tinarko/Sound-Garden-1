
const cashbackpercent = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT_CASHBACK_PERCENT':
    return state + 0.5;
    break;
  case 'DECREMENT_CASHBACK_PERCENT':
    return state - 0.5;
    break;
  default:
    return state;
  }
};

export default cashbackpercent;

