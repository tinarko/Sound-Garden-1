export default (state = {
  // types of payloads and default state must match
  transactions: null,
  focusedInput: null,
  startDate: null,
  endDate: null,
  error: null,
  fetching: false,
  fetched: false,
  showGraph: true,
  showTable: false,
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
      const transactions = action.payload.transactions.slice();
      return {
        ...state,
        fetching: false,
        fetched: true,
        transactions: transactions, 
        endDate: action.payload.endDate,
        startDate: action.payload.startDate
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
    case 'SHOW_GRAPH': {
      console.log('trying to show the graph');
      return {
        ...state,
        showGraph: true,
        showTable: false
      }
    }
    case 'SHOW_TABLE': {
      console.log('trying to show the table');
      return {
        ...state,
        showGraph: false,
        showTable: true,
      }
    }
    default: 
      return state;
  }
};