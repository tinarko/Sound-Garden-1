import fetch from 'isomorphic-fetch';

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
    //note to self: investigate why commented out code is different from the one below...
    // .then((results) => {
    //   console.log('results', results);
    //   console.log('results.json() in getUserBudgets action', results.json());
    //   return results.json();
    // })
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