import React from 'react';
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
    if (document.cookie.replace(/(?:(?:^|.*;\s*)advisorly\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {
      this.props.dispatch(login.getUser());
    }
  }

  render() {
    return (
      <div className="login">
        {this.props.loggedIn ? 
          <div>
            <h1>Welcome Back, {this.props.name}</h1>
            <h3>Here's where you stand: </h3>
            <img src={this.props.picture} />
            <Balance />
          </div>
        :
          <div>
            <h1>Welcome to Financial Advisorly!</h1>
            <h3>You are well on your way to saving big</h3>
          </div>
        }
        <RaisedButton id="link-button"
          onClick={createPlaid} label="Add More Accounts" 
        />
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