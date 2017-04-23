const dotenv = require('dotenv');
const path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require ('chai-http');
var Promise = require('bluebird');
const app = require('../server/app');
const mysql = require('mysql');
var database = 'heroku_aa9603bdcb7e15e';
var createTables = require('../database/config.js');

chai.use(chaiHttp);

describe ('', function () {

  var db;
  var server;

  beforeEach( () => {
    let connection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'heroku_aa9603bdcb7e15e'
    });

    db = Promise.promisifyAll(connection, {multiArgs: true });

    db.connectAsync().then(() => {
      console.log('Connected to ' + database + 'database as ID' + db.threadID);
      return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
    })
    .then(() => {
      return db.queryAsync('USE ' + database);
    })
    .then (() => {
      return createTables(db);
    });
  });

  describe('Database Tests', () => {

    it('should have a users table', (done) => {
      var queryString = 'select * from users;';
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