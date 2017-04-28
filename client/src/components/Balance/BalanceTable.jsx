import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BalanceTable = (props) => {
  return (
    <div className="balance-table component">

      <h1>
        <img className='componentIcon' src='data:image/png;base64,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'/> Balances
      </h1>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="3" style={{textAlign: 'center', fontSize: '26'}}>
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
