const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-S3');
const config = require('../helpers/awsConfig')

aws.config.update(config.awsConfig)
var s3 = new aws.s3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "",
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString)
    }
  })
})

module.exports = {
  uploadImageToS3: (req,res) => {
    //upload to S3
    //update info in database
    //send response to client
  }
}