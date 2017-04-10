import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets } from '../actions/budget.js';
// import { receivedUserBudgets, fetchUserBudgetsError } from '../actions/budget.js';

class Budget extends React.Component {
  constructor (props) {
    super(props);
    this.getTransactionData = this.getTransactionData.bind(this);
  }

  componentWillMount () {
    let { dispatch, getBudgets } = this.props;
    getBudgets(1);
    // this.getUserBudgets(1);
  }

  componentDidMount () {
    console.log('Date.now');
    var today = new Date ();
    var month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0'.concat(month);
    }
    var year = today.getFullYear().toString();

    this.getTransactionData(year, month);
  }

  getTransactionData(year, month) {
    fetch(`/plaid/transactions/${year}/${month}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('successful fetch of transaction data', response);
        response.json()
          .then(function(json) {
            console.log('console.log json', json);
            
          });
      })
      .catch((err) => {
        console.log('error in fetching transaction data', err);
      });
  }

  render () {

    let totalSpent = 500;
    let totalBudget = 600;

    return (
      <div>
        <div>
          Placeholder for Graphs
        </div>
        <div>
        Total Spent: {totalSpent}
        </div>
        <div>
        Total Budget: {totalBudget}
        </div>
        <BudgetCategoryList budgetcategories= {this.props.budgetcategories}/>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    budgetcategories: state.budget.budgets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (userid) => { dispatch(getUserBudgets(userid)); }
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);