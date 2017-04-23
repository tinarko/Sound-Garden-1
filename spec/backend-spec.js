const dotenv = require('dotenv');
const path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require ('chai-http');
const app = require('../server/app');
const mysql = require('mysql');

var schema = require('../database/config.js');

chai.use(chaiHttp);

describe ('', function () {

  var db;
  var server;
  // let port = process.env.PORT || 1337;

  var insertDB = (connection, tablenames, done) => {
    var count = 0;
    // return schema(db).then(done);
    tablenames.forEach(function(tablename) {
      connection.query('CREATE TABLE IF NOT EXISTS ' + tablename, () => {
        count++;
        if (count === tablename.length) {
          return schema(db).then(done);
        }
      });
    });
  };

  beforeEach( () => {
    db = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'heroku_aa9603bdcb7e15e'
    });

    var tables = ['users', 'budgets', 'categorytypes', 'budgetcategories', 'items', 'creditcards', 'cccategories', 'friends'];
    db.connect( (err) => {
      if (err) { return done(err); }
      insertDB(db, tables, () => {
        server = app.listen(port, done);
      });
    });

    // afterEach(() => { server.close(); });
  
  });

  describe('Database Tests', () => {

    it('should have a users table', (done) => {
      var queryString = 'select * from users;';
      // var queryString = 'insert into users (userid, name, email) value(?, ?, ?)';
      db.query(queryString, (err, results) => {
        if (err) {
          return done(err); 
        }
        console.log('results', results);
        expect(results).to.exist;
        done();

      });
    });
  });

  describe('Server Tests', () => {

    it('should return status of 404 if route is unknown', () => {
      chai.request(app)
      .get('/errorroute')
      .end((err, res) => {
        console.log('res.status', res.status);
        expect(res.status).to.equal(404);
      });
    });
  });

});