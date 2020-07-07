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





module.exports = {
findBusinessByID,
getBusinessses
}