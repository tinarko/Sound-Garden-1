import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets, getTransactionData } from '../actions/budget.js';
// import { receivedUserBudgets, fetchUserBudgetsError } from '../actions/budget.js';

class Budget extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let { dispatch, getBudgets, getTransactionData} = this.props;
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

    let totalSpent = 500;
    let totalBudget = 600;

    return (
      <div>
        <div>
          Placeholder for Graphs
        </div>
    
        <BudgetCategoryList budget= {this.props.budget}/>
        
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
    getTransactionData: (year, month) => { dispatch(getTransactionData(year, month)); }
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);