const dotenv = require('dotenv');
const path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require ('chai-http');
const server = require('../server/index');
const mysql = require('mysql');

var port = process.env.PORT || 1337;

chai.use(chaiHttp);

describe ('', function () {

  beforeEach( () => {
    var connection = mysql.createConnection({
      // host: 'localhost',
      user: 'root',
      password: '',
      database: 'heroku_aa9603bdcb7e15e'
    });
    connection.connect();
   // app.listen(port, function() {
    //   console.log('listening on port' + port);
    // });
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

describe('Database Tests', () => {
  // it('should have a users table', () => {
  //   var queryString = 'insert into users (userid, name, email) value(?, ?, ?)';
  //   connection.query(queryString, ['facebook|123', 'Charles Xavier', 'profx@xavier.com'], () => {
      
  //   });
  // });
});