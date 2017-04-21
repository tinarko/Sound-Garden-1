export const getUser = () => {
  return (dispatch) => {
    fetch('/auth/user', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json()
          .then((data) => {
            dispatch({type: 'GET_USER_SUCCESS', payload: data});
          })
          .catch((err) => {
            dispatch({type: 'GET_USER_ERROR', payload: err});
          });
      })
      .catch((err) => {
        dispatch({type: 'GET_USER_ERROR', payload: err});
      });
  };
};