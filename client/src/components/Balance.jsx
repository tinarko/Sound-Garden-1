import React from 'react';
import {connect} from 'react-redux';
import * as balance from './../actions/balance.js';

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  // works with componentWillMount as well
  componentDidMount() {
    console.log(this.props);
    // dispatch function is in props
    this.props.dispatch(balance.getBalance());
  }

  render () {

    return (
      <div>
        <h1>Balance</h1>
      </div>
    );
  }
}

// takes pieces of store and adds as props
export default connect ((state) => {
  return {
    balance: state.balance.balance,
    fetching: state.balance.fetching,
    fetched: state.balance.fetched,
  };
}) (Balance);