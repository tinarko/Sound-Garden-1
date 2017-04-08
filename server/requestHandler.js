var envvar = require('envvar');
var moment = require('moment');
var plaid = require('plaid');

var config = require('./../config/config');
var db = require('./../database/index');
var config = require('./../config/config');


var PLAID_CLIENT_ID  = config.plaid.clientID;
var PLAID_SECRET     = config.plaid.clientSecret;
var PLAID_PUBLIC_KEY = config.plaid.publicKey;
var PLAID_ENV        = config.plaid.plaidEnv;

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  // TODO: adjust environment as product life cycle advances
  plaid.environments[PLAID_ENV]
);

// exchanges and stores the Item's (institution's) access token
//TODO: error handling
module.exports = {
  'plaid': {
    accessToken: function(req, res) {
      var PUBLIC_TOKEN = req.body.public_token;
      client.exchangePublicToken(PUBLIC_TOKEN, function(err, tokenResponse) {
        if (err) {
          console.log('could not exchange public token', error);
          return res.json({error: 'could not exchange public token'});
        }
        var ACCESS_TOKEN = tokenResponse.access_token;
        var institutionName = req.body.metadata.institution.name;
        var userid = req.session.passport.user;
        // TODO: userid only present after sign in

        // check if the item exists update item, if not, add the item
        db.updatePlaidItem([ACCESS_TOKEN, institutionName, userid], function(err, response) {
          console.log(response);
          if (err) {
            console.log('error updating plaid item');
            return res.json({error: 'error updating plaid item'});
          }
          
          if (response === 0) {
            // plaid item is new so insert
            db.insertPlaidItem([userid, ACCESS_TOKEN, institutionName], function(err, response) {
              if (err) {
                console.log('error inserting plaid item');
                return res.json({error: 'error inserting plaid item'});
              }    
              return res.json({error: false});
            });
          }
          return res.json({error: false});
        });
      });
    },
    accounts: function(req, res) {
      // TODO: must supply access_token
      // userid only present after sign-in
      // console.log(req.session.passport.user.userid)
      
      client.getAuth("access-sandbox-7269eaa2-c476-45f6-ae85-9e6f8e4c0824", function(error, data) {
        if (error) {
          console.log('error in getting account data', error);
          return res.json({error: 'error in getting account data'});
        }
        res.json({
          accounts: data.accounts,
          numbers: data.numbers
        });
      });
    }
  },

  'budget': {
    getUserBudgets: function (req, res) {
      console.log('in request Handler');
      db.getUserBudgets(req.params.id, function(err, results) {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log('results:', results);
          res.status(200).send(results);
        }
      });
    }
  }
};
