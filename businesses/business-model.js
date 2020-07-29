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

async function searchBusiness(params) {
  const result = await db('tallyds.business')
    .select('business_id','name', 'address', 'city', 'zipcode')
    .where(params)
  return result

}





module.exports = {
findBusinessByID,
getBusinessses,
searchBusiness
}