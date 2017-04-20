import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { createPlaid } from './../actions/plaid.js';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const Navbar = (props) => {
  let view = null;
  console.log(document.cookie.replace(/(?:(?:^|.*;\s*)advisorly\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
  if (document.cookie.replace(/(?:(?:^|.*;\s*)advisorly\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {
    view = (
      <div>
        <FlatButton label="Add Account" onClick={createPlaid} containerElement={<Link to ="/"/>} />
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

export default Navbar;
