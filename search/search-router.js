const express = require('express');
const Businesses = require('../businesses/business-model')
const router = express.Router()


// Search business by Name and City
//TODO: refactor to use query string, and remove middleware for auth check
router.post('/', (req, res) => {
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