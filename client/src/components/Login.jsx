import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { createPlaid } from './../actions/plaid.js';

const Login = (props) => {
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
};

export default Login;