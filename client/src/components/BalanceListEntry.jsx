import React from 'react';

const BalanceListEntry = (props) => {
  console.log(props);
  return (
    <li>
      <p>{props.account.name}</p>
      <p>Available: {props.account.balances.available}</p>
    </li>
  );
};
export default BalanceListEntry;