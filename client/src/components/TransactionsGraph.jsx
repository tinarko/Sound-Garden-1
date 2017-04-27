import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import d3TransactionsGraph from './Graphs/d3TransactionsGraph.js';

class TransactionsGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this);
    d3TransactionsGraph.create(el, this.props.data);
  }

  render() {
    return (<div className="transactions-graph"></div>);
  }
}

export default TransactionsGraph;
