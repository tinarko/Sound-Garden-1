const initialState = {
  cc: [],
  fetchingCreditcards: false,
  cashbacksetup: false
};

const creditcards = (state = initialState, action) => {
//   // var newState= {...state, newChange: newValue}
//   onst initialState = {
//   // cashbackcategories: [],
//   fetchingCashbackCategories: false,
//   creditcards: {cashbackcategories:[]}
// };

// const cashbackcategories = (state = initialState, action) => {
  switch (action.type) {
    
    // case 'FETCHING_CASHBACK_CATEGORIES':
    //   return {
    //     ...state,
    //     fetchingCashbackCategories: true
    //   };
    //   break;

    // case 'RECEIVED_CASHBACK_CATEGORIES':
    //   return {
    //     ...state,
    //     cashbackcategories: action.cashbackcategories
    //   };
    //   break;
    // case 'FETCH_CASHBACK_ERROR':
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    //   break;

    case 'FETCHING_CREDITCARDS':
      return {
        ...state,
        fetchingCreditcards: true
      };
      break;
    case 'RECEIVED_CREDITCARDS':
      return {
        ...state,
        cc: action.cc
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
      
    case 'INCREMENT_CASHBACK_PERCENT':
      return state + 0.5;
      break;
    case 'DECREMENT_CASHBACK_PERCENT':
      return state - 0.5;
      break;
    default:
      return state;
    }
};

export default creditcards;


