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
    db.findUser(profile._json, (err, existingUser) => {
      // TODO: error handle invalid search for profile.id
      if (existingUser) {
        console.log('hi')
        done(null, existingUser);
      } else {
        console.log('this is where we will be')
        db.saveUser(profile._json, (err, newUser) => {
          if (err) {
            // TODO: error handle invalid save of user
          }
          done(null, newUser);
        });
      }
    });
}));
