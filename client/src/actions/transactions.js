export const getTransactions = (dates) => {
  console.log('we are trying to gettransactions')
  return (dispatch) => {
    dispatch({type: 'GET_TRANSACTIONS_START'});
    fetch('/plaid/allTransactions', {
      // TODO: required to send cookies
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: dates.startDate,
        endDate: dates.endDate,
      }),
    })
      .then((response) => {
        console.log('successful fetch of transactions data', response);
        response.json()
          .then((json) => {
            console.log(json);
            dispatch({type: 'GET_TRANSACTIONS_FULFILLED', payload: {
              transactions: json,
              endDate: dates.calendarEndDate,
              startDate: dates.calendarStartDate
            }});
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