const router = require("express").Router();
const jwt = require("jsonwebtoken");
const gUsers = require("./google-model");
const secret = require("../database/secrets");

// Login
router.post('/login', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const googleUser = req.body;
  console.log('Incoming Google Data: ', googleUser);
  
  gUsers.findByEmail(googleUser.email)
    .then(userData => {
      if (userData) {
        const token = getJwtToken(googleUser.email, googleUser.google_id);
        res.status(200).json({
          message: `Welcome ${googleUser.first_name}`,
          id: googleUser.google_id,
          token: token
        });
      } else {
        res.status(401).json({ message: 'Google User does not exist!' })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `There was a problem contacting the DB`});
    });
})

// Register
router.post('/register', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const googleUser = req.body;
  console.log('Incoming Google Data: ', googleUser);
  
  gUsers.add(googleUser)
    .then(user => {
      const token = getJwtToken(googleUser.email, googleUser.google_id);
      res.status(200).json({
        message: `Welcome ${googleUser.first_name}`,
        id: googleUser.google_id,
        token: token
      })
    })
    .catch(err => {
      console.log('Error adding Google user: ', err)
      res.status(500).json({message: `Unable to add Google user to DB`});
    });
})

function getJwtToken(email, googleId) {
  const payload = {
    email,
    googleId
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;