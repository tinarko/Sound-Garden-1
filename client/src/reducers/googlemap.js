var initialState = 
{
  geolocation: null,
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
    case 'SET_PIN_AND_BUSINESS_DATA' : {      
      var newState = (JSON.parse(JSON.stringify(state)));

      newState.geolocation = {
        lat: action.lat,
        long: action.long
      };

      newState.bizName = action.bizName;
      newState.bizCats = action.bizCats;

      console.log('old', state, 'new', newState);

      return newState;
    }
    break;
    case 'SET_PIN_AND_BUSINESS_DATA_ERROR' : {
      return {
        ...state,
        error: action.error
      }
    }
    break;
    default: 
      return state;
  }
};