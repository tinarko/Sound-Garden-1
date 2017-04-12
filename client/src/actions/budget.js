

const fetchingBudgets = () => {
  return {
    type: 'FETCHING_BUDGETS'
  };
};

export const receivedUserBudgets = (budgets) => {
  return {
    type: 'RECEIVED_BUDGETS',
    budgets
  };
};

export const fetchUserBudgetsError = (error) => {
  return {
    type: 'FETCH_BUDGETS_ERROR',
    error
  };
};

export const getUserBudgets = (userid) => {
  return (dispatch) => {
    dispatch(fetchingBudgets());
    fetch(`/budget/getuserbudgets/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',

    })
    .then(response => response.json())
    .then((json) => {
      dispatch(receivedUserBudgets(json));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(fetchUserBudgetsError(err));
    });
  };
};

const fetchingTransactionData = () => {
  return {
    type: 'FETCHING_TRANSACTION_DATA'
  };
};

export const receivedTransactionData = (transactions) => {
  return {
    type: 'RECEIVED_TRANSACTIONS',
    transactions
  };
};

export const fetchTransactionError = (error) => {
  return {
    type: 'FETCH_TRANSACTIONS_ERROR',
    error
  };
};

export const getTransactionData = (year, month) => {
  return (dispatch) => {
    dispatch(fetchingTransactionData());
    fetch(`/plaid/transactions/${year}/${month}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then((response) => {
        console.log('successful fetch of transaction data', response);
        response.json()
          .then((json) => {
            dispatch(receivedTransactionData(json));
          });
      })
      .catch((err) => {
        console.log('error in fetching transaction data', err);
        dispatch(fetchTransactionError(err));
      });
  };
};

export const incrementBudget = (index) => {
  return {
    type: 'INCREMENT_BUDGET',
    index
  };
};

export const decrementBudget = (index) => {
  return {
    type: 'DECREMENT_BUDGET',
    index
  };
};

export const postUpdatedBudget = (goalvalue, categoryname, index, change) => {
  return (dispatch) => {
    fetch('/budget/updatebudgetcategory', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        categoryname: categoryname,
        goalvalue: goalvalue,
        index: index,
        change: change
      })
    })
    .then((response) => {
      console.log('successful post for updating budget amount', response);
      response.json()
        .then((json) => {
          if (change === 'increment') {
            dispatch(incrementBudget(index));
          } else if (change === 'decrement') {
            dispatch(decrementBudget(index));
          }
        });
    })
    .catch((err) => {
      console.log('error in updating budget amount', err);
      // dispatch(updateBudgetError(err));
    })
    ;
  };

};