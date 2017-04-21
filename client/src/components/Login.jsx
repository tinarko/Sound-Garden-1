import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { createPlaid } from './../actions/plaid.js';
import * as login from './../actions/login.js';

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
        <h1>Welcome to Financial Advisorly!</h1>
        <h3>You are well on your way to saving big</h3>

        <p>Add your bank accounts:</p>
        <RaisedButton id="link-button"
          onClick={createPlaid} label="Add Bank Accounts" 
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,

  };
}) (Login);