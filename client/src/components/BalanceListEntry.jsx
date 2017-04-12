import React from 'react';

const BalanceListEntry = (props) => {
  return (
    <li>
      {props.accounts.map((account) => {
        return (
          <div>
            <h5>{account.account.name}</h5>
            <h5 className={(props.name==='credit' || props.mortgage==='mortgage') ? "balance-list-credit" : ""}>{account.account.balances.available || account.account.balances.current}</h5>
          </div>
        );
      })}
    </li>);
};
export default BalanceListEntry;