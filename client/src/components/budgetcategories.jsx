import React from 'react';
import ReactDOM from 'react-dom';

class BudgetCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let category = 'Restaurant'; 
    let budgetGoal = 300;
    let actualSpending = 100;

    return (
      <li className="budgetCategory">
        {category}
        Budget Goal: {budgetGoal}
        Spent this Month: {actualSpending}
      <button> Edit </button>
      </li>
    )
  }
}

export default BudgetCategories;