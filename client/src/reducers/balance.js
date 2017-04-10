// reducers accept previous state and action
export default (state = {}, action) => {
  switch (action.type) {
    case '': {
      state = {...state/*, changeProp: action.payload*/};
      break;
    }
  }
  return state;
};