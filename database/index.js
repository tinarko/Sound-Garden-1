var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'thesis'
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

  getUserBudgets: function (userid, cb) {
    //need category name and amount from user
    //obtain user id where name = whichever
    var queryString = 'select categorytypes.name, budgetcategories.goalvalue, budgetcategories.actualvalue from categorytypes inner join budgetcategories inner join budgets inner join users on users.id = budgets.user_id AND budgetcategories.budget_id = budgets.id AND budgetcategories.category_id = categorytypes.id AND users.id = ?;';
    connection.query(queryString, userid, function (err, results) {
      if (results.length === 0) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  }

};
