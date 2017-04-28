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
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import * as navbar from './../actions/navbar.js';

const LoggedOptions = (props) => (
  <Drawer open={props.toggleDrawer}
  docked={false}
  onRequestChange={() => {
    props.dispatch(navbar.closeDrawer());
  }}>
  <AppBar
      className="app-bar"
      style={{position: 'fixed', top: 0}}
      title={<span className="app-bar-title"><Link to="/"><img className="advisorlyLogo" src="../../../images/logo.png"/></Link></span>}
      onLeftIconButtonTouchTap = {()=> {
        props.dispatch(navbar.closeDrawer());
      }}
      />
    <br/> 
    <br/> 
    <br/> 
    <br/> 

    <MenuItem primaryText="Add Accounts" onClick={createPlaid}/>
    <MenuItem primaryText="Balances" containerElement={<Link to="/balance" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <MenuItem primaryText="Budgets" containerElement={<Link to="/budget" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <MenuItem primaryText="Maximize Cashback" containerElement={<Link to="/ccCashback" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <MenuItem primaryText="Transactions" containerElement={<Link to="/transactions" />} onTouchTap={()=>{ props.dispatch(navbar.closeDrawer()); }}/>
    <Divider />
    <MenuItem primaryText="Logout" href="/auth/logout" />
  </Drawer>
);

export default LoggedOptions;