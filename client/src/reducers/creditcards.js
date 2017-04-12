const initialState = {
  creditcards: [],
  fetchingCreditcards: false,
  cashbacksetup: false
};

const creditcards = (state = initialState, action) => {
  // var newState= {...state, newChange: newValue}
  switch (action.type) {
    case 'FETCHING_CREDITCARDS':
      return {
        ...state,
        fetchingCreditcards: true
      };
      break;
    case 'RECEIVED_CREDITCARDS':
      return {
        ...state,
        creditcards: action.creditcards
      };
      break;
    case 'FETCH_CREDITCARDS_ERROR':
      return {
        ...state,
        error: action.error
      };
      break;
    case 'TOGGLE_CASHBACK_SETUP':
      return {
        ...state,
        cashbacksetup: !state.cashbacksetup
      };
      break;
    default:
      return state;
  }
};

export default creditcards;