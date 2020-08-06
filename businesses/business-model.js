const db = require('../database/dbConfig');
const knex = require('knex')
const bcrypt = require('bcryptjs')


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
    .select('business_id','name', 'address', 'city', 'zipcode', 'cuisine', 'review_count', 'business_stars')
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

module.exports = {
findBusinessByID,
getBusinessses,
searchBusiness,
searchBusinessByName,
searchAllBusinessName
}