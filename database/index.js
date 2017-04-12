var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'heroku_aa9603bdcb7e15e'
});

connection.connect();

module.exports = {
  findUser: function(userid, cb) {
    console.log('here is the profile', userid);
    var queryString = 'SELECT * FROM USERS where userid = ?';
    connection.query(queryString, userid, function(err, existingUser) {
      if (existingUser.length === 0) {
        cb(err, false);
      } else {
        cb(err, existingUser[0]);
      }
    });
  },

  saveUser: function(data, cb) {
    var profile = [
      data.id, 
      data.name, 
      data.email
    ];
    var query = 'insert into users(userid, name, email) value(?, ?, ?)';
    connection.query(query, profile, function(err, results, field) {
      console.log('inserted new user');
      cb(err, results);
    });
  },

  updatePlaidItem: function(params, cb) {
    // update if the institution name already exists
    // refine to update off of account data
    var query = 'UPDATE items SET access_token = ?, institution_name = ? where user_id = ? AND institution_name = ?';
    connection.query(query, [params[0], params[1], params[2], params[1]], function(err, results, field) {
      console.log('updated plaid item', results);
      cb(err, results.affectedRows);
    });
  },
  
  insertPlaidItem: function(params, cb) {
    var query = 'insert into items (user_id, access_token, institution_name) values (?, ?, ?)';
    connection.query(query, params, function(err, results, field) { 
      console.log('inserted new plaid item', results);
      cb(err, results);
    });
  },

  getPlaidItems: function(userid, cb) {
    var query = 'select * from items, users where users.userid = ?';
    connection.query(query, userid, function(err, results, field) {
      cb(err, results);
    });
  },

  getUserBudgets: function (userid, cb) {
    var queryString = 
    'select categorytypes.name, budgetcategories.goalvalue, budgetcategories.actualvalue from categorytypes inner join budgetcategories inner join budgets inner join users on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id AND users.userid = ? AND MONTH(budgets.month) = MONTH(CURRENT_DATE());';

    connection.query(queryString, userid, function (err, results) {
      if (results.length === 0) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  getUserCreditcards: (userid, cb) => {
    var query = 'select * from creditcards where userid = ?';
    connection.query(query, userid, (err, results) => {
      if (results.length === 0) {
        // TO DO: create empty initiated values
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  
  updateUserBudgetCategory: function(goalvalue, userid, categoryname, cb) {
    var queryString = 'update categorytypes inner join budgetcategories inner join budgets inner join users on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id SET budgetcategories.goalvalue = ? WHERE users.userid = ? AND categorytypes.name = ?;';
    connection.query (queryString, [goalvalue, userid, categoryname], function(err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  }



};
