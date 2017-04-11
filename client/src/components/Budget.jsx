import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets, getTransactionData, incrementBudget, decrementBudget } from '../actions/budget.js';
// import { receivedUserBudgets, fetchUserBudgetsError } from '../actions/budget.js';

class Budget extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let { dispatch, getBudgets, getTransactionData, handleIncrement, handleDecrement} = this.props;
    // this.getUserBudgets(1);
    getBudgets(1);

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
    
        <BudgetCategoryList budget= {this.props.budget} handleIncrement={this.props.handleIncrement} handleDecrement = {this.props.handleDecrement} />
        
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (userid) => { dispatch(getUserBudgets(userid)); },
    getTransactionData: (year, month) => { dispatch(getTransactionData(year, month)); },
    handleIncrement: (index) => { dispatch(incrementBudget(index)); },
    handleDecrement: (index) => { dispatch(decrementBudget(index)); }
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);