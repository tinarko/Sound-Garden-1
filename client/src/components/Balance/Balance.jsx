import React from 'react';
import {connect} from 'react-redux';
import * as balance from './../actions/balance.js';
import BalanceList from './BalanceList.jsx';

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  // works with componentWillMount as well
  componentDidMount() {
    // dispatch function is in props
    this.props.dispatch(balance.getBalance());
  }

  render () {
    let balance = null;
    if (this.props.fetching) {
      // serve loading
    } else if (this.props.fetched) {
      balance = (
        <div className="balance">
          {Object.keys(this.props.balance).map((key, index) => {
            return (
              <div>
                <h1>{key}</h1>
                <BalanceList 
                  name={key}
                  balance={this.props.balance[key]}
                  key={index}
                />
              </div>);
          })}
        </div>);
    }
    return (
      <div>
        <h1>Balance</h1>
        {balance}
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