import React from 'react';
import BalanceListEntry from './BalanceListEntry.jsx';

const BalanceList = (props) => {
  return (
    <ol>
      {props.name}
      <div className="balance-list-entry">
        {props.balance.map((account, index) => {
          // only display accounts with available balances
          if (account.balances.available) {
            return (<BalanceListEntry account={account} key={index}/>);
          }
          return;
        })}
      </div>
    </ol>
  );
};

export default BalanceList;