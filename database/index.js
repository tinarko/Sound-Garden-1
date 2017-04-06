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
      console.log('user did not exist, we must add it', existingUser);
      cb(err, false);
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
  }

};
