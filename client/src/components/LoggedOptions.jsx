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
import Drawer from 'material-ui/Drawer';
import * as navbar from './../actions/navbar.js';
// <IconMenu
//     iconButtonElement={
//       <IconButton><Menu color="white"/></IconButton>
//     }
//     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//   >
const LoggedOptions = (props) => (
  <Drawer open={props.toggleDrawer}
  docked={false}
  onRequestChange={() => {
    props.dispatch(navbar.closeDrawer());
  }}>
    <MenuItem primaryText="Add Accounts" onClick={createPlaid}/>
    <MenuItem primaryText="Balance" containerElement={<Link to="/Balance" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <MenuItem primaryText="Budget" containerElement={<Link to="/budget" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <MenuItem primaryText="Cashback" containerElement={<Link to="/ccCashback" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <MenuItem primaryText="Transactions" containerElement={<Link to="/transactions" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <Divider />
    <MenuItem primaryText="Logout" href="/auth/logout" />
  </Drawer>
);

export default LoggedOptions;