export const getTransactions = () => {
  return (dispatch) => {
    dispatch({type: 'GET_TRANSACTIONS_START'});
    fetch('/plaid/transactions', {
      // TODO: required to send cookies
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log('successful fetch of transactions data', response);
        response.json()
          .then((json) => {
            dispatch({type: 'GET_TRANSACTIONS_FULFILLED', payload: json});
          });
      })
      .catch((err) => {
        console.log('error in fetching transactions data', err);
        dispatch({type: 'GET_TRANSACTIONS_ERROR', payload: err});
      });
  };
};

export const setCalendarFocusedInput = (focusedInput) => {
  return {
    type: 'CALENDAR_ITEM_FOCUSED',
    payload: focusedInput
  };
};

export const setSelectedDate = (dates) => {
  return {
    type: 'CALENDAR_DATES_CHANGED',
    payload: dates
  };
};