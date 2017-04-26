var plaid = require('plaid');
var Promise = require('bluebird');
var PLAID_CLIENT_ID  = process.env.PLAID_clientID;
var PLAID_SECRET     = process.env.PLAID_clientSecret;
var PLAID_PUBLIC_KEY = process.env.PLAID_publicKey;
var PLAID_ENV        = process.env.PLAID_env;

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  // TODO: adjust environment as product life cycle advances
  plaid.environments[PLAID_ENV]
);

module.exports.promisePlaid = function(dbResponse, reqType, cb, startDate, endDate) {
  var promises = dbResponse.map(function(item) {
    if (reqType === 'getTransactions') {
      return client[reqType](item.access_token, startDate, endDate)
        .then(function(data) {
          data.transactions.forEach(function(transaction) {
            transaction.institution_name = item.institution_name;
          });
          return data.transactions;
        })
        .catch(function(error) {
          return error;
        });
    } else {
      return client[reqType](item.access_token)
        .then(function(data) {
          data.accounts.forEach(function(account) {
            account.institution_name = item.institution_name;
          });
          return data.accounts;
        })
        .catch(function(error) {
          return error;
        });
    }
  });

  Promise.map(promises, function(asyncResult) {
    return asyncResult;
  })
    .then(function(results) {
      cb(null, results);
    })
    .catch(function(error) {
      cb(error, null);
    });
}; 
