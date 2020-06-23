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

app.get('/some-page', async (req, res) => {
  const authToken = getJwtToken(req.user.email, req.user.google_id)
  res.json({message: `Welcome ${req.user.first_name}!`,
  id: req.user.google_id,
  token: authToken});
})
app.get('/google/yay', (req, res) => res.send(`Successfully Logged out!`));

app.get('/google/callback', 
  passport.authenticate('google', 
  ),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard')
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