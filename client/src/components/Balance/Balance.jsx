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
            if (this.props.balance[index - 1]) {
              const prevType = this.props.balance[index - 1].subtype;
              if (item.subtype === prevType) {
                return (
                  // same subtype so add a row to the existing table
                  <div>
                    {/*<BalanceList 
                      account={item}
                      key={index}
                    />*/}
                    <TableBody>
                      <TableBody>
                        <TableHeader>{item.institution_name + ' ' + item.account.name}</TableHeader>
                      </TableBody>
                    </TableBody>
                  </div>);
              } else {
                // new subtype --> new table
                return (
                  <div>
                    <h3>{item.subtype}</h3>
                    {/*<ol>
                      <BalanceList 
                        account={item}
                        key={index}
                      />
                    </ol>*/}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderColumn>Account Name</TableHeaderColumn>
                          <TableHeaderColumn>Balance</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableBody>
                          <TableHeader>{item.institution_name + ' ' + item.name}</TableHeader>
                        </TableBody>
                      </TableBody>
                    </Table>
                  </div>
                );
              }
            } else {
              // new subtype --> new table
              return (
                <div>
                  <h3>{item.subtype}</h3>
                  {/*<ol>
                    <BalanceList 
                      account={item}
                      key={index}
                    />
                  </ol>*/}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderColumn>Account Name</TableHeaderColumn>
                          <TableHeaderColumn>Balance</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableBody>
                          <TableHeader>{item.institution_name + ' ' + item.name}</TableHeader>
                        </TableBody>
                      </TableBody>
                    </Table>
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