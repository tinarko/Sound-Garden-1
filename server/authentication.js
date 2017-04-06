var passport = require('passport');
var config = require('./../config/config');
var FacebookStrategy = require('passport-facebook');
var db = require('./../database/index');

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'email'],
  }, 
(accessToken, refreshToken, profile, done) => {
    db.findUser({userID: profile.id}, (err, existingUser) => {
      // TODO: error handle invalid search for profile.id
      if (existingUser) {
        done(null, existingUser);
      } else {
        db.saveUser({profile}, (err, newUser) => {
          if (err) {
            // TODO: error handle invalid save of user
          }
          done(null, newUser);
        });
      }
    });
}));
