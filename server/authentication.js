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

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.return = (req, res) => {
  res.cookie('advisorly', 'loggedIn', { maxAge: 900000, httpOnly: false });
  res.redirect('/');
};

exports.getUser = (req, res) => {
  var user = null;
  if (req.session.passport) {
    user = req.session.passport.user;
  }
  if (user) {
    var userData = {
      loggedIn: true,
      name: user.displayName.split(' ')[0],
      picture: user._json.picture_large
    };
  } else {
    userData = {
      loggedIn: false,
      name: null,
      picture: null
    };
  }
  res.json(userData);
};

