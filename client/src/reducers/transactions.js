export default (state = {
  transactions: {},
  error: null,
  fetching: false,
  fetched: false,

}, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS_START': {
      return state = {
        ...state, 
        fetching: true
      };
      break;
    }
    case 'GET_TRANSACTIONS_ERROR': {
      return state = {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case 'GET_TRANSACTIONS_FULFILLED': {
      return state = {
        ...state,
        fetching: false,
        fetched: true,
        transactions: action.payload
      };
      break;
    }
    default: 
      return state;
  }
};