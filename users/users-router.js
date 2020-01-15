const express = require("express");

const Users = require("./users-model");

const router = express.Router();

// CHANGE USER CREDENTIALS

router.put("/:id", (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Invalid user" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Could not update user" }, error);
    });
});

// DELETE USER

router.delete("/:id", (req, res) => {
  db.destroy(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Could not delete user" }, error);
    });
});

// GET USERS

router.get("/:id", (req,res) => {
  Users.getUsers()
  .then(user => {
    res.json(user);
  })
  .catch(err => res.send(err));
});

// POST /users/:id/business

router.post("/:id/business", (req, res) => {
  req.body.id = req.params.id // maybe it's req.body.user.id not 100% sure
  Users.insertBusiness(req.body)
  .then(event => {
    res.status(201).json({...event, message: "user business posted"})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({...err, message: "user business failed to post"})
})
});

// DELETE /users/:id/business

router.delete("./:id/business", (req, res) => {
  Users.destroy(req.params.id)
  .then(event => {
    if (!event) {
      res.status(404).json({message: " No event exists by that ID!"})
  } else {
      res.status(200).json({message: "deleted"})
  }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
})
});

module.exports = router;
