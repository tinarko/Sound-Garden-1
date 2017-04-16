import React from 'react';
import {connect} from 'react-redux';
import Calendar from './Calendar.jsx';
import TransactionsGraph from './TransactionsGraph.jsx';
import * as transactions from './../actions/transactions.js';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Transactions</h1>
        <br/>
        <Calendar />
        {this.props.startDate && this.props.endDate && this.props.transactions.length &&
          <TransactionsGraph data={this.props.transactions}/>
        }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    transactions: state.transactions.transactions,
    startDate: state.transactions.startDate,
    endDate: state.transactions.endDate,
    fetching: state.transactions.fetching,
    fetched: state.transactions.fetched,
  };
}) (Transactions);
