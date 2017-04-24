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
      return db.queryAsync(`INSERT into categorytypes (name) values ('Food and Drink'), ('Travel'), ('Groceries'), ('Entertainment'), ('Other');`);
    })
    .then(() => {
      return db.queryAsync(`INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (1, 1, 1, 500.00, 0), (2, 1, 2, 600.00, 0);`);
    })

    .then(() => {
      done();
    })
    .error ((err) => {
      //TODO: Handle error
      console.log('errored:', err);
    });

    server = app.listen(port);

    afterEach(() => {
      server.close();
    });

  });

  describe('Initial/Setup Tests', () => {

    it('should have a users table', (done) => {
      var queryString = 'select * from users;';
      db.query(queryString, (err, results) => {
        if (err) {
          return done(err); 
        }
        expect(results).to.exist;
        done();

      });
    });
  });

  describe ('Plaid Tests', () => {

    // it('should return status 200 for plaid routes', () => {
    //   chai.request(server)
    //     .get('/plaid/accounts')
    //     .end((err, res) => {
    //       console.log('res.status plaid', res.status);
    //       expect(res.status).to.equal(200);
    //     });
    // });

  });

  describe('Budget Tests', () => {
    
    it('should return status 200 when request is sent to get budget list', (done) => {
      chai.request(server)
        .get('/budget/getuserbudgets')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return budgets for a given month', (done) => {
      chai.request(server)
      .get('/budget/getuserbudgets/2017/04')
      .end((err, res) => {
        expect(res.text).to.equal('[{"name":"Food and Drink","goalvalue":500,"actualvalue":0},{"name":"Travel","goalvalue":600,"actualvalue":0}]');
        done();
      });
    });

    it('should return status 201 when request is sent to update budget amount', (done) => {
      chai.request(server)
        .post('/budget/updatebudgetcategory')
        .send({
          categoryname: 'Food and Drink',
          goalvalue: 500,
          change: 'update',
          year: 2017,
          month: 4
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should update database budget amount for target category upon increment', (done) => {
      chai.request(server)
      .post('/budget/updatebudgetcategory')
      .send({
        categoryname: 'Food and Drink',
        goalvalue: 500,
        change: 'increment',
        year: 2017,
        month: 4
      })
      .end((err, res) => {
        var queryString = `select budgetcategories.goalvalue\
        from categorytypes inner join budgetcategories inner join budgets inner join users \
        on users.userid = budgets.user_id AND budgetcategories.budget_id = budgets.id \
        AND budgetcategories.category_id = categorytypes.id AND users.userid = 'facebook|123' \
        AND YEAR(budgets.month) = 2017 AND MONTH(budgets.month) = 04 AND categorytypes.name = 'Food and Drink';`;

        db.query(queryString, (err, results) => {
          if (err) {
            return done(err); 
          }
          expect(results[0].goalvalue).to.equal(510);
          done();
        });
      });
    });


  });

});