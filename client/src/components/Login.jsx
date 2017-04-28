import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { createPlaid } from './../actions/plaid.js';
import * as login from './../actions/login.js';
import Balance from './Balance/Balance.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(login.getUser());
  }

  render() {
    return (
      <div className="login">
        <div>
          <h1>Welcome Back, {this.props.name}</h1>
          <h3>Here's where you stand: </h3>
          <Balance />
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,
    name: state.login.name,
    picture: state.login.picture,
  };
}) (Login);
