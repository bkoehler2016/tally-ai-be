const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./google-model');

passport.serializeUser(function(user, done) {
  console.log("SERIALIZED USER YAS")
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log("DESERIALIZED USER YAS")
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:6000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("ASYNC FUNCTION PROFILE START")
    const newProfile = {
      google_id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile._json.email
    };
    // const existing = await User.findById(profile.id)
    //   if (!existing) {
    //     await User.add(newProfile)
    //       .then(user => {
    //         console.log('MADE IT')
    //         res.status(200).json({ user });
    //       })
    //       .catch(err => {
    //         res.status(500).json({message: 'Unable to add Google user'})
    //       })
    //   }
    //   console.log("ASYNC FUNCTION PROFILE END") 
    // return done(err, profile);
    User.findById(newProfile.google_id)
      .then(existing => {
        if(existing) {
          console.log('This user exists!')
        } else {
          User.add(newProfile)
              .then(user => {
                console.log('MADE IT')
                res.status(200).json({ user });
              })
              .catch(err => {
                res.status(500).json({message: 'Unable to add Google user'})
              })
        }
      })
  }
));

