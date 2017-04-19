import React from 'react';
// import BalanceListEntry from './BalanceListEntry.jsx';

const BalanceList = (props) => {
  return (
    <li>
      <div>
        <h5>{props.account.institution_name + ' ' + props.account.name}</h5>
      </div>
    </li>
  );
};

export default BalanceList;