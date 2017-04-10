// reducers accept previous state and action
export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_BALANCE_START': {
      state = {
        ...state, 
        fetching: true
      };
      break;
    }
    case 'GET_BALANCE_ERROR': {
      state = {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case 'GET_BALANCE_FULFILLED': {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        balance: action.payload
      };
      break;
    }
  }
  return state;
};