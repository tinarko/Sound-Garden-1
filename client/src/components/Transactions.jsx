import React from 'react';
import {connect} from 'react-redux';
import Calendar from './Calendar.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import TransactionsGraph from './TransactionsGraph.jsx';
import TransactionsTable from './TransactionsTable.jsx';
import * as transactions from './../actions/transactions.js';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let information = null;
    if (this.props.startDate && this.props.endDate && this.props.fetched) {
      information = (
        <div>
          <TransactionsGraph data={this.props.transactions} />
          <TransactionsTable data={this.props.transactions} />
        </div>
      );
    } else {
      information = <TransactionsTable data={this.props.transactions} />;
    }
    return (
      <div className='transactions component'>
        <h1>
          <img className='componentIcon' src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTm50tK43pGJ9EWr66kD9lELxuufTfyB9Yhoej0Fohs8ZnBb8i'/>Transactions
        </h1>
        <br/>
        <Calendar />
        {information}
      </div>
    );
  }
}

export default connect((state) => {
  return {
    transactions: state.transactions.transactions,
    showGraph: state.transactions.showGraph,
    showTable: state.transactions.showTable,
    startDate: state.transactions.startDate,
    endDate: state.transactions.endDate,
    fetching: state.transactions.fetching,
    fetched: state.transactions.fetched,
  };
}) (Transactions);
