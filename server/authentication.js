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
  console.log('accessToken:', accessToken);
  console.log('profile:', profile);
  console.log('friends:', profile._json.context.mutual_friends);
  db.findUser(profile.id, (err, existingUser) => {
    // TODO: error handle invalid search for profile.id
    //if user exists:
    if (existingUser !== false) {
      console.log('this is if existing user', existingUser);
      db.removeCurrentFriendJoins(existingUser.userid, (err, results) => {
        if (err) {
          //TODO: error handle
        } else {
          if (profile._json.context.mutual_friends.data.length === 0) {
            done(null, profile);
          } else {
            db.addFriendJoins(existingUser.userid, profile._json.context.mutual_friends.data, (err, results) => {
              if (err) {
                //TODO: error handle
              } else {
                done(null, profile);
              }
            });
          }
        }
      });
    } else {
      console.log('this is if NOT existinguser');
      db.saveUser(profile, (err, newUser) => {
        if (err) {
          // TODO: error handle invalid save of user
        }
        console.log('newUser', newUser);
        console.log('profileid', profile.id);
        console.log('friends2:', profile._json.context.mutual_friends.data);
        db.addFriendJoins(profile.id, profile._json.context.mutual_friends.data, (err, results) => {
          console.log('this has run');
          if (err) {
            //TODO: error handle
          } else {
            done(null, profile);
          }
        });
        done(null, profile);
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializing', user.id);
  db.findUser(user.id, (err, results) => {
    done(null, user);
  });
});

// remove cookie if not signed in 
exports.read = (req, res, next) => {
  if (!req.session.passport && req.cookies.advisorly) {
    res.clearCookie('advisorly');
  }
  next();
};

exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    res.clearCookie('advisorly');
    res.redirect('/');
  });
};
