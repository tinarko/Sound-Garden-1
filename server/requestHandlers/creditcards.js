var Promise = require('bluebird');
var cc = require('./../../database/creditcards.js');
var db = require('./../../database/index.js');
var utilityPlaid = require('./utility/plaidUtility.js');

exports.getAll = (req, res) => {

  if (req.session.passport) {
    var userid = req.session.passport.user.id;
  } else {
    var userid = req.body.userid;
  }

  cc.getCreditcards(userid, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      var data = [];
      results = results || [];
      
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

exports.create = function(req, res) {

  if (req.session.passport) {
    var userid = req.session.passport.user.id;
  } else {
    var userid = req.body.userid;
  }

  db.getPlaidItems(userid, function(err, response) {
    if (response.length) {
      utilityPlaid.promisePlaid(response, 'getAccounts', function(err, results) {
        results = results.reduce(function(previous, current) {
          return previous.concat(current);
        }, []);

        results.forEach(function(value) {
          if (value.subtype === 'credit') {
            var creditcard = value.institution_name + ' - ' + value.official_name;
            cc.checkCreditcard(userid, creditcard, function(err, checkResults) {
              if (err) { return res.status(500).send(err); }
              if (checkResults.length === 0) {
                cc.createCreditcard(userid, creditcard, function(err, createResults) {
                  if (err) { return res.status(500).send(err); }
                });
              }
            });
          }
        });

        res.sendStatus(200);
      });
    } else { return res.status(500); }
  });
};
