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
    var query = 'SELECT ccid, cccategories.id as catid, ccname, categoryname, value FROM users \
      JOIN creditcards ON creditcards.userid = users.userid \
      JOIN cccategories ON creditcards.id = cccategories.ccid \
      WHERE users.userid = ?;';

    connection.query(query, userid, (err, results) => {
      if (results.length === 0) {
        // TO DO: create empty initiated values
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  changeCashbackCategories: (catid, percent, action, cb) => {
    var updatedPercent;
    if (action === 'increment') {
      updatedPercent = percent + 0.5;
    } else {
      updatedPercent = percent - 0.5;
    }
    var params = [updatedPercent, catid];
    var query = 'update cccategories set value = ? where id = ?';

    connection.query(query, params, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    })
  },

  createCashbackCategory: function(ccid, name, percent, cb) {
    var query = 'INSERT INTO cccategories (categoryname, value, ccid) VALUES (?, ?, ?)';
    if (!name){
      var params = ['test', 100, 2];
    } else {
      var params = [name, percent, ccid];
      
    }

    connection.query(query, params, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        console.log(results);
        cb(null, results);
      }
    })
  },

  updateUserBudgetCategory: function(params, cb) {
    var queryString = 'update categorytypes inner join budgetcategories inner join budgets inner join users on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id SET budgetcategories.goalvalue = ? WHERE users.userid = ? AND categorytypes.name = ?;';
    connection.query(queryString, [params[0], params[1], params[2]], function(err, results, field) {
      if (err) {
        console.log('errored in index.js in db');
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
<<<<<<< HEAD
=======

  insertBudgetCategory: function(params, cb) {
    var queryString = 'insert into categorytypes (name) values (?)';
    connection.query(queryString, params[2], function(err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  // getCategoryID: function (categoryname, cb) {
  //   var queryString = 'select id from categorytypes where name = ?';
  //   connection.query (queryString, categoryname, function(err, results) {
  //     if (err, null) {
  //       cb(err, null);
  //     } else {
  //       console.log(results[0]);
  //       cb (null, results[0]);
  //     }
  //   });
  // },

  checkForCategoryName: function (categoryname, cb) {
    var queryString = 'select * from categorytypes where name = ?';
    connection.query (queryString, categoryname, function (err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        cb(null, results[0]);
      }
    });
  },

  insertUserBudget: function(params, cb) {
    var categoryid = params[2];
    var updatedvalue = params[0];
    var userid = params[1];

    console.log('insertUserBudget params:', categoryid, updatedvalue, userid);
    var queryString = 'insert into budgetcategories (budget_id, category_id, goalvalue) select budgets.id, ?, ? from categorytypes inner join budgetcategories inner join budgets inner join users on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id where Month(budgets.month) = MONTH(CURRENT_DATE()) and users.userid = ? limit 1;';
    connection.query (queryString, [categoryid, updatedvalue, userid], function(err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        console.log(results);
        cb (null, results);
      }
    });
      // 'insert into budgetcategories (budget_id, category_id, goalvalue) select budgets.id, $categoryid, $goalvalue from categorytypes inner join budgetcategories inner join budgets inner join users on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id where Month(budgets.month) = MONTH(CURRENT_DATE()) and users.userid = ?';

      // 'insert into budgetcategories (budget_id, category_id, goalvalue) select budgets.id, categorytypes.id, 159.00 from categorytypes inner join budgetcategories inner join budgets inner join users on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id where Month(budgets.month) = MONTH(CURRENT_DATE()) and users.userid = ? AND categorytypes.name = ?;';

      // 'insert into budgetcategories (budget_id, category_id, goalvalue)\
      // select budgets.id, categorytypes.id, 159.00 \
      // from categorytypes inner join budgetcategories inner join budgets inner join users \
      // on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id where Month(budgets.month) = MONTH(CURRENT_DATE()) and users.userid = ? AND categorytypes.name = ?;';
  }
>>>>>>> (feat) Implement Database Insertion on Category Add: Need to Render Dynamically

};
