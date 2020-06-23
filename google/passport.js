const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./google-model');

passport.serializeUser(function(user, done) {
  console.log("SERIALIZED USER YAS")
    done(null, user.email);
  });
  
passport.deserializeUser(function(email, done) {
  console.log("DESERIALIZED USER YAS")
  User.findByEmail(email).then(gUser => {
    done(null, gUser);
  })
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:6000/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log("ASYNC FUNCTION PROFILE START")

    const newProfile = {
      google_id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile._json.email
    };

      User.findByEmail(newProfile.email)
        .then(existing => {
          if(existing) {
            console.log('This user exists!');
            done(null, existing)
          } else {
            User.add(newProfile)
                .then(user => {
                  console.log('Successfully added Google User to the DB')
                  done(null, user);
                })
                .catch(err => {
                  console.log('Error saving Google User to the DB', err)
                })
          }
        })
  }
));