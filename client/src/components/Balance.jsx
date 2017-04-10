import React from 'react';
import * as balance from './../actions/balance.js';

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    balance.getBalance();
  }

  render () {
    return (
      <div>
        <h1>Balance</h1>
      </div>
    );
  }
}

export default Balance;