import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  console.log(props, '0------')
  return (
        <div className="balance">
          {props.balance.map((item, index) => {
            console.log(item);
            if (props.balance[index - 1]) {
              const prevType = props.balance[index - 1].subtype;
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
};

export default BalanceTable;