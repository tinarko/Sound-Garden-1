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
var createTables = require('../database/config.js');
chai.use(chaiHttp);

describe ('', function () {

  var db;
  var server;
  var port = process.env.PORT || 1337;

  beforeEach( () => {
    var database = 'heroku_aa9603bdcb7e15e';
    let connection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'heroku_aa9603bdcb7e15e'
    });

    db = Promise.promisifyAll(connection, {multiArgs: true });

    db.connectAsync().then(() => {
      console.log('Connected to ' + database);
      return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database + ';');
    })
    .then(() => {
      console.log('database', database);
      return db.queryAsync('USE ' + database);
    })
    .then (() => {
      return createTables(db);
    })
    .error ((err) => {
      //TODO: Handle rejection
      // console.log(err);
    });
    // server = app.listen(port, () => {
    //   console.log('listening on port ' + port + '!');
    // });
  });

  describe('Database Tests', () => {

    // it('should have a users table', (done) => {
    //   var queryString = 'select * from users;';
    //   db.query(queryString, (err, results) => {
    //     if (err) {
    //       return done(err); 
    //     }
    //     console.log('results', results);
    //     expect(results).to.exist;
    //     done();

    //   });
    // });
  });

  describe('Server Tests', () => {

    it('should return status 200 for authentication routes', () => {
      chai.request(app)
        .get('/auth/user')
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
    });

    it('should return status 200 for plaid routes', () => {
      chai.request(app)
        .get('/plaid/accounts')
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
    });

    it('should return status 200 for budget routes', () => {
      chai.request(app)
        .get('/budget/getuserbudgets')
        .end((err, res) => {
          console.log('res.status', res.status);
          expect(res.status).to.equal(200);
        });
    });

    it('should return status 200 for budget routes', () => {
      chai.request(app)
        .get('/budget/getuserbudgets')
        .end((err, res) => {
          console.log('res.status', res.status);
          expect(res.status).to.equal(200);
        });
    });

    it('should return status 200 for credit card routes', () => {
      chai.request(app)
        .get('/creditcards/getcreditcards')
        .end((err, res) => {
          console.log('res.status', res.status);
          expect(res.status).to.equal(200);
        });
    });

    it('should return status 200 for cashback routes', () => {
      chai.request(app)
        .get('/cashback/getallusercategories')
        .end((err, res) => {
          console.log('res.status', res.status);
          expect(res.status).to.equal(200);
        });
    });

    it('should return status of 404 if route is unknown', () => {
      chai.request(app)
      .get('/errorroute')
      .end((err, res) => {
        expect(res.status).to.equal(404);
      });
    });


  });

});