export default (state = {
  geolocation: null,
  places: null,
}, action) => {
  switch (action.type) {
    case 'FETCHED_GOOGLE_DATA': {
      return {
        ...state,
        geolocation: action.payload.geolocation,
        places: action.payload.places
      }
    }
    default: 
      return state;
  }
};