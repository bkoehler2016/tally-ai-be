const db = require('../database/dbConfig');

function findById(google_id) {
  return db('tallyweb.testing_gUsers')
    .where({ google_id })
    .first();
}

function findByEmail(email) {
  return db('tallyweb.testing_gUsers')
    .where('email', email)
    .first();
}

async function add(user) {
  const [google_id] = await db('tallyweb.testing_gUsers').insert(user, 'google_id');
  return findById(google_id);
}

  module.exports = {
      findByEmail,
      findById,
      add
  };