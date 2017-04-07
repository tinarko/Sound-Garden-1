import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementBudget, decrementBudget } from '../actions/budget.js';

class BudgetCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('this.props', this.props);
  }


  render() {

    let category = 'Restaurant'; 
    let actualSpending = 200;

    return (
      <p className="budgetCategory">
        {category}
        <div>
        Budget Goal: {this.props.budget} <button onClick={(e) => { this.props.handleIncrement(); } }> Increment </button> <button onClick={(e) => { this.props.handleDecrement(); } }> Decrement </button>
        </div>
        <div>
        Spent this Month: {actualSpending}
        </div>
      </p>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement: () => { dispatch(incrementBudget()); },
    handleDecrement: () => { dispatch(decrementBudget()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (BudgetCategories);