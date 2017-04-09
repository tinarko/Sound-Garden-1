var envvar = require('envvar');
var moment = require('moment');
var plaid = require('plaid');
var Promise = require('bluebird');

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

//TODO: error handling
module.exports = {
  'plaid': {
    accessToken: function(req, res) {
      var PUBLIC_TOKEN = req.body.public_token;
      // exchange public token for access token through plaid client
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
          // TODO: -------------------- never adds more than one row in current state
          // TODO: refine to update based off of account id
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
          } else {
            return res.json({error: false});
          }
        });
      });
    },
    accounts: function(req, res) {
      // TODO: must supply access_token
      // Query database to retrieve all Plaid items associated with userid
        // iterate through access tokens and retrieve data through Plaid client
        // add data to object and send response
      var userid = req.session.passport.user;
      var promises = [];
      var accountData = {};
      // store names Items (for names) in plaidInstitutions
      var plaidInstitutions = [];
      db.getPlaidItems(userid, function(err, response) {
        // note: specific information per account received after access_token is used
        plaidInstitutions = response;
        for (var i = 0; i < response.length; i++) {
          promises.push(client.getAccounts(response[i].access_token)
            .then(function(data) {
              // IMPORTANT: data contains accounts and item (bank) information
              // TODO: only need accounts information for now.
              return data.accounts;
            })
            .catch(function(error) {
              return error;
              // return res.json({error: 'error in getting account data from plaid client'});
            })
          );
        }
        Promise.all(promises)
          .then(function(results) {
            for (var j = 0; j < plaidInstitutions.length; j++) {
              accountData[plaidInstitutions[j].institution_name] = results[j];
            }
            return res.json(accountData);
          })
          .catch(function(error) {
            return res.json({error: 'error in getting account data from plaid clients'});
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
