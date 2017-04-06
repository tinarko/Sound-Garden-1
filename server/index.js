var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

// import passport authentication strategies
var authentication = require('./authentication');
var config = require('./../config/config');
var db = require('./../database/index');
var requestHandler = require('./requestHandler');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session for authentication, parse cookies
app.use(cookieParser());
app.use(session({
  secret: 'financialAdvisorly',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// serialize and deserialize User to save and retrieve user data from session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // db.findByID(id, (err, user) => {
  //   done(err, user);
  // });
  db.findUser(id, (err, user) => {
    done(err, user);
  });
});

app.use(express.static(__dirname + './../client/dist'));

app.get('/auth/facebook', 
  passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // write cookie
    res.cookie('advisorly', 'loggedIn');
    // redirect home on successful login
    res.redirect('/');
  });
// redirect invalid paths to homepage 
// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

app.listen(1337, function() {
  console.log('listening on port 1337!');
});

