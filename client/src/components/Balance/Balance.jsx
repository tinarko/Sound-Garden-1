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
            if (this.props.balance[index - 1]) {
              const prevType = this.props.balance[index - 1].subtype;
              if (item.subtype === prevType) {
                return (
                  <div>
                    <BalanceList 
                      account={item}
                      key={index}
                    />
                  </div>);
              } else {
                return (
                  <div>
                    <h3>{item.subtype}</h3>
                    <ol>
                      <BalanceList 
                        account={item}
                        key={index}
                      />
                    </ol>
                  </div>
                );
              }
            } else {
              return (
                <div>
                  <h3>{item.subtype}</h3>
                  <ol>
                    <BalanceList 
                      account={item}
                      key={index}
                    />
                  </ol>
                </div>
              );
            }
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

export default connect ((state) => {
  return {
    balance: state.balance.balance,
    fetching: state.balance.fetching,
    fetched: state.balance.fetched,
  };
}) (Balance);