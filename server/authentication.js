var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var db = require('./../database/index');
// var config = require('./../config/config');
// var FacebookStrategy = require('passport-facebook');

// passport.use(new FacebookStrategy({
//   clientID: process.env.FB_appID,
//   clientSecret: process.env.FB_secret,
//   callbackURL: process.env.SITE_URL + 'auth/facebook/return',
//   profileFields: ['id', 'displayName', 'email'],
// }, 
// //   clientID: config.facebook.clientID,
// //   clientSecret: config.facebook.clientSecret,
// //   callbackURL: config.facebook.callbackURL,
// //   profileFields: ['id', 'displayName', 'email'],
// // }, 
// (accessToken, refreshToken, profile, done) => {
//     db.findUser(profile._json.id, (err, existingUser) => {
//       // TODO: error handle invalid search for profile.id
//       if (existingUser !== false) {
//         console.log('this is if existing user', existingUser);
//         done(null, profile);
//       } else {
//         console.log('this is if NOT existinguser');
//         db.saveUser(profile._json, (err, newUser) => {
//           if (err) {
//             // TODO: error handle invalid save of user
//           }
//           done(null, profile);
//         });
//       }
//     });
// }));

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

// serialize and deserialize User to save and retrieve user data from session
// stores user in session
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