import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const TransactionsTable = (props) => {
  return (
    <div className="balance-table">
      <Table fixedHeader={true}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="4" tooltip="Transactions" style={{textAlign: 'center', fontSize: '26'}}>
              Transactions
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn style={{fontSize: '22'}}>Transaction</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '22'}}>Amount</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '22'}}>Bank</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '22'}}>Date</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
        >
          {props.data.map((item, index) => {
            return (<TableRow>
              <TableRowColumn style={{fontSize: '16'}}>{item.name}</TableRowColumn>
              <TableRowColumn style={{fontSize: '16'}}>{'$' + Math.abs(item.amount)}</TableRowColumn>
              <TableRowColumn style={{fontSize: '16'}}>{item.institution_name}</TableRowColumn>
              <TableRowColumn style={{fontSize: '16'}}>{item.date}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>);
};

export default TransactionsTable;
