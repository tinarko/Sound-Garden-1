import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  return (
        <div className="balance-table">
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Account Name</TableHeaderColumn>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Balance</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={true}>
              {props.balance.map((item, index) => {
                return (<TableRow>
                  <TableRowColumn>{item.institution_name + ' ' + item.name}</TableRowColumn>
                  <TableRowColumn>{`$${item.balances.available || item.balances.current}`}</TableRowColumn>
                  <TableRowColumn>{item.subtype}</TableRowColumn>
                </TableRow>);
              })}
            </TableBody>
          </Table>
        </div>);
};

export default BalanceTable;
