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
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import * as navbar from './../../actions/navbar.js';

const Navbar = (props) => {
  return (
    <AppBar
      className="app-bar"
      style={{position: 'fixed', top: 0}}
      title={<span className="app-bar-title"><Link to="/"><img className="advisorlyLogo" src="../../../images/logo.png"/></Link></span>}
      iconElementRight={props.picture ? <Link to="/"><Avatar src={props.picture} size={50}/></Link> : <FlatButton label="Login" href="/auth/auth0"></ FlatButton>}
      iconElementLeft={props.loggedIn ? <IconButton><NavigationMenu/> </IconButton> : <div> </div>}
      onLeftIconButtonTouchTap = {()=> {
        props.dispatch(navbar.toggleDrawer());
      }}>
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
