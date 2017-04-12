import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementBudget, decrementBudget } from '../actions/budget.js';

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="budgetCategory">
        {this.props.budgetcategory.name}
        <div>
        Budget Goal: 
        <button onClick={(e) => { this.props.handleChange(
          this.props.budgetcategory.goalvalue, 
          this.props.budgetcategory.name, 
          this.props.index, 
          'decrement'); 
        } }> - </button>
        {this.props.budgetcategory.goalvalue}
        <button onClick={(e) => { this.props.handleChange(
          this.props.budgetcategory.goalvalue, 
          this.props.budgetcategory.name, 
          this.props.index, 'increment'); 
        } }> + </button> 
        </div>
        <div>
        Spent this Month: {this.props.budgetcategory.actualvalue}
        </div>
        <br />
      </div>

    );
  }
}



export default BudgetCategory;