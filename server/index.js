let dotenv = require('dotenv');
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

// app.get('/auth/facebook', 
//   passport.authenticate('facebook', {scope: 'email'}));
// app.get('/auth/facebook/return', 
//   passport.authenticate('facebook', { 
//     // successRedirect: '/',
//     failureRedirect: '/auth/facebook', 
//   }),
//   (req, res) => {
//     // write cookie can only be written without redirect
//     // write userid as cookie
//     res.cookie('advisorly', req.session.passport.user.userid);
//     res.redirect('/');
//   });
app.get('/auth/auth0', passport.authenticate('auth0'));
app.get('/auth/auth0/return', passport.authenticate('auth0', {
  failureRedirect: '/auth/auth0'
}),
  (req, res) => {
    res.cookie('advisorly', req.session.passport.user.userid);
    res.redirect('/');
  });
app.get('/auth/logout', authentication.logout);


app.get('/budget/getuserbudgets/:year/:month', requestHandler.budget.getUserBudgets);
app.post('/budget/updatebudgetcategory', requestHandler.budget.updateBudgetAmount);

app.get('/creditcards/getcreditcards', requestHandler.creditcards.getUserCreditcards);
app.post('/creditcards/changecashbackpercent', requestHandler.creditcards.changeCashbackPercent);
app.post('/creditcards/createcashbackcategory', requestHandler.creditcards.createCashbackCategory);
app.delete('/creditcards/deletecashbackcategory/:catid', requestHandler.creditcards.deleteCashbackCategory);

app.get('/google/geolocate', requestHandler.google.geolocate);
app.post('/google/places', requestHandler.google.places);

// app.post('/budget/addbudgetcategory', requestHandler.budget.addBudgetCategory);
app.post('/plaid/access_token', requestHandler.plaid.accessToken);
app.get('/plaid/accounts', requestHandler.plaid.accounts);
app.get('/plaid/transactions/:year/:month', requestHandler.plaid.transactions);
app.post('/plaid/allTransactions/', requestHandler.plaid.allTransactions);
// app.get('/plaid/allTransactions/', requestHandler.plaid.allTransactions);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

let port = process.env.PORT || 1337;

app.listen(port, function() {
  console.log('listening on port ' + port + '!');

});

