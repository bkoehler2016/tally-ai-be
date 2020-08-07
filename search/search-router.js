const express = require('express');
const Businesses = require('../businesses/business-model')
const router = express.Router()


// Search business by Name , City, Cuisine

router.get('/', (req, res) => {

  var name = "name" in req.query ? req.query.name : "";
  var city = "city" in req.query ? req.query.city : "";
  var cuisine = "cuisine" in req.query ? req.query.cuisine : "";

  Businesses.searchBusiness(name, city, cuisine)
  .then(business => {
    if(business.length < 1) {
      res.status(404).json({message: 'No businesses found with those search parameters'})
    }
    else{
      res.status(200).json(business)
    }
  })
  .catch(error => {
    res.status(500).json({message: "Error searching for businesses",error})
  })
})


// Return all business names in an array.
router.get('/names',(req,res) => {

  Businesses.searchAllBusinessName()
    .then(businesses => {
      res.status(200).json(businesses.map(name => name.name))
    })
    .catch(err => {
      res.status(500).json({message: "Error searching for name",err})
    })
})

//Return All business info by id
router.get("/:id", (req,res) => {
  const {id} = req.params;
  Businesses.findBusinessByID(id)
    .then(business => {
      const businessFound = business[0]
      if(businessFound){

        res.status(201).json(businessFound)
      } else {
        res.status(404).json({message: "No restaurant found"})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "Error returning business"})
    })
})

module.exports = router