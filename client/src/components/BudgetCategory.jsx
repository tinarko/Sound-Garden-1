import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementBudget, decrementBudget } from '../actions/budget.js';

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let actualValue = this.props.budgetcategory.actualvalue || 0;
    return (
      <div className="budgetCategory">
        {this.props.budgetcategory.name}
        <div>
        Budget Goal: 
        <button onClick={(e) => { this.props.handleBudgetChange(
          this.props.budgetcategory.goalvalue, 
          this.props.budgetcategory.name, 
          this.props.index, 
          'decrement',
          this.props.year,
          this.props.month); 
        } }> - </button>
        ${this.props.budgetcategory.goalvalue}
        <button onClick={(e) => { this.props.handleBudgetChange(
          this.props.budgetcategory.goalvalue, 
          this.props.budgetcategory.name, 
          this.props.index, 
          'increment',
          this.props.year,
          this.props.month); 
        } }> + </button> 

        </div>
        <div>
        Spent this Month: ${actualValue}
        </div>
        <br />
      </div>

    );
  }
}



export default BudgetCategory;