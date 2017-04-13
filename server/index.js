let dotenv = require('dotenv')
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

app.get('/auth/facebook', 
  passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/return', 
  passport.authenticate('facebook', { 
    // successRedirect: '/',
    failureRedirect: '/auth/facebook', 
  }),
  (req, res) => {
    // write cookie can only be written without redirect
    // write userid as cookie
    res.cookie('advisorly', req.session.passport.user.userid);
    res.redirect('/');
  });

app.get('/budget/getuserbudgets', requestHandler.budget.getUserBudgets);
app.post('/budget/updatebudgetcategory', requestHandler.budget.updateBudgetAmount);

app.get('/creditcards/getcreditcards', requestHandler.creditcards.getUserCreditcards);
// app.get('/creditcards/getcashbackcategories/:ccid', requestHandler.creditcards.getCashbackCategories);
app.get('/creditcards/changecashbackcategories', requestHandler.creditcards.changeCashbackCategories);

app.post('/plaid/access_token', requestHandler.plaid.accessToken);
app.get('/plaid/accounts', requestHandler.plaid.accounts);
app.get('/plaid/transactions/:year/:month', requestHandler.plaid.transactions);

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname,'..','client', 'index.html'));
});

let port = process.env.PORT || 1337;

app.listen(port, function() {
  console.log('listening on port ' + port + '!');

});

