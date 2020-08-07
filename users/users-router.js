const express = require("express");

const Users = require("./users-model");
const Business = require("../businesses/business-model")

const router = express.Router();
const helpers = require('./users_helpers');

const middleware = require("./validate-id-middleware");


// Modify User Information
router.put("/:id", middleware, (req, res) => {
  const changes = req.body
  const id = parseInt(req.params.id)
  // console.log(changes);
  if (!changes) {
  res.status(400).json({message: 'No Information Provided'})
  } else {
    Users.editUser(id, changes)
    .then(updated => {
      return res.status(200).json(updated)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: error})
    })
  }
})

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
    .then(businesses => {
      if(!businesses){
        res.status(400).json({error: "Business not added"})
      } else {
        res.status(201).json({message: 'Added', businesses: businesses})
      }
    })
    .catch(error => {
      console.log(`There was an error adding a users business: ${error}`);

      res.status(500).json({error: 'There was an error adding the business'})
    })
  }
})

// GET USERS BUSINESS & COMPETITORS WITH DETAILS
router.get('/:id/businesses', middleware, async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id
  try {
    const businesses = await Users.getUserBusinessInfo(id);
    const competitors = await Users.getUserBusinessCompetitionInfo(id);
    
    res.status(201).json({businesses, competitors})
  } catch (error) {
    res.status(500).json({message: "Error returning businesses", error})
  }


})



router.post('/:id/favorite', middleware,  (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  if(!req.body.business_id){
    res.status(401).json({error: 'Please include the business ID'})
  } else {
    Users.addUserCompetition( id, req.body.business_id)
      .then(competitors => {
        if(!competitors){
          res.status(400).json({error: "Business not added"})
        } else {
          res.status(201).json({message: 'Added', competitors: competitors})
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err, message: "User Favorite failed to post" });
      });
  }
})

router.delete('/:id/business/:bID', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  Users.removeUsersBusiness(req.params.bID)
    .then(async event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" });
      } else {
        res.status(200).json({ business_id: req.params.bID, message: "User Business Deleted" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});


router.delete('/:id/favorite/:bID', middleware, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  Users.removeUsersCompetition(req.params.bID)
    .then(async event => {
      if (!event) {
        res.status(404).json({ message: "No User Business exists by that ID!" });
      } else {
        res.status(200).json({ competitor_id: req.params.bID, message: "User Favorite Deleted" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;
