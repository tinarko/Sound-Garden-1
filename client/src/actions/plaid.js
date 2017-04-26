// import config from './../../../config/config.js';

module.exports.createPlaid = () => {
  Plaid.create({
    clientName: 'Plaid Walkthrough Demo',
    env: process.env.PLAID_env,
    key: process.env.PLAID_publicKey, 
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
      }
    }
  }).open();
};