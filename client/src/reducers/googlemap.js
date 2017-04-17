export default (state = {
  geolocation: null,
  places: null,
}, action) => {
  switch (action.type) {
    // case 'GETTING_GEOLOCATION': {
    //   return {
    //     ...state,
    //     geolocation: payload
    //   };
    //   break;
    // }
    // case 'GETTING_PLACES': {
    //   return {
    //     ...state,
    //     places: payload
    //   }
    // }
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