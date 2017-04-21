export default (state = {
  loggedIn: false,
  name: null,
  picture: null,
  error: null,
}, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS': {
      console.log('reducing the logged in', action.payload);
      return {
        ...state,
        loggedIn: true,
        name: action.payload.name,
        picture: action.payload.picture,
      }
      break;
    }
    case 'GET_USER_ERROR': {
      return {
        ...state,
        error: action.payload
      }
      break;
    }
    default: 
      return state;
  }
};