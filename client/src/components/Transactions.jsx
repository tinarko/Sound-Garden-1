import React from 'react';
import {connect} from 'react-redux';
import Calendar from './Calendar.jsx';
import TransactionsGraph from './TransactionsGraph.jsx';
import * as transactions from './../actions/transactions.js';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }

  ComponentDidMount() {
    // this.props.dispatch(transactions.getTransactions());
  }

  render() {
    return (
      <div>
        <h3>transactions</h3>
        <Calendar />        
        <TransactionsGraph />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    transactions: state.transactions.transactions,
    fetching: state.transactions.fetching,
    fetched: state.transactions.fetched,
  };
}) (Transactions);
