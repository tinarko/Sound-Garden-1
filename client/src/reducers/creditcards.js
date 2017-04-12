const initialState = {
  creditcards: [],
  userid: 2,
  fetchingCreditcards: false
};

const creditcards = (state = initialState, action) => {
  // var newState= {...state, newChange: newValue}
  switch (action.type) {
    case 'FETCHING_CREDITCARDS':
    return {
      ...state,
      fetchingCreditcards: true
    }
    case 'RECEIVED_CREDITCARDS':
    console.log('state before creditcards', state);
      return {
        ...state,
        creditcards: action.creditcards
      };
    case 'FETCH_CREDITCARDS_ERROR':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default creditcards;