import React from 'react';
// import BalanceListEntry from './BalanceListEntry.jsx';

const BalanceList = (props) => {
  return (
    <ol>
      {props.balance.map((accountType, index) => {
        // only display accountTypes with available balances
        return (
          <div className="balance-list">
            <h2>
              {accountType}
            </h2>
            <BalanceListEntry 
              name={accountType} 
              key={index} 
              accounts={props.balance[accountType]}
            />
          </div>);
      })}
    </ol>
  );
};

export default BalanceList;