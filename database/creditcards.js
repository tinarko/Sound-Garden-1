var db = require ('./index.js');

var connection = db.connection;

exports.getCreditcards = (userid, cb) => {

  var query = `SELECT * from creditcards where userid = "${userid}";` ;

  connection.query(query, (err, results) => {
    cb(err, results);
  });
};

exports.checkCreditcard = (userid, ccname, cb) => {

  var query = `select * from creditcards where userid = "${userid}" and ccname like "${ccname}";`;

  connection.query (query, (err, results) => {
    cb(err, results);
  });
};

exports.createCreditcard = (userid, ccname, cb) => {

  var query = `insert into creditcards (userid, ccname) values ("${userid}", "${ccname}");`;

  connection.query (query, (err, results) => {
    cb(err, results);
  });
};