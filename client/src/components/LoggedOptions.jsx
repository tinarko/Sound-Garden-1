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
import Dehaze from 'material-ui/svg-icons/navigation/dehaze';

const LoggedOptions = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><Dehaze color="white"/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Add Acounts" onClick={createPlaid} />
    <MenuItem primaryText="Balance" containerElement={<Link to="/Balance" />} />
    <MenuItem primaryText="Budget" containerElement={<Link to="/budget" />} />
    <MenuItem primaryText="Cashback" containerElement={<Link to="/ccCashback" />} />
    <MenuItem primaryText="Transactions" containerElement={<Link to="/trasnactions" />} />
    <MenuItem primaryText="Logout" containerElement={<div />} href="/auth/logout" />
  </IconMenu>
);

export default LoggedOptions;