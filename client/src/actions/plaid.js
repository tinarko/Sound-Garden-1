var env, key;
env = process.env.PLAID_env;
key = process.env.PLAID_publicKey;

module.exports.createPlaid = () => {
  Plaid.create({
    clientName: 'Plaid Walkthrough Demo',
    env: env,
    key: key, 
    product: ['auth', 'transactions'],
    onSuccess: function(public_token, metadata) {
      fetch('/plaid/access_token', {
        method: 'POST',
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
          window.location.reload();
        })
        .catch((err) => {
          console.log('error in post to plaid access token', err);
        });
    },
  }).open();
};