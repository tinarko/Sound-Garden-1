import React from 'react';
import config from './../../../config/config.js';

//styling
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onPlaidClick = this.onPlaidClick.bind(this);
    this.getAccountData = this.getAccountData.bind(this);
    // this.getTransactionData = this.getTransactionData.bind(this);
  }

  getAccountData() {
    fetch('/plaid/accounts', {
      // TODO: required to send cookies
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log('successful fetch of account data', response);
        response.json()
          .then(function(json) {
            console.log(json);
          });
      })
      .catch((err) => {
        console.log('error in fetching account data', err);
      });
  }

  onPlaidClick() {
    // will sign a user into an Item and store the access token into the database (used to access institutional data)
    Plaid.create({
      clientName: 'Plaid Walkthrough Demo',
      env: config.plaid.plaidEnv,
      key: config.plaid.publicKey,
      // key: key,
      product: ['auth', 'transactions'],
      // webhook: '[WEBHOOK_URL]', // Optional – use webhooks to get transaction and error updates
      // selectAccount: true, // Optional – trigger the Select Account
      onLoad: function() {
        // Optional, called when Link loads
      },
      onSuccess: function(public_token, metadata) {
        // Send the public_token to your app server.
        // The metadata object contains info about the institution the
        // user selected and the account ID, if `selectAccount` is enabled.
        
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
        // The user exited the Link flow.
        console.log(metadata);
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
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
        {/* TODO: pass loggedIn prop here && check
        // read the token, if they are signed in: render button to add stuff to plaid OR go to balances
        // else show this button*/}
        <br />

        <p>Add your bank accounts:</p>
        <br/>
        <RaisedButton id="link-button"
          onClick={this.onPlaidClick} label="Add Bank Accounts" />
          <br />
          <br/ >
        <p>Developer Console magic:</p>
        <br/>
        <RaisedButton onClick={this.getAccountData} label="Check account data" />

      </div>
    );
  }
};

export default Login;