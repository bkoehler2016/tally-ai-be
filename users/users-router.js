const express = require("express");

const Users = require("./users-model");

const router = express.Router();
const helpers = require('./users_helpers');

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

// GET /users/:id

router.get('/:id', (req, res) => {
  const { id } = req.params
  Users.getUsers(id)
    .then(data => {
      // if (data) {
      // console.log("Data in users-router:\n", helpers.formatUserData(data));
      const formatted = helpers.formatUserData(data);
      console.log("Formatted Data in users-router:\n", formatted);
      res.status(200).json(formatted);
      // }
      // else {
      //   res.status(404).json({ message: `error retrieving the worker.` })
      // }
    }).catch(error => res.status(404).json({ message: "Error fetching user data", error }));
});

// POST /users/:id/business

router.post('/:id/business', (req, res) => {
  const id = req.params.id
  Users.insertBusiness(req.body, id)
    .then(event => {
      res.status(201).json({ event, message: "User Business posted" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err, message: "User Business failed to post" })
    })
})

// Add favorite
router.post('/:id/favorite', (req, res) => {
  const id = req.params.id
  Users.insertFavorite(req.body, id)
    .then(event => {
      res.status(201).json({ event, message: "User Favorite posted" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err, message: "User Favorite failed to post" })
    })
})

// DELETE /users/:id/business

router.delete('/:id/business', (req, res) => {
  Users.destroy(req.params.id)
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" })
      } else {
        res.status(200).json({ message: "User Business Deleted" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router;
