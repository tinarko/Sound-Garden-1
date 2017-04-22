import React from 'react';
import {connect} from 'react-redux';
import * as balance from './../../actions/balance.js';
import BalanceList from './BalanceList.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
            console.log(item);
            if (this.props.balance[index - 1]) {
              const prevType = this.props.balance[index - 1].subtype;
              if (item.subtype === prevType) {
                return (
                  // same subtype so add a row to the existing table
                  <div>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow>
                          <TableRowColumn>{item.institution_name + ' ' + item.name}</TableRowColumn>
                          <TableRowColumn>{'Balance: $' + item.balances.current}</TableRowColumn>
                        </TableRow>
                      </TableBody>
                  </div>);
              } else {
                // new subtype --> new table
                return (
                  <div>
                    <h6>{item.subtype === 'cd' ? 'CD Accounts' : item.subtype[0].toUpperCase() + item.subtype.substring(1) + ' Accounts'}</h6>
                    <Table >
                      <TableHeader displaySelectAll={false}>
                        <TableRow>
                          <TableHeaderColumn>Account Name</TableHeaderColumn>
                          <TableHeaderColumn>Balance</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow>
                          <TableRowColumn>{item.institution_name + ' ' + item.name}</TableRowColumn>
                          <TableRowColumn>{'Balance: $' + item.balances.current}</TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                );
              }
            } else {
              // new subtype --> new table
              return (
                <div>
                  <h6>{item.subtype === 'cd' ? 'CD Accounts' : item.subtype[0].toUpperCase() + item.subtype.substring(1) + ' Accounts'}</h6>
                    <Table>
                      <TableHeader displaySelectAll={false}>
                        <TableRow>
                          <TableHeaderColumn>Account Name</TableHeaderColumn>
                          <TableHeaderColumn>Balance</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow>
                          <TableRowColumn>{item.institution_name + ' ' + item.name}</TableRowColumn>
                          <TableRowColumn>{'Balance: $' + item.balances.current}</TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                </div>
              );
            }
          })}
        </div>);
    }
    return (
      <div className="balance">
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