import React from 'react';
import config from './../../../config/config.js';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onPlaidClick = this.onPlaidClick.bind(this);
  }

  onPlaidClick() {
    Plaid.create({
      clientName: 'Plaid Walkthrough Demo',
      env: config.plaid.plaidEnv,
      key: config.plaid.publicKey,
      product: ['auth', 'transactions'],
      // webhook: '[WEBHOOK_URL]', // Optional – use webhooks to get transaction and error updates
      // selectAccount: true, // Optional – trigger the Select Account
      onLoad: function() {
      },
      onSuccess: function(public_token, metadata) {
        fetch('/plaid/access_token', {
          method: 'POST',
          // TODO: required to send cookies
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            public_token: public_token,
            metadata: metadata,
          })
        })
          .then((response) => {
            console.log('successful post to plaid access token');
          })
          .catch((err) => {
            console.log('error in post to plaid access token', err);
          });
      },
      onExit: function(err, metadata) {
        console.log(metadata);
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }
      }
    }).open();
  }

  render() {
    return (
      <div className="login">
        <h1>Welcome to Financial Advisorly!</h1>
        <br />
        <h3>You are well on your way to saving big</h3>
        <br/>
        <br />

        <p>Add your bank accounts:</p>
        <br/>
        <RaisedButton id="link-button"
          onClick={this.onPlaidClick} label="Add Bank Accounts" 
        />
        <br />

      </div>
    );
  }
};

export default Login;