const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./google-model');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:6000/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const existing = await User.findById(profile.id)
      if (!existing) {
        await User.add(profile)
          .then(user => {
            res.status(200).json({ user });
          })
          .catch(err => {
            res.status(500).json({message: 'Unable to add Google user'})
          })
      } 
    return done(err, profile);
  }
));

