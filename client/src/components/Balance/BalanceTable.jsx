import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  return (
        <div className="balance">
          {props.balance.map((item, index) => {
            if (props.balance[index - 1]) {
              const prevType = props.balance[index - 1].subtype;
              if (item.subtype === prevType) {
                return (
                  <div>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow>
                          <TableRowColumn>{item.institution_name + ' ' + item.name}</TableRowColumn>
                          <TableRowColumn>{'       $' + item.balances.current}</TableRowColumn>
                        </TableRow>
                      </TableBody>
                  </div>);
              } else {
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
                          <TableRowColumn>{'       $' + item.balances.current}</TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                );
              }
            } else {
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
                          <TableRowColumn>{'       $' + item.balances.current}</TableRowColumn>
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