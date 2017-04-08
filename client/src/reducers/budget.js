const initialState = {
  budgets: ['test'],
  fetchingBudgets: false,
  error: null
};


const budget = (state = initialState, action) => {
  // var newState= {...state, newChange: newValue}
  switch (action.type) {
    case 'FETCHING_BUDGETS':
    return {
      ...state,
      fetchingBudgets: true
    }
    case 'RECEIVED_BUDGETS':
      return {
        ...state,
        budgets: action.budgets
      };
    case 'FETCH_BUDGETS_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'INCREMENT_BUDGET':
      return state + 10;
    case 'DECREMENT_BUDGET':
      return state - 10;
    default:
      return state;
  }
};

export default budget;