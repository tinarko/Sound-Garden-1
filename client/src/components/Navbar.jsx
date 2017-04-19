import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const Navbar = (props) => {
  let view = null;
  if (!decodeURI(document.cookie)) {
    view = (
      <div>
        <FlatButton label="Balance" containerElement={<Link to="/Balance" />} />
        <FlatButton label="Budget" containerElement={<Link to="/budget" />} />
        <FlatButton label="Cashback" containerElement={<Link to="/ccCashback" />} />
        <FlatButton label="Transactions" containerElement={<Link to="/transactions" />} />
        <a href="/auth/logout"><FlatButton label="Logout" /></a>
      </div>
    );
  } else {
    view = (
      <div>
        <a href="/auth/auth0"><FlatButton label="Login" /></a>
      </div>
    );
  }
  return (
    <Toolbar>
      <FlatButton label="FinancialAdvisorly"  containerElement={<Link to="/" />} secondary={true}/>
      {view}
    </Toolbar>
  );
};

export default connect((state) => {
  return {

  };
})(Navbar);
