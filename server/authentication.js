var passport = require('passport');
var config = require('./../config/config');
var FacebookStrategy = require('passport-facebook');
var db = require('./../database/index');

passport.use(new FacebookStrategy({
//   clientID: process.env.FB_appID,
//   clientSecret: process.env.FB_secret,
//   callbackURL: process.env.SITE_URL + 'auth/facebook/return',
//   profileFields: ['id', 'displayName', 'email'],
// }, 
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'email'],
}, 
(accessToken, refreshToken, profile, done) => {
    db.findUser(profile._json.id, (err, existingUser) => {
      // TODO: error handle invalid search for profile.id
      if (existingUser !== false) {
        console.log('this is if existing user', existingUser);
        done(null, existingUser);
      } else {
        console.log('this is if NOT existinguser');
        db.saveUser(profile._json, (err, newUser) => {
          if (err) {
            // TODO: error handle invalid save of user
          }
          done(null, profile._json);
        });
      }
    });
}));

// serialize and deserialize User to save and retrieve user data from session
// stores user in session
passport.serializeUser((user, done) => {
  console.log('serializing', user.userid);
  done(null, user.userid);
});

passport.deserializeUser((id, done) => {
  // db.findByID(id, (err, user) => {
  //   done(err, user);
  // });
  console.log('deserializing', id);
  done(null, id);
});