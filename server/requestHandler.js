var envvar = require('envvar');
var moment = require('moment');
var plaid = require('plaid');
var Promise = require('bluebird');

var db = require('./../database/index');

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
        var accountTypes = {};
        Promise.all(promises)
          .then(function(results) {
            for (var j = 0; j < plaidInstitutions.length; j++) {
              accountData[plaidInstitutions[j].institution_name] = results[j];
            }
            // categorize the account data for the client
            for (var item in accountData) {
              accountTypes[item] = {};
              // initializes the object
              for (let i = 0; i < accountData[item].length; i++) {
                // iterate through each account
                var accountSubtype = accountData[item][i].subtype;
                // if the account type is NOT present, initialize the array
                if (!accountTypes[item][accountSubtype]) {
                  accountTypes[item][accountSubtype] = [{
                    account: accountData[item][i],
                  }];
                } else {
                  accountTypes[item][accountSubtype].push({
                    account: accountData[item][i],
                  });
                }
              }
            }
            return res.json(accountTypes);
          })
          .catch(function(error) {
            return res.json({error: 'error in getting account data from plaid clients'});
          });
      });
    },
    transactions: function (req, res) {
      //TODO: account for modularity for calendar time
      var userid = req.session.passport.user;
      var periodStart = `${req.params.year}-${req.params.month}-01`;

      var today = new Date ();
      var month = (today.getMonth() + 1).toString();
      if (month.length < 2) {
        month = '0'.concat(month);
      }
      var year = today.getFullYear().toString();

      var day = today.getDate().toString();

      var periodEnd = year + '-' + month + '-' + day;

      var promises = [];
      var transactionData = {};
      var plaidInstitutions = [];
      db.getPlaidItems(userid, function(err, response) {
        plaidInstitutions = response;
        for (var i = 0; i < response.length; i++) {
          
          // promises.push(client.getTransactions(response[i].access_token, periodStart, periodEnd)
          promises.push(client.getTransactions(response[i].access_token, '2017-03-10', '2017-04-10')
            .then(function(data) {
              return data.transactions;

            })
            .catch(function(error) {
              return error;
            })
          );
        }
        Promise.all(promises)
        .then(function(results) {
          var transactions = [];
          results.forEach(function(array) {
            for (var i = 0; i < array.length; i++) {
              transactions.push(array[i]);
            }
          });
          //TODO: refactor to dynamically add categories, instead of hardcoded ones
          var categoryObject = {
            'Restaurants': 0,
            'Fast Food': 0,
            'Coffee Shop': 0,
            'Groceries': 0,
            'Entertainment': 0,
            'Travel': 0,
            // 'Food and Drink': 0,
            'Other': 0
          };
            
          for (var i = 0; i < transactions.length; i++) {
            if (transactions[i]['category']) {
              for (var j = 0; j < transactions[i]['category'].length; j++) {
                var categoryName = transactions[i]['category'][j];
                if (categoryName in categoryObject) {
                  categoryObject[categoryName] = categoryObject[categoryName] + transactions[i]['amount'];
                } else if (categoryName === 'Transfer' || categoryName === 'Deposit' ) {
                  continue;
                } else {
                  categoryObject['Other'] = categoryObject['Other'] + transactions[i]['amount'];
                }
              }
            } else {
              categoryObject['Other'] = categoryObject['Other'] + transactions[i]['amount'];
            }
          }
          
          return res.json(categoryObject);
        })
        .catch(function(error) {
          return res.json({error: 'error in getting transaction data from plaid clients'});
        });
      });
    }
  },

  'budget': {
    getUserBudgets: function (req, res) {
      var userid = req.session.passport.user;
      db.getUserBudgets(userid, function(err, results) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    updateBudgetAmount: function(req, res) {
      var userid = req.session.passport.user;
      var updatedvalue;
      if (req.body.change === 'increment') {
        updatedvalue = req.body.goalvalue + 10;
      } else if (req.body.change === 'decrement') {
        updatedvalue = req.body.goalvalue - 10;
      }
      db.updateUserBudgetCategory([updatedvalue, userid, req.body.categoryname], function(err, results) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    }
  },

  'creditcards': {
    getUserCreditcards: (req, res) => {
      var userid = 2;
      // var userid;
      // if (req.session.passport) {
      //   userid = req.session.passport.user;
        
      // } else {
      //   userid = 2;
      // }
      db.getUserCreditcards(userid, (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    changeCashbackPercent: (req, res) => {
      var catid = req.body.catid;
      var percent = req.body.percent;
      var action = req.body.action;

      db.changeCashbackCategories(catid, percent, action, (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
    // getCashbackCategories: (req, res) => {
    //   var ccid = req.params.ccid;
    //   db.getCashbackCategories(ccid, (err, results) => {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       res.status(200).send(results);
    //     }
    //   });
    // }
  }
};
