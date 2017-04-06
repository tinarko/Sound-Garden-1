var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect();

module.exports = {
  findUser: function(data, cb) {
    var profile = {
      userid: data.id,
      name: data.name,
      email: data.email,
    };
    console.log('here is the profile', profile);
    var queryString = 'SELECT * FROM USERS where userid = ?';
    connection.query(queryString, profile.userid, function(err, existingUser) {
      console.log('user did not exist, we must add it', existingUser);
      cb(err, existingUser);
    });
  },

  saveUser: function(data, cb) {
    var profile = {
      userid: data.id,
      name: data.name,
      email: data.email,
    };
    console.log('we are trying to insert', profile)
    var queryString = 'INSERT INTO USERS values (?)';
    connection.query(queryString, profile, function(err, newUser) {
      console.log('inserted new user'. newUser);
      cb(err, newUser);
    });
  }

};
