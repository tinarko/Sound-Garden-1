var mysql = require('mysql');
var db = require ('./index.js');

var connection = db.connection;

exports.getAllUserCategories = (userid, cb) => {
  var query = `SELECT ccid, cccategories.id as catid, ccname, categoryname, value FROM users \
      JOIN creditcards ON creditcards.userid = users.userid \
      JOIN cccategories ON creditcards.id = cccategories.ccid \
      WHERE users.userid = "${userid}" order by ccid, categoryname;`;

  connection.query(query, (err, results) => {
    cb(err, results);
  });
};

exports.getCashbackCategories = (ccid, cb) => {
  var query = `select * from cccategories where ccid = ${ccid}`;

  connection.query(query, (err, results) => {
    cb(err, results);
  });
};

exports.changeCashbackCategories = (catid, percent, action, cb) => {
  var updatedPercent;
  if (action === 'increment') {
    updatedPercent = percent + 0.5;
  } else {
    updatedPercent = percent - 0.5;
  }
  var params = [updatedPercent, catid];
  var query = 'update cccategories set value = ? where id = ?';

  connection.query(query, params, (err, results) => {
    cb(err, results);
  });
};

exports.createCashbackCategory = function(ccid, name, percent, cb) {
  var query = 'INSERT INTO cccategories (categoryname, value, ccid) VALUES (?, ?, ?)';

  var params = [name, percent, ccid];

  connection.query(query, params, (err, results) => {
    cb(err, results);
  });
};

exports.deleteCashbackCategory = function(catid, cb) {
  var query = 'delete from cccategories where id = ?';

  connection.query(query, catid, (err, results) => {
    cb(err, results);
  });
};