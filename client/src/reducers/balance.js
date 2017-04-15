// reducers accept previous state and action
export default (state = {
  balance: {},
  error: null,
  fetching: false,
  fetched: false,

}, action) => {
  switch (action.type) {
    case 'GET_BALANCE_START': {
      return {
        ...state, 
        fetching: true
      };
      break;
    }
    case 'GET_BALANCE_ERROR': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case 'GET_BALANCE_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        balance: action.payload
      };
      break;
    }
    default: 
      return state;
  }
};