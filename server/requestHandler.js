var envvar = require('envvar');
var moment = require('moment');
var plaid = require('plaid');

var config = require('./../config/config');
var db = require('./../database/index');
var config = require('./../config/config');

var PLAID_CLIENT_ID  = config.plaid.clientID;
var PLAID_SECRET     = config.plaid.clientSecret;
var PLAID_PUBLIC_KEY = config.plaid.publicKey;
// TODO: adjust environment as product life cycle advances
var PLAID_ENV        = config.plaid.plaidEnv;

// TODO: store ACCESS_TOKEN INTO DATABASE
var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  // TODO: adjust environment as product life cycle advances
  plaid.environments[PLAID_ENV]
);

// exchanges and stores the Item's (institution's) access token
module.exports = {
  'plaid': {
    accessToken: function(req, res) {
      PUBLIC_TOKEN = req.body.public_token;
      client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
        if (error) {
          console.log('could not exchange public token', error);
          return res.json({error: 'could not exchange public token'});
        }
        ACCESS_TOKEN = tokenResponse.access_token;
        console.log('Access Token: ' + ACCESS_TOKEN);
        res.json({error: false});
      });
    }
  },

  'budget': {
    getUserBudgets: function (req, res) {
      db.getUserBudgets(req.params.id, function(err, results) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    }
  }
};
