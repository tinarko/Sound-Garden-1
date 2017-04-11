import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategory from './BudgetCategory.jsx';
import { connect } from 'react-redux';
import { getUserBudgets } from '../actions/budget.js';

class BudgetCategoryList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let month = 'April'; 

    return (
      <div>
        <h2> Budget for {month} </h2>
        <div>
        Total Spent: {this.props.budget.totalSpent}
        </div>
        <div>
        Total Budget: {this.props.budget.totalBudget}
        </div>
        <br />
        <div>
        {this.props.budget.budgets.map ((budgetcategory) => {
          return <BudgetCategory budgetcategory = {budgetcategory}/>;
        }) }
        </div>
        
      </div>

    )
  }
}

export default BudgetCategoryList;