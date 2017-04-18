var db = require ('./index.js');

var connection = db.connection;

exports.getUserCreditcards = (userid, cb) => {

  var query = `SELECT ccid, cccategories.id as catid, ccname, categoryname, value FROM users \
    JOIN creditcards ON creditcards.userid = users.userid \
    JOIN cccategories ON creditcards.id = cccategories.ccid \ 
    WHERE users.userid = "${userid}" order by ccid, categoryname;`;

  connection.query(query, (err, results) => {
    if (results.length === 0) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

exports.checkCreditcard = function(userid, ccname, cb) {
  console.log('userid', userid, 'ccname', ccname);
  var query = `select * from creditcards where userid = "${userid}" and ccname like "${ccname}";`;
  connection.query (query, (err, results) => {
    if (err, null) {
      cb(err, null);
    } else {
      console.log('check if credit card exists results', results);
      cb (null, results);
    }
  });
};

exports.createCreditcard = function(userid, ccname, cb) {
  console.log('getting ready to add creditcards');
  var query = `insert into creditcards (userid, ccname) values ("${userid}", "${ccname}");`;
  // insert into creditcards (userid, ccname) values ("facebook|10211056100732598", "Bank of America - Plaid Diamond 12.5% APR Interest Credit Card");
  // var params = [userid, ccname];
  console.log('TIME TO INSERT!');
  connection.query (query, (err, results) => {
    if (err, null) {
      cb(err, null);
    } else {
      console.log('results at db', results);
      var ccid = results.insertId;
      console.log('ccid', ccid);
      var cashbackquery = `INSERT INTO cccategories (categoryname, value, ccid) VALUES ('groceries', 3, ${ccid});`;
      connection.query(cashbackquery, (err, results) => {
        if (err, null) {
          cb(err, null);
        } else {
          var catid = results.insertId;
          console.log('results', results);
          var data = {
            catid: catid,
            ccid: ccid
          };
          cb (null, data);
        }
      });
    }
  });
};