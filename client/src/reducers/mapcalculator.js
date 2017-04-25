var initialState = 
{
  geolocation: {
    lat: 37.7836577760287,
    long: -122.40881301209487
    },
  places: null,
  bizName: '// business name//',
  bizCats: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_GOOGLE_DATA': {
      return {
        ...state,
        geolocation: action.payload.geolocation,
        places: action.payload.places
      }
    }
    break;

    case 'SET_PIN_AND_BUSINESS_DATA': 
      var newState = (JSON.parse(JSON.stringify(state)));

      newState.geolocation = {
        lat: action.lat,
        long: action.long
      };

      return {
        ...newState,
        ccName: action.ccName,
        cashbackPercent: action.cashbackPercent,
        cashbackCategory: action.cashbackCategory,
        bizName: action.bizName
      };
      break;

    case 'SET_PIN_AND_BUSINESS_DATA_ERROR':
    case 'GET_ALL_USER_CATEGORIES_ERROR':
    case 'CALUCLATE_MAX_BENEFITS_ERROR':
    case 'GET_LOCATION_ERROR':
    case 'GET_LOCATION_REQUEST_ERROR':
      return {
        ...state,
        error: action.error
      };
      break;

    default:
      return state;
  }
};