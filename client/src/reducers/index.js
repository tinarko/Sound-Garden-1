import { combineReducers } from 'redux';
import balance from './balance.js';
import budget from './budget.js';
import creditcards from './creditcards';
import transactions from './transactions.js';
import mapcalculator from './mapcalculator.js';
import login from './login.js';
import navbar from './navbar.js';

export default combineReducers({
  balance,
  budget,
  creditcards,
  transactions,
  mapcalculator,
  login,
  navbar
});