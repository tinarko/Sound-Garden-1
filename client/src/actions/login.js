export const getUser = () => {
  return (dispatch) => {
    fetch('/auth/user', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log('user response', response);
        dispatch({type: 'GET_USER_SUCCESS', payload: response});
      })
      .catch((err) => {
        dispatch({type: 'GET_USER_ERROR', payload: err});
      });
  };
};