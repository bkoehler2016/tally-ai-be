const express = require("express");

const Users = require("./users-model");

const router = express.Router();
const helpers = require('./users_helpers');

const middleware = require("./validate-id-middleware");

// CHANGE USER CREDENTIALS
router.put("/:id", middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
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
router.delete("/:id", middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
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

// GET USER INFO
router.get('/:id', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { id } = req.params;
  Users.getUsers(id)
    .then(data => {
      const formatted = helpers.formatUserData(data);
      console.log("Formatted Data in users-router:\n", formatted);
      res.status(200).json(formatted);
    }).catch(error => res.status(404).json({ message: "Error fetching user data", error }));
});

// ADD BUSINESS
router.post('/:id/business', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  if(!req.body.business_id){
    res.status(401).json({error: 'Please include the business ID'})
  } else {
  const bizId = req.body.business_id
  Users.addUserBusiness(id, bizId)
    .then(business => {
      if(!business){
        res.status(400).json({error: "Business not added"})
      } else {
        res.status(201).json({message: 'Added', Data: business})
      }
    })
    .catch(error => {
      console.log(`There was an error adding a users business: ${error}`);

      res.status(500).json({error: 'There was an error adding the business'})
    })
  }
})

// GET USERS BUSINESS WITH DETAILS
router.get('/:id/businessinfo', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id
  Users.getUserBusinessInfo(id)
    .then(businesses => {
      if(!businesses) {
        res.status(404).json({error: 'No businesses for this user'})
      } else {
        res.status(200).json({message: "Success", data: businesses})
      }
    })
})


// ADD FAVORITE
// TODO: Return formattedFavorites; need to adjust front end to account for the different format.
router.post('/:id/favorite', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  Users.insertFavorite(req.body, id)
    .then(async event => {
      try {
        const favorites = await Users.getFavorites(id);
        const formattedFavorites = helpers.formatBusinesses(favorites);
        // TODO: Replace favorites: favorites with favorites: formattedFavorites
        res.status(201).json({ event, favorites: favorites, message: "User Favorite posted" });
      } catch (error) {
        console.log(`Error fetching favorites after ins ert:\n${error}\n`);
        res.status(404).json({ error, message: "Error fetching favorites after insert." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err, message: "User Favorite failed to post" });
    });
})

// DELETE BUSINESS
// TODO: Return formattedBusinesses; need to adjust front end to account for the different format.
router.delete('/:id/business/:bID', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  Users.destroyBusiness(req.params.bID)
    .then(async event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" });
      } else {
        const businesses = await Users.getBusinesses(req.params.id);
        const formattedBusinesses = helpers.formatBusinesses(businesses);
        // TODO: Replace businesses: businesses with businesses: formattedBusinesses
        res.status(200).json({ businesses: businesses, message: "User Business Deleted" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});

// DELETE FAVORITE
// TODO: Return formattedFavorites; need to adjust front end to account for the different format.
router.delete('/:id/favorite/:bID', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  Users.destroyFavorite(req.params.bID)
    .then(async event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" });
      } else {
        const favorites = await Users.getFavorites(req.params.id);
        const formattedFavorites = helpers.formatBusinesses(favorites);
        // TODO: Replace favorites: favorites with favorites: formattedFavorites
        res.status(200).json({ favorites: favorites, message: "User Favorite Deleted" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
