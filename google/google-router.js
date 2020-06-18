const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secret = require('../database/secrets');
require('./passport');

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/failed', (req, res) => res.send('Failed to log in'))

app.get('/google/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/google/yay')
})

app.get('/dashboard', (req, res) => res.send(`Welcome ${req.user.email}`))
app.get('/google/yay', (req, res) => res.send(`Successfully Logged out!`));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const authToken = getJwtToken(req.user.email, req.user.google_id)
    res.status(200).send({message: `Welcome ${req.user.first_name}!`,
    id: req.user.google_id,
    token: authToken});
  }
  );


  function getJwtToken(email, id) {
    const payload = {
      email,
      id
    };
  
    const options = {
      expiresIn: "7d"
    };
  
    return jwt.sign(payload, secret.jwtSecret, options);
  }

module.exports = app;