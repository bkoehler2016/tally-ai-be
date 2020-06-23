const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./auth-model");
const secret = require("../database/secrets");

const { validateUser } = require('./auth-helpers');


router.get('/', (req, res) => {
  Users.find()
  .then(getUser => {
    res.status(200).json(getUser)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'There was an error'})

  })
})



router.post("/register", async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const user = req.body;
  console.log(user);


  const { isSuccessful, errors } = await validateUser(user);

  if (isSuccessful) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(userN => {
        const token = getJwtToken(userN.email, userN.password);
        res.status(200).json({ userN, token })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Unable to add new user'})
      })
    } else {
    res.status(400).json({ errors });
  }
})

router.post("/login", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
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
module.exports = router
