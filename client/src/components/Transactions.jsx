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
    this.onGraphClick = this.onGraphClick.bind(this);
    this.onTableClick = this.onTableClick.bind(this);
  }
  
  onGraphClick() {
    this.props.dispatch({type: 'SHOW_GRAPH'});
  }

  onTableClick() {
    this.props.dispatch({type: 'SHOW_TABLE'});
  }

  render() {
    let information = null;
    if (this.props.startDate && this.props.endDate && this.props.showGraph) {
      information = <TransactionsGraph data={this.props.transactions} />;
    } else if (this.props.startDate && this.props.endDate && this.props.showTable) {
      information = <TransactionsTable data={this.props.transactions} />;
    }
    return (
      <div>
        <h1>Transactions</h1>
        <br/>
        <RaisedButton onClick={this.onTableClick}>Show Table</RaisedButton>
        <RaisedButton onClick={this.onGraphClick}>Show Graph</RaisedButton>
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
