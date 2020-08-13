const db = require('../database/dbConfig');
const knex = require('knex')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const AWS = require('aws-sdk')


const getBusinessses = async () => {
 const result = await db.raw(
    `SELECT * FROM tallyds.business`
  )
  return result
 }

async function findBusinessByID(id) {

  const result = await db.raw(
    `SELECT * FROM tallyds.business WHERE business_id = '${id}' `
  );
  return result.rows
}

async function searchBusiness(name, city, cuisine) {
  const result = await db('tallyds.business')
    .select('business_id','name', 'address', 'city', 'zipcode', 'cuisine', 'review_count', 'business_stars', 'image_url')
    .where("name", 'ilike', `%${name}%`)
    .andWhere('city', 'ilike', `%${city}%`)
    .andWhere('cuisine', 'ilike', `%${cuisine}%`)
  return result
}

async function searchBusinessByName(name) {
  const result = await db('tallyds.business')
    .select('*')
    .where("name", "ilike", `${name}%`).limit(10)
  return result
}

async function searchAllBusinessName() {
  const result = await db("tallyds.business")
    .select('name').orderBy("name")
  return result
}

async function updateImage(id, fileName) {
  const url = `https://tally-ai-image-store.s3.amazonaws.com/${fileName}`
  console.log(url)
  await db('tallyds.business').update({image_url: url}).where({business_id: id})
  return url
}

module.exports = {
findBusinessByID,
getBusinessses,
searchBusiness,
searchBusinessByName,
searchAllBusinessName,
updateImage
}
