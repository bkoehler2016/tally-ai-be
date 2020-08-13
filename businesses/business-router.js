const express = require("express");
const Businesses = require("./business-model");
const middleware = require("../auth/authenticate-middleware");
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');



const router = express.Router();

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
// Image Uploader


// S3 Configuration
const s3 = new AWS.S3()
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

// Multer Config



const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_IMAGE_BUCKET,
    acl: "public-read",
    key: function (req, file, cb) {
      const fileName = uuidv4()
      const extension = file.mimetype.replace(/image\//g, "");
      finalFileName = `${fileName}.${extension}`
      cb(null, `${fileName}.${extension}`);
    },
  }),
});
;
//upload images to S3 and store imageURL in database
router.post("/:id/upload", upload.single("image", 1), async (req, res) => {
  const fileName = req.file.key
  const { id } = req.params;
  const newPhoto = {
  };
  await Businesses.updateImage(id, fileName)
    .then((updated) => res.status(201).json({ result: 'file uploaded successfully'}))
    .catch((err) => res.status(500).json({ error: err }));
})

module.exports = router