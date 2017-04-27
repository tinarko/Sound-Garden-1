import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import LoggedOptions from './LoggedOptions.jsx';
import IconMenu from 'material-ui/IconMenu';
import * as navbar from './../actions/navbar.js';

//iconElementLeft = {!props.loggedIn ? <div> </div>}
const Navbar = (props) => {
  return (
    <AppBar
      className="app-bar"
      style={{position: 'fixed', top: 0}}
      title={<span className="app-bar-title"><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Advisorly</Link></span>}
      iconElementRight={props.picture ? <a href="/"><Avatar src={props.picture} size={50}/></a> : <FlatButton label="Login" href="/auth/auth0"></ FlatButton>}
      
      onLeftIconButtonTouchTap = {()=> {
        props.dispatch(navbar.toggleDrawer());
      }}
    >
    <LoggedOptions toggleDrawer={props.toggleDrawer} dispatch={props.dispatch}/>
    </AppBar>
  );
};

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,
    picture: state.login.picture,
    toggleDrawer: state.navbar.toggleDrawer
  };
}) (Navbar);
