import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { createPlaid } from './../actions/plaid.js';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';

const LoggedOptions = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><Menu color="white"/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Add Acounts" onClick={createPlaid} />
    <MenuItem primaryText="Balance" containerElement={<Link to="/Balance" />} />
    <MenuItem primaryText="Budget" containerElement={<Link to="/budget" />} />
    <MenuItem primaryText="Cashback" containerElement={<Link to="/ccCashback" />} />
    <MenuItem primaryText="Transactions" containerElement={<Link to="/transactions" />} />
    <Divider />
    <MenuItem primaryText="Logout" href="/auth/logout" />
  </IconMenu>
);

export default LoggedOptions;