export default (state = {
  transactions: {},
  focusedInput: null,
  startDate: null,
  endDate: null,
  error: null,
  fetching: false,
  fetched: false,

}, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS_START': {
      return {
        ...state, 
        fetching: true
      };
      break;
    }
    case 'GET_TRANSACTIONS_ERROR': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case 'GET_TRANSACTIONS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        transactions: action.payload
      };
      break;
    }
    // calendar focus changes
    case 'CALENDAR_ITEM_FOCUSED': {
      return {
        ...state,
        focusedInput: action.payload
      };
    }
    case 'CALENDAR_DATES_CHANGED': {
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      }
    }
    default: 
      return state;
  }
};