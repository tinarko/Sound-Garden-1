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
            return res.json(accountTypes);
          })
          .catch(function(error) {
            return res.json({error: 'error in getting account data from plaid clients'});
          });
      });
    },
    allTransactions: function(req, res) {
      var userid = req.session.passport.user;
      var endDate = req.body.endDate;
      var startDate = req.body.startDate;
      var promises = [];
      db.getPlaidItems(userid, function(err, response) {
        // TODO: need to use LET declaration to maintain block scope
        for (let i = 0; i < response.length; i++) {
          promises.push(client.getTransactions(response[i].access_token, startDate, endDate)
            .then(function(data) {
              data.transactions.forEach(function(value) {
                value.institution_name = response[i].institution_name;
              });
              console.log(data.transactions.length);
              return data.transactions;

            })
            .catch(function(error) {
              return error;
            })
          );
        }
        Promise.all(promises)
          .then(function(data) {
            var result = []
            data.forEach(function(transactions) {
              result = result.concat(transactions);
            });
            console.log(result.length);
            return res.json(result);
          })
          .catch(function(error) {
            return res.json({error: error});
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
      if (day.length < 2) {
        day = '0'.concat(day);
      }
      if (month === req.params.month && year === req.params.year) {
        var periodEnd = year + '-' + month + '-' + day;
      } else {
        var oldDate = new Date(parseInt(req.params.year), parseInt(req.params.month), 0);
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

      var promises = [];
      var transactionData = {};
      var plaidInstitutions = [];
      db.getPlaidItems(userid, function(err, response) {
        plaidInstitutions = response;
        for (var i = 0; i < response.length; i++) {
          
          promises.push(client.getTransactions(response[i].access_token, periodStart, periodEnd)
          // promises.push(client.getTransactions(response[i].access_token, '2017-03-10', '2017-04-10')
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

          //refactored to dynamically add categories
          var categoryObject = {}; 
          for (var i = 0; i < transactions.length; i++) {
            if (transactions[i]['category']) {
              var categoryName = transactions[i]['category'][0];
              if (transactions[i]['category'].length > 0 && categoryName !== 'Payment') {
                categoryObject[categoryName] = categoryObject[categoryName] + transactions[i]['amount'] || transactions[i]['amount'];
              } else {
                categoryObject['Other'] = categoryObject['Other'] + transactions[i]['amount'] || transactions[i]['amount'];
              }
            } else {
              categoryObject['Other'] = categoryObject['Other'] + transactions[i]['amount'] || transactions[i]['amount'];
            }
          }
          return res.json(categoryObject);
          // return res.json(transactions);
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
      //check if (current) month budget exists for signed in user
      db.checkIfMonthBudgetExists ([userid, req.params.year, req.params.month], function(err, results) {
        if (err) {
          res.status(500).send(err);
        } else if (results.length === 0 ) {
          //after knowing budget does not exist for current month, insert new budget table for said month
          db.insertUserMonthBudget([userid, req.params.year, req.params.month], function(err, results) {
            if (err) {
              res.status(500).send(err);
            } else {
              // //check previous month for budget categories and pre populated current month budget
              // var today = new Date ();
              // //set to last month
              // today.setMonth(today.getMonth() - 1);
              // console.log('today', today);
              // var month = (today.getMonth() + 1).toString();
              // if (month.length < 2) {
              //   month = '0'.concat(month);
              // }
              // var year = today.getFullYear().toString();

              // db.checkIfMonthBudgetExists ([user.id, year, month], function (err, results) {
              //   if (err) {
              //     res.status(500).send(err);
              //   } else if (results) {
              //     console.log('results');
              //     //continue here
              //   }
              // });
      
              //insert default categories into newly made budget if deffault does not exist
              var budgetId = results.insertId;
              db.checkForCategoryName ('Restaurants', function(err, results) {
                if (err) {
                  res.status(500).send(err);
                } else if (!results) {
                  db.insertDefaultCategories (function(err, results) {
                    if (err) {
                      res.status(500).send(err);
                    } else {
                      // res.status(200).send(results);
                      db.insertDefaultUserBudgets (budgetId, function(err, results) {
                        if (err) {
                          res.status(500).send(err);
                        } else {
                          // res.status(200).send(results);
                          db.getUserBudgets([userid, req.params.year, req.params.month], function(err, finalResults) {
                            if (err) {
                              res.status(500).send(err);
                            } else {
                              res.status(200).send(finalResults);
                            }
                          });
                        }
                      });
                    }
                  });
                } else {
                  db.insertDefaultUserBudgets (budgetId, function(err, results) {
                    if (err) {
                      res.status(500).send(err);
                    } else {
                      db.getUserBudgets([userid, req.params.year, req.params.month], function(err, finalResults) {
                        if (err) {
                          res.status(500).send(err);
                        } else {
                          res.status(200).send(finalResults);
                        }
                      });
                      // res.status(200).send(results);
                    }
                  });
                }
              });
              // res.status(200).send(results);
            }
          });

        } else {
          console.log('getting user budgets');
          db.getUserBudgets([userid, req.params.year, req.params.month], function(err, results) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send(results);
            }
          });
        }
      });
    },
    updateBudgetAmount: function(req, res) {
      var userid = req.session.passport.user;

      var monthString;
      if (req.body.month < 10) {
        monthString = '0'.concat(req.body.month);
      } else {
        monthString = req.body.month.toString();
      }
      var yearString = req.body.year.toString();
      console.log('req.body', req.body);

      var updatedvalue;
      if (req.body.change === 'increment') {
        updatedvalue = req.body.goalvalue + 10;
      } else if (req.body.change === 'decrement') {
        updatedvalue = req.body.goalvalue - 10;
      } else {
        updatedvalue = parseFloat(req.body.goalvalue);
      }
      //check to see if budget category exists for user
      db.updateUserBudgetCategory([updatedvalue, userid, req.body.categoryname, yearString, monthString], function(err, results) {
        if (err) {
          res.status(500).send(err);
        //if does not exist
        } else if (results.affectedRows === 0) {
          //check if budget category name exists in database
          db.checkForCategoryName (req.body.categoryname, function(err, results) {
            if (err) {
              res.status(500).send(err);
            } else if (results) {
              //if exists, use this budget category name to create a budget listing for user
              db.insertUserBudget([updatedvalue, userid, results.id, yearString, monthString], function(err, finalResults) {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(201).send(finalResults);
                }
              });
            } else {
              //if it does not exist, insert a budget category name and use this newly inserted category name to create budget listing for user
              db.insertBudgetCategory ([req.body.categoryname], function(err, results) {
                if (err) {
                  res.status(500).send(err);
                } else {
                  db.insertUserBudget([updatedvalue, userid, results.insertId, yearString, monthString], function(err, finalResults) {
                    if (err) {
                      res.status(500).send(err);
                    } else {
                      res.status(201).send(finalResults);
                    }
                  });
                }
              });
            }
          });
        } else {
          res.status(201).send(results);
        }
      });
    },
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
    createCashbackCategory: (req, res) => {
      var ccid = req.body.ccid;
      var name = req.body.name;
      var percent = req.body.percent;

      db.createCashbackCategory(ccid, name, percent, (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log('results.insertId at reqHandler', results.insertId);
          res.status(200).json(results.insertId);
        }
      });
    },
    deleteCashbackCategory: (req, res) => {
      var catid = req.params.catid;
      db.deleteCashbackCategory(catid, (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(results);
        }
      });
    }
  }
};
