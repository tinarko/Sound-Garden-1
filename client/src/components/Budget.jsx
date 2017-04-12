import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets, getTransactionData, incrementBudget, decrementBudget, postUpdatedBudget, toggleAddBudgetCategoryInput } from '../actions/budget.js';
// import { getTransactionData } from '../actions/transactions.js';

class Budget extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let { dispatch, getBudgets, getTransactionData, handleIncrement, handleDecrement} = this.props;

    // this.getUserBudgets();
    getBudgets();

    var today = new Date ();
    var month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0'.concat(month);
    }
    var year = today.getFullYear().toString();

    // this.getTransactionData(year, month);
    getTransactionData(year, month);
  }

  render () {

    return (
      <div>
        <div>
          Placeholder for Graphs
        </div>
    
        <BudgetCategoryList budget= {this.props.budget} handleBudgetChange={this.props.handleBudgetChange} toggleAddBudgetCategoryInput={this.props.toggleAddBudgetCategoryInput}/>
        
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget,
    // transactions: state.transactions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: () => { dispatch(getUserBudgets()); },
    getTransactionData: (year, month) => { dispatch(getTransactionData(year, month)); },
    handleBudgetChange: (goalvalue, categoryname, index, change) => { dispatch(postUpdatedBudget(goalvalue, categoryname, index, change)); },
    // toggleAddBudgetCategoryInput: () => { dispatch(toggleAddBudgetCategoryInput()); }
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);