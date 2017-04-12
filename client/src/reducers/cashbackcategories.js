const initialState = {
  cashbackcategories: [],
  fetchingCashbackCategories: false
};

const cashbackcategories = (state = initialState, action) => {
  switch (action.type) {
    
    case 'FETCHING_CASHBACK_CATEGORIES':
      return {
        ...state,
        fetchingCashbackCategories: true
      };
      break;

    case 'RECEIVED_CASHBACK_CATEGORIES':
      return {
        ...state,
        cashbackcategories: action.cashbackcategories
      };
      break;
    case 'FETCH_CASHBACK_ERROR':
      return {
        ...state,
        error: action.error
      };
      break;
    default:
      return state;
  }
};

export default cashbackcategories;

