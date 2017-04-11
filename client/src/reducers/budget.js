const initialState = {
  budgets: ['test'],
  fetchingBudgets: false,
  error: null, 
  transactions: null,
  fetchingTransactions: false
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
    case 'FETCHING_TRANSACTION_DATA':
      return {
        ...state,
        fetchingTransactions: true
      }
    case 'RECEIVED_TRANSACTIONS':
      return {
        ...state,
        transactions: action.transactions
      };
    case 'FETCH_TRANSACTIONS_ERROR':
      return {
        ...state,
        error: action.error
      }

    case 'INCREMENT_BUDGET':
      return state + 10;
    case 'DECREMENT_BUDGET':
      return state - 10;
    default:
      return state;
  }
};

export default budget;