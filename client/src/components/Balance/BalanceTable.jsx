import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  return (
    <div className="balance-table">
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Account Name</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Balance</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Type</TableHeaderColumn>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
        >
          {props.balance.map((item, index) => {
            return (<TableRow>
              <TableRowColumn style={{fontSize: '20', color: '#000', fontFamily: 'Roboto'}}>{item.institution_name + ' ' + item.name}</TableRowColumn>
              <TableRowColumn style={{fontSize: '20', color: '#000', fontFamily: 'Roboto'}}>{`$${item.balances.available || item.balances.current}`}</TableRowColumn>
              <TableRowColumn style={{fontSize: '20', color: '#000', fontFamily: 'Roboto'}}>{item.subtype === 'cd' ? 'CD' : item.subtype[0].toUpperCase() + item.subtype.substring(1)}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>);
};

export default BalanceTable;
