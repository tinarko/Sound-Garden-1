import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets } from '../actions/budget.js';
// import { receivedUserBudgets, fetchUserBudgetsError } from '../actions/budget.js';

class Budget extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let { dispatch, getBudgets } = this.props;
    getBudgets(1);
    // this.getUserBudgets(1);
  }

  // componentDidMount () {
  //   let { dispatch, getBudgets } = this.props;
  //   getBudgets(1);
  // }

  render () {

    let totalSpent = 500;
    let totalBudget = 600;

    return (
      <div>
        <div>
          Placeholder for Graphs
        </div>
        <div>
        Total Spent: {totalSpent}
        </div>
        <div>
        Total Budget: {totalBudget}
        </div>
        <BudgetCategoryList budgetcategories= {this.props.budgetcategories}/>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    budgetcategories: state.budget.budgets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (userid) => { dispatch(getUserBudgets(userid)); },
    // receivedUserBudgets: (results) => { dispatch(receivedUserBudgets(results.data)); },
    // fetchUserBudgetsError: (error) => { dispatch(fetchUserBudgetsError(error))}
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);