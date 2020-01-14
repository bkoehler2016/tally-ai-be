const express = require("express");

const Users = require("./users-model");

const router = express.Router();

// CHANGE USER CREDENTIALS

router.put("user/:id", (req, res) => {
  const changes = req.body;
  db.update(req.params.id)
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
