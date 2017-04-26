export const getTransactions = (dates) => {
  return (dispatch) => {
    dispatch({type: 'GET_TRANSACTIONS_START'});
    fetch(`/plaid/transactions/${dates.startDate}/${dates.endDate}/calendar`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
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

export const showToolTip = (e) => {
  return {
    type: 'SHOW_TOOLTIP',
    payload: 
    {
      display: true,
      data: {
        key: e.target.getAttribute('data-key'),
        value: e.target.getAttribute('data-value')
      },
      pos: {
        x: e.target.getAttribute('cx'),
        y: e.target.getAttribute('cy'),
      }
    }
  };
};

export const hideToolTip = (e) => {
  return {
    type: 'HIDE_TOOLTIP',
    payload:
    {
      display: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      }
    }
  };
};