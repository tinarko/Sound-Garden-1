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
    // calendar focus changes
    case 'CALENDAR_ITEM_FOCUSED': {
      return state = {
        ...state,
        focusedInput: action.payload
      };
    }
    case 'CALENDAR_DATES_CHANGED': {
      return state = {
        ...states,
        startDate: payload.startDate,
        endDate: payloadtype.endDate,
      }
    }
    default: 
      return state;
  }
};