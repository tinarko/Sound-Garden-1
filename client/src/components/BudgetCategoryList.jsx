import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategories from './BudgetCategories.jsx';

class Budget extends React.Component {
  constructor (props) {
    super(props);
    console.log('this.props in Budget', this.props);
  }

  render () {

    let month = 'April'; 

    // need to include Router for Budget Edit Button
    return (
      <div>
        <h2> Budget for {month} </h2>
        <BudgetCategories/>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budgets.budgets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (userid) => { dispatch(getUserBudgets(userid)); }
  };
};
export default Budget;