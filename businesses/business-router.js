const express = require("express");
const Businesses = require("./business-model");
const router = express.Router();
const middleware = require("../auth/authenticate-middleware");


router.get('/', middleware, (req, res ) => {
  Businesses.getBusinessses()
  .then(business => {
    res.status(200).json(business.rows)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'there was an error'})

  })
})

router.get('/:id', middleware, async (req, res) => {
  const  {id}  = req.params

  await Businesses.findBusinessByID(id)
  .then(business => {
    if(!business) {
      res.status(404).json({error: 'Business ID Not found'})
    }
    else {
      res.status(200).json(business)
    }

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'There was an Error retrieving the business'})
  })
})

// Search business by Name and City
router.post('/search', middleware, (req, res) => {
  Businesses.searchBusiness(req.body)
  .then(business => {
    if(!business) {
      res.status(404).json({error: 'No businesses found with those search parameters'})
    }
    else{
      res.status(200).json(business)
    }
  })
})

module.exports = router