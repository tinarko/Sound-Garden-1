var dotenv = require('dotenv');
var path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var authentication = require('./authentication');
var budget = require('./requestHandlers/budget.js');
var creditcards = require('./requestHandlers/creditcards.js');
var cashback = require('./requestHandlers/cashback.js');
var google = require('./requestHandlers/google.js');
var yelp = require('./requestHandlers/yelp.js');
var plaid = require('./requestHandlers/plaid.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'financialAdvisorly',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + './../client/dist'));

/**
 * Authentication Routes
 */
app.get('/auth/user', authentication.getUser);
app.get('/auth/auth0', passport.authenticate('auth0'));
app.get('/auth/auth0/return', passport.authenticate('auth0', {failureRedirect: '/auth/auth0'}), authentication.return);
app.get('/auth/logout', authentication.logout);

/**
 * Budget Routes
 */
app.get('/budget/getuserbudgets/:year/:month', budget.getUserBudgets);
app.post('/budget/updatebudgetcategory', budget.updateBudgetAmount);

/**
 * Credit Card Routes
 */
app.get('/creditcards', creditcards.getAll);
app.post('/creditcards', creditcards.create);

/**
 * Cashback Routes
 */
app.get('/cashback', cashback.getAll);
app.get('/cashback/:catid', cashback.getOne);
app.put('/cashback', cashback.change);
app.post('/cashback', cashback.create);
app.delete('/cashback/:catid', cashback.delete);
app.post('/cashback/calculate', cashback.calculate);
/**
 * Google Maps routes
 */
app.get('/google/geolocate', google.geolocate);

/** 
 * Yelp routes
 */

app.get('/yelp/:lat/:long', yelp.search);

/**
 * Plaid routes
 */
app.post('/plaid/access_token', plaid.accessToken);
app.get('/plaid/accounts', plaid.accounts);
app.get('/plaid/transactions/:start/:end/:destination', plaid.transactions);

/**
 * Catch all for random URLs
*/
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'));
});


module.exports = app;