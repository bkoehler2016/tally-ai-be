const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./auth-model");
const secret = require("../database/secrets");

const { validateUser } = require('./auth-helpers');

router.get('/', (req, res) => {
  Users.find()
    .then(getUser => {
      res.json(getUser);
    })
    .catch(err => res.send(err))
});

// router.post("/register", (req, res) => {
//   const user = req.body;

//   const hash = bcrypt.hashSync(user.password, 12);
//   user.password = hash;

//   Users.add(user)
//     .then(userN => {
//       const token = getJwtToken(userN);

//       Users.findByName(userN.first_name)
//       .then(newUser => {
//         console.log(newUser)
//         res.status(200).json({ message: 'User registered.', id: newUser[0].id, token: token });
//       })
//       .catch(err => res.status(500).json('Unable to retrieve new user.'))
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json(error);
//     });
// });

router.post("/register", async (req, res) => {
  const user = req.body;

  const { isSuccessful, errors } = await validateUser(user);

  if (isSuccessful) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(userN => {
        const token = getJwtToken(userN.email, userN.password);
        res.status(200).json({ userN, token })
      })
      .catch(error => res.status(500).json({ message: 'Unable to retrieve new user.', error }))
  } else {
    res.status(400).json({ errors });
  }

})

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .then(user => {
      user = user[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.email, user.password);
        res.status(200).json({
          message: `Welcome ${user.first_name}!`,
          id: user.id,
          token: token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'error logging user in!' });
    });
});



function getJwtToken(email, password) {
  const payload = {
    email,
    password
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}
module.exports = router;
