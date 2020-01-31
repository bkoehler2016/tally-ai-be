const express = require("express");

const Users = require("./users-model");

const router = express.Router();
const helpers = require('./users_helpers');

const middleware = require("./validate-id-middleware");

// CHANGE USER CREDENTIALS

router.put("/:id", (req, res) => {
  const changes = req.body;
  console.log(`\nPUT changes:\n${changes}\n`);
  Users.update(req.params.id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Invalid user" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Could not update user", error });
    });
});

// DELETE USER

router.delete("/:id", (req, res) => {
  Users.destroy(req.params.id)
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

router.get('/:id', middleware, (req, res) => {
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
    .then(async event => {
      try {
        const businesses = await Users.getBusinesses(id);
        res.status(201).json({ event, businesses, message: "User Business posted" })
      } catch (error) {
        console.log(`Error fetching businesses after insert:\n${error}\n`);
        res.status(404).json({ error, message: "Error fetching businesses after insert." });
      }
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
    .then(async event => {
      try {
        const favorites = await Users.getFavorites(id);
        res.status(201).json({ event, favorites, message: "User Favorite posted" })
      } catch (error) {
        console.log(`Error fetching favorites after insert:\n${error}\n`);
        res.status(404).json({ error, message: "Error fetching favorites after insert." });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err, message: "User Favorite failed to post" })
    })
})

// DELETE /users/:id/business

router.delete('/:id/business/:bID', (req, res) => {
  Users.destroyBusiness(req.params.bID)
    .then(async event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" })
      } else {
        const businesses = await Users.getBusinesses(req.params.id);
        res.status(200).json({ businesses, message: "User Business Deleted" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.delete('/:id/favorite/:bID', (req, res) => {
  Users.destroyFavorite(req.params.bID)
    .then(async event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" })
      } else {
        const favorites = await Users.getFavorites(req.params.id);
        res.status(200).json({ favorites, message: "User Favorite Deleted" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router;
