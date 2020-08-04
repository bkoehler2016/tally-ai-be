const aws = require('aws-sdk');
const express = require('express')
const multer = require ('multer')
const multers3 = require ('multer-s3')
const config = require ('../helpers/awsConfig')

aws.config.update(config.awsConfig)

const s3 = new aws.S3()

const upload = multer({
  storage: multers3({
    s3: s3
  })
})



const uploadImageToS3 = (req,res) => {
  //upload to S3
  //store to database
  //send response to front end

}

module.exports = uploadImageToS3


