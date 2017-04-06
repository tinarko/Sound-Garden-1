import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategories from './budgetcategories.jsx';

class Budget extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let month = 'April'; 
    let totalSpent = 500;

    // need to include Router for Budget Edit Button
    return (
      <div>
        <h2> Monthly Spending for {month} </h2>
        <div>
          Placeholder for Graphs
        </div>
        <div>
        Total Spent: {totalSpent}

        </div>
        <BudgetCategories/>
      </div>

    )
  }
}

export default Budget;