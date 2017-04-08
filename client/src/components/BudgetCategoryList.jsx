import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategory from './BudgetCategory.jsx';
import { connect } from 'react-redux';
import { getUserBudgets } from '../actions/budget.js';

class BudgetCategoryList extends React.Component {
  constructor (props) {
    super(props);
    console.log('this.props in BudgetList', this.props);
  }

  render () {

    let month = 'April'; 

    return (
      <div>
        <h2> Budget for {month} </h2>
        {this.props.budgetcategories.map ((budgetcategory) => {
          return <BudgetCategory budgetcategory = {budgetcategory}/>;
        }) }
        
      </div>

    )
  }
}

export default BudgetCategoryList;