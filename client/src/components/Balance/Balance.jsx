import React from 'react';
import {connect} from 'react-redux';
import * as balance from './../../actions/balance.js';
import BalanceTable from './BalanceTable.jsx';

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(balance.getBalance());
  }

  render () {
    return (
      <div className="balance">
        {this.props.balance.length &&
          <BalanceTable balance={this.props.balance} />
        }
      </div>
    );
  }
}

export default connect ((state) => {
  return {
    balance: state.balance.balance,
    fetching: state.balance.fetching,
    fetched: state.balance.fetched,
  };
}) (Balance);