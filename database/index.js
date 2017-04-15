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
      data._json.name, 
      data._json.email
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

  getUserBudgets: function (params, cb) {
    var queryString = 
    'select categorytypes.name, budgetcategories.goalvalue, budgetcategories.actualvalue \
    from categorytypes inner join budgetcategories inner join budgets inner join users \
    on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id \
    AND budgetcategories.category_id = categorytypes.id AND users.userid = ? \
    AND YEAR(budgets.month) = ? AND MONTH(budgets.month) = ?;';

    connection.query(queryString, params, function (err, results) {
      if (results.length === 0) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  checkIfMonthBudgetExists: function (params, cb) {
    var queryString = 'select * from budgets where user_id = ? and YEAR(month) = ? AND MONTH(month) = ?;';

    connection.query(queryString, params, function (err, results) {
      if (err) {
        cb(err, null); 
      } else {
        cb(null, results);
      }
    });

  },

  insertUserMonthBudget: function (params, cb) {
    var timestamp = params[1] + '-' + params[2] + '-01 12:00:00';
    var queryString = 'insert into budgets (user_id, month) values (?, ?);';
    connection.query(queryString, [params[0], timestamp], function(err, results) {
      if (err) {
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
      WHERE users.userid = ? order by ccid, categoryname;';

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
    });
  },

  createCashbackCategory: function(ccid, name, percent, cb) {
    var query = 'INSERT INTO cccategories (categoryname, value, ccid) VALUES (?, ?, ?)';

    var params = [name, percent, ccid];

    connection.query(query, params, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  deleteCashbackCategory: function(catid, cb) {
    var query = 'delete from cccategories where id = ?';

    connection.query(query, catid, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  updateUserBudgetCategory: function(params, cb) {
    var queryString = 'update categorytypes inner join budgetcategories inner join budgets inner join users \
    on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id \
    SET budgetcategories.goalvalue = ? WHERE users.userid = ? AND categorytypes.name = ? AND YEAR(budgets.month) = ? AND MONTH(budgets.month) = ?';
    connection.query(queryString, params, function(err, results, field) {
      if (err) {
        console.log('errored in index.js in db');
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },


  insertBudgetCategory: function(params, cb) {
    var queryString = 'insert into categorytypes (name) values (?)';
    connection.query(queryString, params[0], function(err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

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

  insertDefaultCategories: function (cb) {
    var defaultCategories = ['Food and Drink', 'Travel', 'Groceries', 'Entertainment', 'Other'];
    var queryString = 'insert into categorytypes (name) values (?), (?), (?), (?), (?)';

    connection.query(queryString, defaultCategories, function(err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  insertDefaultUserBudgets: function (budgetid, cb) {
    var queryString = 'insert into budgetcategories (budget_id, category_id, goalvalue) values (?, 1, 100), (?, 2, 100), (?, 3, 100), (?, 4, 100), (?, 5, 100)';

    connection.query(queryString, [budgetid, budgetid, budgetid, budgetid, budgetid], function(err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  insertUserBudget: function(params, cb) {
    console.log('params', params);
    var categoryid = params[2];
    var updatedvalue = params[0];
    var userid = params[1];
    var yearString = params[3];
    var monthString = params[4];

    console.log('insertUserBudget params:', categoryid, updatedvalue, userid, yearString, monthString);
    
    var queryString = 
    'insert into budgetcategories (budget_id, category_id, goalvalue) \
    select budgets.id, ?, ? from categorytypes inner join budgetcategories inner join budgets inner join users \
    on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id \
    AND budgetcategories.category_id = categorytypes.id \
    where users.userid = ? and YEAR(budgets.month) = ? AND MONTH(budgets.month) = ? limit 1;';

    connection.query (queryString, [categoryid, updatedvalue, userid, yearString, monthString], function(err, results) {
      if (err, null) {
        cb(err, null);
      } else {
        console.log(results);
        cb (null, results);
      }
    });
      
  }

};
