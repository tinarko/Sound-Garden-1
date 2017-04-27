export default (state = {
  toggleDrawer: false
}, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER': {
      var toggle = !state.toggleDrawer;
      return {
        ...state,
        toggleDrawer:toggle
      }
      break;
    }

    case 'CLOSE_DRAWER': {
      return {
        ...state,
        toggleDrawer: false
      }
      break;
    }
    default: 
      return state;
  }
};