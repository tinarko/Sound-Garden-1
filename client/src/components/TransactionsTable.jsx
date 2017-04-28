import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const TransactionsTable = (props) => {
  return (
    <div className="balance-table">
      <Table fixedHeader={true}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="4" tooltip="Transactions" style={{textAlign: 'center'}}>
              Transactions
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Transaction</TableHeaderColumn>
            <TableHeaderColumn>Amount</TableHeaderColumn>
            <TableHeaderColumn>Bank</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
        >
          {props.data.map((item, index) => {
            return (<TableRow>
              <TableRowColumn>{item.name}</TableRowColumn>
              <TableRowColumn>{'$' + Math.abs(item.amount)}</TableRowColumn>
              <TableRowColumn>{item.institution_name}</TableRowColumn>
              <TableRowColumn>{item.date}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>);
};

export default TransactionsTable;
