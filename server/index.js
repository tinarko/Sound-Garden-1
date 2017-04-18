var dotenv = require('dotenv');
var path = require('path');
dotenv.load();
dotenv.config({path: process.env.PWD + '/config.env'});

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

// import passport authentication strategies
var authentication = require('./authentication');
var requestHandler = require('./requestHandler');
var creditcards = require('./requestHandlers/creditcards.js');
var cashback = require('./requestHandlers/cashback.js');
var google = require('./requestHandlers/google.js');
var plaid = require('./requestHandlers/plaid.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session for authentication, parse cookies
app.use(cookieParser('advisorly'));
app.use(session({
  secret: 'financialAdvisorly',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + './../client/dist'));

app.get('/auth/auth0', passport.authenticate('auth0'));
app.get('/auth/auth0/return', passport.authenticate('auth0', {
  failureRedirect: '/auth/auth0'
}),
  (req, res) => {
    //TODO: encrypt cookie
    res.cookie('advisorly', req.session.passport.user.id);
    res.redirect('/');
  });
app.get('/auth/logout', authentication.logout);


app.get('/budget/getuserbudgets/:year/:month', requestHandler.budget.getUserBudgets);
app.post('/budget/updatebudgetcategory', requestHandler.budget.updateBudgetAmount);

app.get('/creditcards/getcreditcards', creditcards.getUserCreditcards);
app.get('/creditcards/createcreditcards', creditcards.createCreditCards);

app.post('/cashback/changecashbackpercent', cashback.changeCashbackPercent);
app.post('/cashback/createcashbackcategory', cashback.createCashbackCategory);
app.delete('/cashback/deletecashbackcategory/:catid', cashback.deleteCashbackCategory);

app.get('/google/geolocate', google.geolocate);
app.post('/google/places', google.places);

// app.post('/budget/addbudgetcategory', requestHandler.budget.addBudgetCategory);
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

