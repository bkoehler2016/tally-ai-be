const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { validateUser, getJwtToken } = require("./auth-helpers");
const model = require("./auth-model");

router.post("/register", async (req, res) => {
  const user = req.body;
  const validateResults = validateUser(user);

  if (validateResults.isSuccessful) {
    const hash = bcrypt.hashSync(user.password, 14);

    const hashedUser = {
      password: hash,
      email: user.email
    };

    try {
      const saved = await model.addUser(hashedUser);
      const token = getJwtToken(saved.email, saved.password);
      res.status(201).json({
        user: saved,
        token
      });
    } catch (error) {
      console.log("\nERROR in POST to /api/auth/register");
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (email && password) {
    db.findBy({ email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = getJwtToken(user);
          res.status(200).json({ message: `Welcome ${user.first_name}`, token, userId: user.id })
        } else {
          res.status(401).json({ message: "Please enter a valid email and password" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: `server error ${error}` });
      });
  } else {
    res.status(400).json({ message: `Username and password required` });
  }
});

module.exports = router;
