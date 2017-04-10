export const getBalance = () => {
  // dispatching in this manner utilizes the thunk middleware
  return (dispatch) => {
    dispatch({type: 'GET_BALANCE_START'});
    fetch('/plaid/accounts', {
      // TODO: required to send cookies
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log('successful fetch of account data', response);
        response.json()
          .then((json) => {
            dispatch({type: 'GET_BALANCE_FULFILLED', payload: json});
          });
      })
      .catch((err) => {
        console.log('error in fetching account data', err);
        dispatch({type: 'GET_BALANCE_ERROR', payload: err});
      });
  };
};
