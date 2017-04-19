import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class BudgetFriends extends React.Component { 
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1> Hi Friends </h1>
    );
  }
}

export default BudgetFriends;