var plaid = require('plaid');
var Promise = require('bluebird');
var db = require('./../../database/index.js');
var plaidUtility = require('./utility/plaidUtility.js');
var PLAID_CLIENT_ID = process.env.PLAID_clientID;
var PLAID_SECRET = process.env.PLAID_clientSecret;
var PLAID_PUBLIC_KEY = process.env.PLAID_publicKey;
var PLAID_ENV = process.env.PLAID_env;

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

module.exports.accessToken = function(req, res) {
  var PUBLIC_TOKEN = req.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(err, tokenResponse) {
    if (err) {
      return res.status(500).send(err);
    }
    var ACCESS_TOKEN = tokenResponse.access_token;
    var institutionName = req.body.metadata.institution.name;
    var userid = req.session.passport.user.id;
    db.updatePlaidItem([ACCESS_TOKEN, institutionName, userid], function(err, response) {
      if (err) {
        return res.status(500).send(error);
      }
      
      if (response === 0) {
        db.insertPlaidItem([userid, ACCESS_TOKEN, institutionName], function(err, response) {
          if (err) {
            return res.status(500).send(error);
          }    
          return res.json({error: false});
        });
      } else {
        return res.json({error: false});
      }
    });
  });
};

module.exports.accounts = function(req, res) {
  var userid = req.session.passport.user.id || '';
  db.getPlaidItems(userid, function(err, response) {
    if (response.length) {
      plaidUtility.promisePlaid(response, 'getAccounts', function(err, results) {
        if (err) {
          res.status(500).send(err);
        }

        var send = results.reduce(function(previous, current) {
          return previous.concat(current);
        }, []);

        send.sort(function(a, b) {
          return a.subtype.localeCompare(b.subtype);
        });
        return res.json(send);
      });
    } else { return res.status(500); }
  });
};

module.exports.transactions = function (req, res) {
  var userid = req.session.passport.user.id;
  if (req.params.destination === 'budget') {
    var periodStart = `${req.params.start}-${req.params.end}-01`;

    var today = new Date ();
    var month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0'.concat(month);
    }
    var year = today.getFullYear().toString();
    var day = today.getDate().toString();
    if (day.length < 2) {
      day = '0'.concat(day);
    }
    if (month === req.params.end && year === req.params.start) {
      var periodEnd = year + '-' + month + '-' + day;
    } else {
      var oldDate = new Date(parseInt(req.params.start), parseInt(req.params.end), 0);
      var oldMonth = (oldDate.getMonth() + 1).toString();
      if (oldMonth.length < 2) {
        oldMonth = '0'.concat(oldMonth);
      }
      var oldYear = oldDate.getFullYear().toString();
      var oldDay = oldDate.getDate().toString();
      if (oldDay.length < 2) {
        oldDay = '0'.concat(oldDay);
      }
      var periodEnd = oldYear + '-' + oldMonth + '-' + oldDay;
    }
  } else {
    periodStart = req.params.start;
    periodEnd = req.params.end;
  }

  db.getPlaidItems(userid, function(err, response) {
    if (response.length) {
      plaidUtility.promisePlaid(response, 'getTransactions', function(err, results) {
        if (err) {
          return res.status(500).send(err);
        }

        if (req.params.destination === 'budget') {
          var transactions = [];
          results.forEach(function(array) {
            for (var i = 0; i < array.length; i++) {
              transactions.push(array[i]);
            }
          });

          var categoryObject = {}; 
          for (var i = 0; i < transactions.length; i++) {
            if (transactions[i]['category']) {
              var categoryName = transactions[i]['category'][0];
              if (transactions[i]['category'].length > 0 && categoryName !== 'Payment' && categoryName !== 'Transfer') {
                categoryObject[categoryName] = categoryObject[categoryName] + transactions[i]['amount'] || transactions[i]['amount'];
              } else {
                categoryObject['Other'] = categoryObject['Other'] + transactions[i]['amount'] || transactions[i]['amount'];
              }
            } else {
              categoryObject['Other'] = categoryObject['Other'] + transactions[i]['amount'] || transactions[i]['amount'];
            }
          }
          return res.json(categoryObject);
        } else {
          var send = results.reduce(function(previous, current) {
            return previous.concat(current);
          }, []).sort(function(a, b) {
            return a.institution_name.localeCompare(b.institution_name);
          });
          return res.json(send);
        }
      }, periodStart, periodEnd);
    } else { return res.status(500); }
  });
};