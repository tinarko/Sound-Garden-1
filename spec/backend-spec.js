const dotenv = require('dotenv');
const path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require ('chai-http');
const server = require('../server/index');
const mysql = require('mysql');

// var port = process.env.PORT || 1337;

chai.use(chaiHttp);

describe ('', function () {

  let db;
  // let port = process.env.PORT || 1337;


  beforeEach( () => {
    db = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'heroku_aa9603bdcb7e15e'
    });
    db.connect();
   // app.listen(port, function() {
    //   console.log('listening on port' + port);
    // });
    afterEach(function () { server.close(); });
  
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
      chai.request(server)
      .get('/errorroute')
      .end((err, res) => {
        console.log('res.status', res.status);
        expect(res.status).to.equal(404);
      });
    });
  });

});