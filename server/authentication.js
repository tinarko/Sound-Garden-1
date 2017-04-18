var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var db = require('./../database/index');

passport.use(new Auth0Strategy({
  domain: 'hrsf72-thesis.auth0.com',
  clientID: 'mGCS2U9lD5fhYJKr66uZsYtZkoQsPXMJ',
  clientSecret: 'FJwsbaIhiSjF8YCMLgIkseCKgYzKYwO3Yoo6oYwKJUciW6crwPmBelJvEabWSdCJ',
  callbackURL: 'auth0/return',
},
(accessToken, refreshToken, profile, done) => {
  db.findUser(profile.id, (err, existingUser) => {
    // TODO: error handle invalid search for profile.id
    if (existingUser !== false) {
      console.log('this is if existing user', existingUser);
      done(null, profile);
    } else {
      console.log('this is if NOT existinguser');
      db.saveUser(profile, (err, newUser) => {
        if (err) {
          // TODO: error handle invalid save of user
        }
        done(null, profile);
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};