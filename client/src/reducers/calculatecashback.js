const initialState = {

};

const calculatecashback = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_ALL_USER_CATEGORIES_ERROR':
      return {
        ...state,
        error: action.error
      };
      break;
    default:
      return state;
    }
};

export default calculatecashback;
