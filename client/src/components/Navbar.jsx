import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import LoggedOptions from './LoggedOptions.jsx';
import IconMenu from 'material-ui/IconMenu';

const Navbar = (props) => {
  return (
    <AppBar
      className="app-bar" 
      title={<span className="app-bar-title">Advisorly<Link to="/" /></span>}
      iconElementLeft={<div></div>}
      iconElementRight={props.loggedIn ? <LoggedOptions/> : <FlatButton label="Login" href="/auth/auth0"></ FlatButton>}
    />
  );
};

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
}) (Navbar);
