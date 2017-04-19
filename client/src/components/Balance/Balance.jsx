import React from 'react';
import {connect} from 'react-redux';
import * as balance from './../../actions/balance.js';
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
    console.log(this.props.balance);
    let balance = null;
    if (this.props.fetching) {
      // serve loading
    } else if (this.props.fetched) {
      balance = (
        <div className="balance">
          <br/>
          {this.props.balance.map((item, index) => {
            return (
              <div>
                <h3 className="institution-name">{item.institution_name}</h3>
                <BalanceList 
                  accounts={this.props.balance.accounts}
                  key={index}
                />
              </div>);
          })}
        </div>);
    }
    return (
      <div>
        <h1>Balances</h1>
        <br/>
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