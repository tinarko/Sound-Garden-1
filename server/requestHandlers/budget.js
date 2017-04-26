var db = require('./../../database/index.js');

module.exports.getUserBudgets = function (req, res) {
  if (req.session.passport) {
    var userid = req.session.passport.user.id;
  } else {
    var userid = req.body.userid;
  }
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
          //insert default categories into newly made budget if default does not exist
          var budgetId = results.insertId;
          db.checkForCategoryName ('Food and Drink', function(err, results) {
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
                }
              });
            }
          });
        }
      });

    } else {
      db.getUserBudgets([userid, req.params.year, req.params.month], function(err, results) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    }
  });
};

module.exports.updateBudgetAmount = function(req, res) {
  if (req.session.passport) {
    var userid = req.session.passport.user.id;
  } else {
    var userid = req.body.userid;
  }
  var monthString;
  if (req.body.month < 10) {
    monthString = '0'.concat(req.body.month);
  } else {
    monthString = req.body.month.toString();
  }
  var yearString = req.body.year.toString();

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
};