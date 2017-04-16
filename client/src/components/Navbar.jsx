import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import budget from './NavIcons/budget.jpeg';
// import cashback from './NavIcons/cashback.png';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const Navbar = () => {
  return (
    <Toolbar>
      <FlatButton label="FinancialAdvisorly"  containerElement={<Link to="/" />} secondary={true}/>
      <FlatButton label="Balance" containerElement={<Link to="/Balance" />} />
      <FlatButton label="Budget" containerElement={<Link to="/budget" />} />
      <FlatButton label="Cashback" containerElement={<Link to="/ccCashback" />} />
      <FlatButton label="Transactions" containerElement={<Link to="/transactions" />} />
      <FlatButton label="Logout" containerElement={<Link to="/" />}/>
    </Toolbar>
  );
};

export default Navbar;

/*
    <ul>
      <li><Link to="/">Login</Link></li>
      <li><Link to="/Balance">Balance</Link></li>
      <li><Link to="/budget">Budget</Link></li>
      <li><Link to="/ccCashback">CC Selector</Link></li>
      <li><Link to="/portfolio">Portfolio</Link></li>
      <li><Link to="/emailNotifications">Email Notifications</Link></li>
      <li><Link to="/transactions">Transactions</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>

*/