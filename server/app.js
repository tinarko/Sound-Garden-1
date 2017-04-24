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
app.use(authentication.read);
app.use(express.static(__dirname + './../client/dist'));

/**
 * Authentication Routes
 */
app.get('/auth/user', authentication.getUser);
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
 //app.route
app.get('/budget/getuserbudgets/:year/:month', budget.getUserBudgets); //budget.getAll
app.post('/budget/updatebudgetcategory', budget.updateBudgetAmount); // budget.update
// app.post('/budget/addbudgetcategory', budget.addBudgetCategory);

/**
 * Credit Card Routes
 */
app.get('/creditcards/getcreditcards', creditcards.getCreditcards);
app.get('/creditcards/createcreditcards', creditcards.createCreditCards);

/**
 * Cashback Routes
 */
app.get('/cashback/getallusercategories', cashback.getAllUserCategories);
app.get('/cashback/getcashbackcategories/:catid', cashback.getCashbackCategories);
app.post('/cashback/changecashbackpercent', cashback.changeCashbackPercent);
app.post('/cashback/createcashbackcategory', cashback.createCashbackCategory);
app.delete('/cashback/deletecashbackcategory/:catid', cashback.deleteCashbackCategory);

/**
 * Google Maps routes
 */
app.get('/google/geolocate', google.geolocate);
app.post('/google/places', google.places);

/** 
 * Yelp routes
 */

app.get('/yelp/businesses/:lat/:long', yelp.businesses);

/**
 * Plaid routes
 */
app.post('/plaid/access_token', plaid.accessToken);
app.get('/plaid/accounts', plaid.accounts);
app.get('/plaid/transactions/:year/:month', plaid.transactions);
app.post('/plaid/allTransactions/', plaid.allTransactions);

/**
 * Catch all for random URLs
*/
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'));
});


module.exports = app;

