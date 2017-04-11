const initialState = {
  budgets: ['test'],
  fetchingBudgets: false,
  error: null, 
  fetchingTransactions: false,
  totalSpent: 0,
  totalBudget: 0
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
      var newArray = state.budgets; 

        for (var category in action.transactions) {
          var found = false;
          for (var i = 0; i < newArray.length; i++) {
            if (category === newArray[i].name) {
              newArray[i].actualvalue = action.transactions[category];
              found = true;
            } 
          }

          if (!found) {
            for (var i =0; i < newArray.length; i++) {
              if (newArray[i] === 'Other') {
                newArray[i].value = newArray[i].value + action.transactions[category];
              }
            }
          }
        }

        console.log('newArray after transformation', newArray);
      return {
        ...state,
        budgets: newArray
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