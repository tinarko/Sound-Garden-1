
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
      }
    })
    .then((results) => {
      console.log('response in getUserBudgets action', results);
      dispatch(receivedUserBudgets(results.data));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(fetchUserBudgetsError(error));
    });
  };
};

export const incrementBudget = () => {
  return {
    type: 'INCREMENT_BUDGET'
  };
};

export const decrementBudget = () => {
  return {
    type: 'DECREMENT_BUDGET'
  };
};