import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <h3>Welcome!</h3>
      // read the token, if they are signed in: render button to add stuff to plaid OR go to balances
      // else show this button
      <button>Sign In with Facebook</button>
      <button id="link-button"
        onClick={() => {
          Plaid.create({
            clientName: 'Plaid Walkthrough Demo',
            env: 'sandbox',
            key: config.plaid.publicKey, // Replace with your public_key to test with live credentials
            product: ['auth', 'transactions'],
            // webhook: '[WEBHOOK_URL]', // Optional – use webhooks to get transaction and error updates
            // selectAccount: false, // Optional – trigger the Select Account
            onLoad: function() {
              // Optional, called when Link loads
            },
            onSuccess: function(public_token, metadata) {
              // Send the public_token to your app server.
              // The metadata object contains info about the institution the
              // user selected and the account ID, if `selectAccount` is enabled.
              $.post('/get_access_token', {
                public_token: public_token,
              });
            },
            onExit: function(err, metadata) {
              // The user exited the Link flow.
              if (err != null) {
                // The user encountered a Plaid API error prior to exiting.
              }
              // metadata contains information about the institution
              // that the user selected and the most recent API request IDs.
              // Storing this information can be helpful for support.
            }
          }).open();
        }}
      >Add Accounts to Plaid</button>
    </div>
  );
};