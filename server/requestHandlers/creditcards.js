var Promise = require('bluebird');

var cc = require('./../../database/creditcards');
var db = require('./../../database/index');

var plaid = require('plaid');

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


exports.getCreditcards = (req, res) => {

  var userid;
  if (req.session.passport) {
    userid = req.session.passport.user.id;    
  } else {
    userid = "facebook|10211056100732598";
    console.log('YOU ARE NOT LOGGED IN');
  }
  cc.getCreditcards(userid, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      var data = [];
      console.log('RESULTS', results);
      for (var i = 0; i < results.length; i++) {
        data.push({
          ccid: results[i].id,
          ccname: results[i].ccname,
          categories: []
        });
      }
      res.status(200).send(data);
    }
  });
};

exports.createCreditCards = function(req, res) {

  var userid;
  if (req.session.passport) {
    userid = req.session.passport.user.id;
    console.log('you are logged in with userid:', userid);
  } else {
    userid = "facebook|10211056100732598";
    console.log('YOU ARE NOT LOGGED IN');
  }

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
        console.log(results);
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

        var banks = accountTypes;
        var creditcards = [];
        for (bank in banks) {
          for (var i = 0; i < banks[bank].credit.length; i++) {
            creditcards.push(bank + ' - ' + banks[bank].credit[i].account.official_name);
          }
        }

        // console.log('creditcards *********', creditcards);

        // insert creditcards into creditcard table
        
        

        // CONVERT INTO PROMISES OR STRUGGLE WITH ASYNC MAT... 

        // return

        Promise.map(creditcards, (creditcard) => {
          return cc.checkCreditcard(userid, creditcard, (err, results) => {
            if (err) {
              return err; // THROW!!!!*****
            } else {
              // credit card does not exist
              if (results.length === 0) {
                cc.createCreditcard(userid, creditcard, (err, results) => {
                  if (err) {
                    return err; // THROW!!
                  } else {
                  }
                });
              }
            };
          }
        )
      })
      .then(results => {
        res.sendStatus(200);
      })
      .catch(function(error) {
        // res.status
        return res.json({error: 'error in getting account data from plaid clients'});
      });
    })

  });
};
