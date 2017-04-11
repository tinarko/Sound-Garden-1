import React from 'react';
import BalanceListEntry from './BalanceListEntry.jsx';

const BalanceList = (props) => {
  console.log(props);
  return (
    <ol>
      {props.name}
      <div className="balance-list-entry">
        <BalanceListEntry {...props} />
      </div>
    </ol>
  );
};

export default BalanceList;