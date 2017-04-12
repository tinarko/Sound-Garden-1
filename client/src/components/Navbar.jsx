import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Login</Link></li>
      <li><Link to="/Balance">Balance</Link></li>
      <li><Link to="/budget">Budget</Link></li>
      <li><Link to="/ccCashback">CC Selector</Link></li>
      <li><Link to="/portfolio">Portfolio</Link></li>
      <li><Link to="/emailNotifications">Email Notifications</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>
  );
};

export default Navbar;