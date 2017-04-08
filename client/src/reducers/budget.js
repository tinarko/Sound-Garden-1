
const budget = (state = 0, action) => {
  // var newState= {...state, newChange: newValue}
  switch (action.type) {
  case 'INCREMENT_BUDGET':
    return state + 10;
  case 'DECREMENT_BUDGET':
    return state - 10;
  default:
    return state;
  }
};

export default budget;