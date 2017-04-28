import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  return (
    <div className="balance-table">
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="3" style={{textAlign: 'center', fontSize: '26'}}>
              Accounts
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn style={{fontSize: '22'}}>Account Name</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '22'}}>Balance</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '22'}}>Type</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
        >
          {props.balance.map((item, index) => {
            return (<TableRow>
              <TableRowColumn style={{fontSize: '14'}}>{item.institution_name + ' ' + item.name}</TableRowColumn>
              <TableRowColumn style={{fontSize: '14'}}>{`$${item.balances.available || item.balances.current}`}</TableRowColumn>
              <TableRowColumn style={{fontSize: '14'}}>{item.subtype === 'cd' ? 'CD' : item.subtype[0].toUpperCase() + item.subtype.substring(1)}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>);
};

export default BalanceTable;
