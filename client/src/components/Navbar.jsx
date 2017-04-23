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

const Navbar = (props) => {
  return (
    <AppBar
      className="app-bar"
      styles={{position: 'fixed', top: 0}}
      title={<span className="app-bar-title"><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Advisorly</Link></span>}
      iconElementLeft={props.picture ? <Avatar src={props.picture} size={50}/> : <div></div>}
      iconElementRight={props.loggedIn ? <LoggedOptions/> : <FlatButton label="Login" href="/auth/auth0"></ FlatButton>}
    />
  );
};

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,
    picture: state.login.picture,
  };
}) (Navbar);
