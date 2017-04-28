import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  return (
    <div className="balance-table">
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
              Accounts
            </TableHeaderColumn>
          <TableRow>
            <TableHeaderColumn>Account Name</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Balance</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
        >
          {props.balance.map((item, index) => {
            return (<TableRow>
              <TableRowColumn>{item.institution_name + ' ' + item.name}</TableRowColumn>
              <TableRowColumn>{`$${item.balances.available || item.balances.current}`}</TableRowColumn>
              <TableRowColumn>{item.subtype === 'cd' ? 'CD' : item.subtype[0].toUpperCase() + item.subtype.substring(1)}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>);
};

export default BalanceTable;
