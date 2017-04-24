const dotenv = require('dotenv');
const path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require ('chai-http');
const Promise = require('bluebird');
const app = require('../server/app');
const mysql = require('mysql');
var createTables = require('../database/config.js');
chai.use(chaiHttp);

describe ('', function () {

  var db;
  var server;
  var port = process.env.PORT || 1337;

  beforeEach( (done) => {
    var database = 'heroku_aa9603bdcb7e15e';
    let connection = mysql.createConnection({
      user: 'root',
      password: '',
      // database: 'heroku_aa9603bdcb7e15e'
    });

    db = Promise.promisifyAll(connection, {multiArgs: true });

    db.connectAsync()
    .then(() => {
      return db.queryAsync('DROP DATABASE IF EXISTS ' + database);
    })
    .then(() => {
      console.log('Connected to ' + database);
      return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database + ';');
    })
    .then(() => {
      return db.queryAsync('USE ' + database);
    })
    .then (() => {
      return createTables(db);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO users (userid, name, email) VALUES ('facebook|123','Charles Xavier','profx@test.com');`);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO budgets (id, user_id, month) VALUES (1, 'facebook|123', '2017-04-01 10:00:00');`);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO categorytypes (id, name) VALUES (1, 'Food and Drink');`);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO categorytypes (id, name) VALUES (2, 'Travel');`);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (1, 1, 1, 500.00, 0);`);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (2, 1, 2, 600.00, 0);`);
    })
    .then(() => {
      done();
    })
    .error ((err) => {
      //TODO: Handle rejection
      console.log('errored:', err);
    });

    server = app.listen(port, () => {
      console.log('listening on port ' + port + '!');
    });

    afterEach(() => {
      server.close();
    });

    // after(() => db.end());

  });

  describe('Initial/Setup Tests', () => {

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

  describe('Budget Tests', () => {

    // it('should return status 200 for authentication routes', () => {
    //   chai.request(app)
    //     .get('/auth/user')
    //     .end((err, res) => {
    //       console.log('res.status auth', res.status);
    //       expect(res.status).to.equal(200);
    //     });
    // });

    // it('should return status 200 for plaid routes', () => {
    //   chai.request(app)
    //     .get('/plaid/accounts')
    //     .end((err, res) => {
    //       console.log('res.status plaid', res.status);
    //       expect(res.status).to.equal(200);
    //     });
    // });

    it('should return status 200 for budget routes', (done) => {
      chai.request(server)
        .get('/budget/getuserbudgets')
        .end((err, res) => {
          console.log('res.status budget', res.status);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return budgets for a given month', (done) => {
      chai.request(server)
      .get('/budget/getuserbudgets/2017/04')
      .end((err, res) => {
        console.log('response from budget request', res);
        expect(res.text).to.equal('[{"name":"Food and Drink","goalvalue":500,"actualvalue":0},{"name":"Travel","goalvalue":600,"actualvalue":0}]');
        done();
      });
    });

    it('should send headers in request for budget routes', (done) => {
      chai.request(server)
        .get('/budget/getuserbudgets')
        .end((err, res) => {
          console.log('req budget', req);
          expect(req).to.have.headers;
          done();
        });
    });
    // it('should return status 200 for credit card routes', (done) => {
    //   chai.request(app)
    //     .get('/creditcards/getcreditcards')
    //     .end((err, res) => {
    //       console.log('res.status creditcards', res.status);
    //       expect(res.status).to.equal(200);
    //       done();
    //     });
    // });

    // it('should return status 200 for cashback routes', (done) => {
    //   chai.request(app)
    //     .get('/cashback/getallusercategories')
    //     .end((err, res) => {
    //       console.log('res.status cashback', res.status);
    //       expect(res.status).to.equal(200);
    //       done();
    //     });
    // });

    // it('should return status of 404 if route is unknown', (done) => {
    //   chai.request(app)
    //   .get('/errorroute')
    //   .end((err, res) => {
    //     console.log('res.status errorroute', res.status);
    //     expect(res.status).to.equal(404);
    //     done();
    //   });
    // });


  });

});