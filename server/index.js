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
app.use(authentication.read);
app.use(express.static(__dirname + './../client/dist'));

/**
 * Authentication Routes
 */
app.get('/auth/auth0', passport.authenticate('auth0'));
app.get('/auth/auth0/return', passport.authenticate('auth0', {
  failureRedirect: '/auth/auth0'
}),
  (req, res) => {
    //TODO: encrypt cookie
    res.cookie('advisorly', 'loggedIn', { maxAge: 900000, httpOnly: false });
    res.redirect('/');
  });
app.get('/auth/logout', authentication.logout);

/**
 * Budget Routes
 */
app.get('/budget/getuserbudgets/:year/:month', budget.getUserBudgets);
app.post('/budget/updatebudgetcategory', budget.updateBudgetAmount);
// app.post('/budget/addbudgetcategory', budget.addBudgetCategory);

/**
 * Credit Card Routes
 */
app.get('/creditcards/getcreditcards', creditcards.getUserCreditcards);
app.get('/creditcards/createcreditcards', creditcards.createCreditCards);

/**
 * Cashback Routes
 */
app.post('/cashback/changecashbackpercent', cashback.changeCashbackPercent);
app.post('/cashback/createcashbackcategory', cashback.createCashbackCategory);
app.delete('/cashback/deletecashbackcategory/:catid', cashback.deleteCashbackCategory);

/**
 * Google Maps routes
 */
app.get('/google/geolocate', google.geolocate);
app.post('/google/places', google.places);

/**
 * Plaid routes
 */
app.post('/plaid/access_token', plaid.accessToken);
app.get('/plaid/accounts', plaid.accounts);
app.get('/plaid/transactions/:year/:month', plaid.transactions);
app.post('/plaid/allTransactions/', plaid.allTransactions);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'));
});

let port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('listening on port ' + port + '!');
});

