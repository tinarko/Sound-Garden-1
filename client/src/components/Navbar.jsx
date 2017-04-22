import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createPlaid } from './../actions/plaid.js';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const Navbar = (props) => {
  let view = null;
  if (props.loggedIn) {
    view = (
      <div>
        <FlatButton label="Add Accounts" onClick={createPlaid} containerElement={<Link to ="/"/>} />
        <FlatButton label="Balance" containerElement={<Link to="/Balance" />} />
        <FlatButton label="Budget" containerElement={<Link to="/budget" />} />
        <FlatButton label="Cashback" containerElement={<Link to="/ccCashback" />} />
        <FlatButton label="Transactions" containerElement={<Link to="/transactions" />} />
        <a href="/auth/logout"><FlatButton label="Logout" containerElement={<div/>} /></a>
      </div>
    );
  } else {
    view = (
      <div>
        <a href="/auth/auth0"><FlatButton label="Login" /></a>
      </div>
    );
  }
  return (
    <Toolbar>
      <FlatButton label="FinancialAdvisorly" containerElement={<Link to="/" />} secondary={true}/>
      {view}
    </Toolbar>
  );
};

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
}) (Navbar);
